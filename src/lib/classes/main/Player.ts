import { Vector3, Euler, Scene, Mesh, MeshLambertMaterial, SphereGeometry } from "three";
import { Game } from "./Game";
import { Color } from "../enums/Color";
import { Tile } from "./Tile";
import { Ring } from "./Ring";
import { TileType } from "../enums/TileType";
import { MathHelper } from "../helpers/MathHelper";

export class Player {
    public static readonly COLOR: string = Color.WHITE;

    public static readonly RADIUS: number = 0.1;
    public static readonly WALKING_SPEED: number = 0.08;
    public static readonly RUNNING_SPEED: number = 0.15;
    public static readonly JUMPING_SPEED: number = 0.125;
    public static readonly STRAFING_SPEED: number = 0.05;

    public static readonly MAX_FALL_MULTIPLIER: number = 2;
    
    public position: Vector3;
    public velocity: Vector3;
    public acceleration: Vector3;
    public rotation: Euler;
    public scale: Vector3;

    public pressedJump: boolean = false;
    public pressedRun: boolean = false;
    public pressedStrafeLeft: boolean = false;
    public pressedStrafeRight: boolean = false;
    public pressedReset: boolean = false;

    public justJumped: boolean = false;
    public isInAir: boolean = true;
    
    public underBoost: boolean = false;
    public underSlow: boolean = false;
    public prevTileType: number = TileType.NORMAL;

    public currTile: Tile;
    public justHitTile: boolean = false;

    public destroyed: boolean = false;

    public mesh: Mesh;
    public geometry: SphereGeometry;
    public material: MeshLambertMaterial;

    public scene: Scene;

    public constructor(scene: Scene) {
        this.scene = scene;
        
        this.reset();
        this.create();
    }

    public create(): void {
        this.destroyed = false;

        this.geometry = new SphereGeometry(Player.RADIUS);
        this.material = new MeshLambertMaterial({ color: Player.COLOR, emissive: Player.COLOR });
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);

        this.scene.add(this.mesh);
    }

    public reset(): void {
        this.position = new Vector3(Tile.LENGTH * 2, -Ring.RADIUS + Tile.HEIGHT / 2 + Player.RADIUS, 0);
        this.velocity = new Vector3(0, 0, 0);
        this.acceleration = new Vector3(0, 0, 0);
        this.rotation = new Euler(0, 0, 0);
        this.scale = new Vector3(1, 1, 1);

        this.pressedJump = false;
        this.pressedRun = false;
        this.pressedStrafeLeft = false;
        this.pressedStrafeRight = false;
        this.pressedReset = false;

        this.justJumped = false;
        this.isInAir = true;
        this.underBoost = false;
        this.underSlow = false;
    }

    public destroy(): void {
        if (this.mesh) {
            this.scene.remove(this.mesh);
            this.mesh.geometry.dispose();
        }
        if (this.geometry) {
            this.geometry.dispose();
        }
        if (this.material) {
            this.material.dispose();
        }
        
        this.mesh = null;
        this.geometry = null;
        this.material = null;

        this.destroyed = true;
    }

    public update(): void {
        this.move();
        this.updTileEffects();
        this.updIntrinsic();
        this.updateRender();
    }

    public move(): void {
        if (this.pressedJump && !this.isInAir) {
            this.velocity.y += Player.JUMPING_SPEED;
            this.justJumped = true;
            this.isInAir = true;
        }
        if (this.pressedRun) {
            this.velocity.x = Player.RUNNING_SPEED;
        } else {
            this.velocity.x = Player.WALKING_SPEED;
        }
        if (this.underBoost) {
            this.velocity.x += Tile.FORWARD_BOOST_SPEED;
        }
        else if (this.underSlow) {
            this.velocity.x -= Tile.FORWARD_BOOST_SPEED;
        }
        if ((this.pressedStrafeLeft && this.pressedStrafeRight) || (!this.pressedStrafeLeft && !this.pressedStrafeRight)) {
            this.velocity.z = 0;
        }
        else if (this.pressedStrafeLeft) {
            this.velocity.z = -Player.STRAFING_SPEED;
        }
        else if (this.pressedStrafeRight) {
            this.velocity.z = Player.STRAFING_SPEED;
        }
    }

    public updTileEffects(): void {
        if (this.currTile != null && this.justHitTile) {
            switch(this.currTile.type) {
                case TileType.JUMPING:
                    this.justJumped = true;
                    this.isInAir = true;
                    this.velocity.y = 0;
                    this.velocity.y += Tile.JUMPING_BOOST_SPEED;
                    break;
                case TileType.BOOST:
                    this.underBoost = !this.underBoost;
                    this.underSlow = false;
                    break;
                case TileType.SLOW:
                    this.underSlow = !this.underSlow;
                    this.underBoost = false;
                    break;
            }
            this.justHitTile = false;
        }
    }

    public updIntrinsic(): void {
        if (this.currTile != null && !this.currTile.destroyed && !this.justJumped) {
            let rotatedPosition: Vector3 = this.position.clone().applyAxisAngle(new Vector3(1, 0, 0), -this.currTile.rotation.x + Math.PI / 2);
            let minHeight: number = this.currTile.position.clone().applyAxisAngle(new Vector3(1, 0, 0), -this.currTile.rotation.x + Math.PI / 2).y + Tile.HEIGHT / 2 + Player.RADIUS - MathHelper.EPSILON;
            if (rotatedPosition.y < minHeight) {
                this.position = rotatedPosition.setY(minHeight).applyAxisAngle(new Vector3(1, 0, 0), this.currTile.rotation.x - Math.PI / 2)
            }
            this.acceleration.y = 0;
            this.velocity.y = 0;
            this.isInAir = false;
        }
        else {
            this.acceleration.y = -Game.GRAVITY;
            this.justJumped = false;
            this.isInAir = true;
        }

        this.velocity.add(this.acceleration);
        let rotatedVelocity: Vector3 = this.velocity.clone().applyEuler(this.rotation);
        this.position.add(rotatedVelocity);
    }

    public updateRender(): void {
        if (this.mesh) {
            this.mesh.position.set(this.position.x, this.position.y, this.position.z);
            this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
        }
        if (this.material) {
            this.material.color.set(Player.COLOR);
            this.material.emissive.set(Player.COLOR);
        }
        if (this.geometry) {
            this.mesh.geometry.scale(this.scale.x, this.scale.y, this.scale.z);
        }
    }
}