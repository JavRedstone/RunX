import { Vector3, type Scene, Quaternion, Euler, PerspectiveCamera, Mesh, SphereGeometry, MeshLambertMaterial, BoxGeometry, PointLight } from "three";
import { Level } from "./Level";
import { Player } from "./Player";
import { TileType } from "../enums/TileType";
import { Pair } from "../structs/Pair";
import { Tile } from "./Tile";
import { Ring } from "./Ring";
import { sceneSettings, toggles } from "$lib/stores/store";
import { stats } from "$lib/stores/store";

export class Game {
    public static readonly TPS: number = 60;

    public static GRAVITY: number = 0.005;

    public static readonly RENDER_START: number = 3;
    public static readonly RENDER_END: number = 12;

    public static readonly TILE_FALL_INTERVAL: number = 50;
    public static readonly TILE_BOMB_INTERVAL: number = 25;

    public level: Level;
    public player: Player;

    public scene: Scene;
    public camera: PerspectiveCamera;
    public orbitControls: any;

    public sunMesh: Mesh;
    public sunGeometry: BoxGeometry;
    public sunMaterial: MeshLambertMaterial;
    public pointLight: PointLight;

    public cameraTargetPosition: Vector3;
    public cameraTargetRotation: Euler;

    public tileActionIntervals: number[] = [];

    public globalTicker: number = 0;

    public time: number = 0;

    public mode: string = "speedrun";
    public sceneSettings: any;

    public constructor(scene: Scene) {
        this.scene = scene;
    }

    public start(): void {
        this.setupStoreSubscriber();
        if (this.mode === "speedrun") {
            this.level = new Level(this.scene, 1, this.mode, this.sceneSettings);
        }
        this.player = new Player(this.scene);

        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }

    public setupStoreSubscriber(): void {
        toggles.subscribe(value => {
            if (value.paused || value.won) {
                this.stopTicker();
            }
            else {
                this.stopTicker();
                this.startTicker();
            }

            if (value.mode) {
                this.mode = value.mode;
            }
        });

        sceneSettings.subscribe(value => {
            if (this.mode === "creative") {
                this.sceneSettings = value;
                if (this.level != null) {
                    this.level.destroy();
                    this.player.reset();
                    this.time = 0;
                    stats.update(value => {
                        return {
                            ...value,
                            deaths: 0,
                            level: 1
                        }
                    });
                }
                Level.MIDDLE_LENGTH = this.sceneSettings.sceneLength;
                Ring.RADIUS = this.sceneSettings.ringRadius;
                Game.GRAVITY = this.sceneSettings.gravity;
                this.level = new Level(this.scene, 1, this.mode, this.sceneSettings);
            }
            else {
                this.sceneSettings = value;
            }
        });
    }
    
    public startTicker(): void {
        this.globalTicker = setInterval(() => {
            this.update();
            this.updateRender();
            this.updateTime();
        }, 1000 / Game.TPS);
    }

    public updateTime(): void {
        this.time += 1000 / Game.TPS;
        stats.update(value => {
            return {
                ...value,
                time: this.time
            }
        });
    }

    public stopTicker(): void {
        clearInterval(this.globalTicker);
    }

    public update(): void {
        this.updatePlayer();
        this.updateCamera();
        this.updateLevelGeneration();

        this.level.update();
    }

    public updatePlayer(): void {
        this.handlePlayerBounds();
        this.handlePlayerCollision();
        this.player.update();
    }

    public handlePlayerBounds(): void {
        if (this.player.position.distanceTo(new Vector3(this.player.position.x, 0, 0)) > Ring.RADIUS * Player.MAX_FALL_MULTIPLIER) {
            stats.update(value => {
                return {
                    ...value,
                    deaths: value.deaths + 1
                }
            });
        }
        if (this.player.position.distanceTo(new Vector3(this.player.position.x, 0, 0)) > Ring.RADIUS * Player.MAX_FALL_MULTIPLIER ||
            (this.player.currTile != null && this.player.currTile.type == TileType.ENDING) ||
            this.player.pressedReset
        ) {
            this.level.reset();
            this.tileActionIntervals.forEach(interval => clearInterval(interval));
            this.tileActionIntervals = [];

            this.player.reset();

            this.cameraTargetPosition = new Vector3(0, 0, 0);
            this.cameraTargetRotation = new Euler(0, 0, 0);
            this.camera.position.copy(this.cameraTargetPosition);
            this.scene.rotation.copy(new Euler(0, 0, 0));
        }
        if (this.player.currTile != null && this.player.currTile.type == TileType.ENDING) {
            if (this.level.num < Level.MAX_LEVEL) {
                if (this.mode === "speedrun") {
                    this.level.destroy();
                    this.level = new Level(this.scene, this.level.num + 1, this.mode, this.sceneSettings);
                    stats.update(value => {
                        return {
                            ...value,
                            level: value.level + 1
                        }
                    });
                }
                else {
                    this.level.destroy();
                    this.player.reset();
                    this.time = 0;
                    stats.update(value => {
                        return {
                            ...value,
                            deaths: 0,
                            level: 1
                        }
                    });
                    this.level = new Level(this.scene, 1, this.mode, this.sceneSettings);
                }
            }
            else {
                this.destroy();
                toggles.update(value => {
                    return {
                        ...value,
                        won: true
                    }
                });
            }
        }
    }

