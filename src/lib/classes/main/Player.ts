import { Vector3, Euler } from "three";

export class Player {
    public static readonly SIDE_LENGTH: number = 0.1;
    public static readonly WALKING_SPEED: number = 0.075;
    public static readonly RUNNING_SPEED: number = 0.15;
    public static readonly JUMPING_SPEED: number = 0.2;
    public static readonly STRAFING_SPEED: number = 0.05;
    
    public position: Vector3;
    public velocity: Vector3;
    public rotation: Euler;

    public constructor() {
        this.position = new Vector3(0, 0, 0);
        this.velocity = new Vector3(0, 0, 0);
        this.rotation = new Euler(0, 0, 0);
    }

    public update(): void {
        this.position.add(this.velocity);
    }
}