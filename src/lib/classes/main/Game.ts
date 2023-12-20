import { Vector3, type Scene, Quaternion, Euler, PerspectiveCamera } from "three";
import { Level } from "./Level";
import { Player } from "./Player";
import { TileType } from "../enums/TileType";
import { Pair } from "../structs/Pair";
import { Tile } from "./Tile";
import { Ring } from "./Ring";

export class Game {
    public static readonly GRAVITY: number = 0.005;

    public static readonly RENDER_START: number = 3;
    public static readonly RENDER_END: number = 15;

    public level: Level;
    public player: Player;

    public scene: Scene;
    public camera: PerspectiveCamera;
    public orbitControls: any;
    public cameraTargetPosition: Vector3;
    public cameraTargetRotation: Euler;

    public constructor(scene: Scene) {
        this.scene = scene;
        this.level = new Level(scene, 1);
        this.player = new Player(scene);

        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.tick();
    }

    public destroy(): void {
        this.level.destroy();
        this.player.destroy();
    }
    
    public tick(): void {
        this.update();
        requestAnimationFrame(() => this.tick());
    }

    public update(): void {
        this.updatePlayer();
        this.updateCamera();
        this.updateLevelGeneration();
        this.updateRender();
    }

    public updatePlayer(): void {
        this.handlePlayerBounds();
        this.handlePlayerCollision();
        this.player.update();
    }

    public handlePlayerBounds(): void {
        if (this.player.position.distanceTo(new Vector3(this.player.position.x, 0, 0)) > Ring.RADIUS * Player.DEATH_RADIUS_MULTIPLIER) {
            this.level.reset();

            this.player.position = new Vector3(0, 0, 0);
            this.player.velocity = new Vector3(0, 0, 0);
            this.player.acceleration = new Vector3(0, 0, 0);
            this.player.rotation = new Euler(0, 0, 0);

            this.cameraTargetPosition = new Vector3(0, 0, 0);
            this.cameraTargetRotation = new Euler(0, 0, 0);
            this.camera.position.copy(this.cameraTargetPosition);
            this.scene.rotation.copy(new Euler(0, 0, 0));
        }
    }

    public handlePlayerCollision(): void {
        let tileDists: Pair[] = [];
        this.level.rings.forEach(ring => {
            ring.tiles.forEach(tile => {
                if (tile.type != TileType.EMPTY && (this.player.currTile == null || !this.player.currTile.equals(tile))) {
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
            this.player.currTile = closestTile;
            this.player.rotation.set(closestTile.rotation.x - Math.PI / 2, closestTile.rotation.y, closestTile.rotation.z);
        }
        else {
            this.player.currTile = null;
        }
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
}