    public handlePlayerCollision(): void {
        let tileDists: Pair[] = [];
        this.level.rings.forEach(ring => {
            ring.tiles.forEach(tile => {
                if (!tile.destroyed && tile.type != TileType.EMPTY) {
                    let distance: number = tile.distSurfaceTo(this.player.position);
                    if (distance < Player.RADIUS) {
                        tileDists.push(new Pair(tile, distance));
                    }
                }
            });
        });

        if (tileDists.length > 0) {
            tileDists.sort((a, b) => a.second - b.second);
            let closestTile: Tile = tileDists[0].first;
            if (this.player.currTile == null || (this.player.currTile != null && !this.player.currTile.equals(closestTile))) {
                this.player.currTile = closestTile;
                this.player.justHitTile = true;
                this.player.rotation.set(closestTile.rotation.x - Math.PI / 2, closestTile.rotation.y, closestTile.rotation.z);
            
                if (this.player.currTile.type == TileType.FALLING) {
                    this.startTileFallSequence(closestTile);
                }
    
                if (this.player.currTile.type == TileType.BOMB) {
                    this.startTileBombSequence(closestTile);
                }
            }
        }
        else {
            this.player.currTile = null;
        }
    }

    public startTileFallSequence(tile: Tile): void {
        tile.hasBeenTouched = true;
        tile.touchOriginType = TileType.FALLING;
        let queue: Tile[] = [tile];
        let interval: number = setInterval(() => {
            if (queue.length == 0) {
                clearInterval(interval);
            }
            else {
                let tile: Tile = queue.shift();
                this.level.getConnectingTiles(tile).forEach(connectingTile => {
                    if (connectingTile.type == TileType.FALLING && !connectingTile.hasBeenTouched) {
                        connectingTile.hasBeenTouched = true;
                        connectingTile.touchOriginType = TileType.FALLING;
                        queue.push(connectingTile);
                    }
                });
            }
        }, Game.TILE_FALL_INTERVAL);
        this.tileActionIntervals.push(interval);
    }

    public startTileBombSequence(tile: Tile): void {
        tile.hasBeenTouched = true;
        tile.touchOriginType = TileType.BOMB;
        let queue: Tile[] = [tile];
        let interval: number = setInterval(() => {
            if (queue.length == 0) {
                clearInterval(interval);
            }
            else {
                let tile: Tile = queue.shift();
                this.level.getFrontBackTiles(tile).forEach(connectingTile => {
                    if ((!connectingTile.hasBeenTouched || (connectingTile.hasBeenTouched && connectingTile.touchOriginType != TileType.BOMB)) && (connectingTile.type != TileType.STARTING && connectingTile.type != TileType.ENDING)) {
                        connectingTile.hasBeenTouched = true;
                        connectingTile.touchOriginType = TileType.BOMB;
                        connectingTile.destroyed = true;
                        queue.push(connectingTile);
                    }
                });
            }
        }, Game.TILE_BOMB_INTERVAL);
        this.tileActionIntervals.push(interval);
    }

    public updateCamera(): void {
        this.cameraTargetPosition = this.player.position.clone().add(new Vector3(-3, 1, 0).applyEuler(this.player.rotation));
        this.cameraTargetRotation = new Euler(
            -this.player.rotation.x,
            this.player.rotation.y,
            this.player.rotation.z
        );
        this.camera.position.copy(this.camera.position.lerp(this.cameraTargetPosition, 0.1));
        this.scene.rotation.setFromQuaternion(
            new Quaternion().setFromEuler(this.scene.rotation)
            .slerp(new Quaternion().setFromEuler(this.cameraTargetRotation), 0.1)
        );
        if (this.orbitControls != null) {
            this.orbitControls.target.copy(this.player.position.clone().applyAxisAngle(new Vector3(1, 0, 0), this.scene.rotation.x));
        }
    }

    public updateLevelGeneration(): void {
        let numAfter: number = Game.RENDER_END + Game.RENDER_START - this.level.rings.length;
        for (let i = 0; i < numAfter; i++) {
            this.level.createNext();
        }
        if (this.player.position.x - Game.RENDER_START * Tile.LENGTH > this.level.rings[0].tiles[0].position.x) {
            this.level.destroyLast();
        }
    }

    public updateRender(): void {
        this.level.updateRender();
    }
    
    public destroy(): void {
        this.player.destroy();
        this.level.destroy();
    }
}