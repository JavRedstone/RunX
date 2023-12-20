import { Vector3, Euler, Scene, BoxGeometry, Mesh, MeshLambertMaterial, SphereGeometry } from "three";
import { Game } from "./Game";
import { Color } from "../enums/Color";
import { Tile } from "./Tile";
import { Ring } from "./Ring";

export class Player {
    public static readonly COLOR: string = Color.CYAN;

    public static readonly RADIUS: number = 0.1;
    public static readonly WALKING_SPEED: number = 0.075;
    public static readonly RUNNING_SPEED: number = 0.15;
    public static readonly JUMPING_SPEED: number = 0.125;
    public static readonly STRAFING_SPEED: number = 0.05;
    
    public position: Vector3;
    public velocity: Vector3;
    public acceleration: Vector3;
    public rotation: Euler;

    public pressedJump: boolean = false;
    public pressedRun: boolean = false;
    public pressedStrafeLeft: boolean = false;
    public pressedStrafeRight: boolean = false;

    public justJumped: boolean = false;
    public isInAir: boolean = true;

    public currTile: Tile;

    public mesh: Mesh;
    public geometry: SphereGeometry;
    public material: MeshLambertMaterial;

    public scene: Scene;

    public constructor(scene: Scene) {
        this.scene = scene;
        
        this.position = new Vector3(0, 0, 0);
        this.velocity = new Vector3(0, 0, 0);
        this.acceleration = new Vector3(0, 0, 0);
        this.rotation = new Euler(0, 0, 0);

        this.create();
    }

    public create(): void {
        this.geometry = new SphereGeometry(Player.RADIUS);
        this.material = new MeshLambertMaterial({ color: Player.COLOR, emissive: Player.COLOR });
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);

        this.scene.add(this.mesh);
    }

    public destroy(): void {
        this.scene.remove(this.mesh);

        this.geometry.dispose();
        this.material.dispose();

        this.mesh.geometry.dispose();

        this.mesh = null;
    }

    public update(): void {
        this.move();
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

    public updIntrinsic(): void {
        if (this.currTile != null && !this.justJumped) {
            let rotatedPosition: Vector3 = this.position.clone().applyAxisAngle(new Vector3(1, 0, 0), -this.currTile.rotation.x + Math.PI / 2);
            if (rotatedPosition.y < Tile.HEIGHT / 2 + Player.RADIUS - Ring.RADIUS) {
                this.position = rotatedPosition.setY(Tile.HEIGHT / 2 + Player.RADIUS - Ring.RADIUS).applyAxisAngle(new Vector3(1, 0, 0), this.currTile.rotation.x - Math.PI / 2)
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
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);

        this.material.color.set(Player.COLOR);
        this.material.emissive.set(Player.COLOR);
    }
}