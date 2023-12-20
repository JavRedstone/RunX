import type { Scene } from "three";
import { MathHelper } from "../helpers/MathHelper";
import { Ring } from "./Ring";

export class Level {
    public static readonly STARTING_LENGTH: number = 5;
    public static readonly ENDING_LENGTH: number = 5;
    public static readonly MIDDLE_LENGTH: number = 50;

    public static readonly MIN_SIDES: number = 4;
    public static readonly MAX_SIDES: number = 12;

    public num: number;
    public sides: number;

    public numRingsCreated: number = 0;
    public rings: Ring[] = [];

    public scene: Scene;

    public constructor(scene: Scene, num: number) {
        this.scene = scene;
        this.num = num;
        
        this.sides = MathHelper.randIntRange(Level.MIN_SIDES, Level.MAX_SIDES);
    }

    public destroy(): void {
        this.rings.forEach(ring => ring.destroy());
        this.rings = [];
    }

    public reset() {
        this.destroy();
        this.numRingsCreated = 0;
    }

    public createNext(): void {
        if (this.numRingsCreated < Level.STARTING_LENGTH + Level.MIDDLE_LENGTH + Level.ENDING_LENGTH) {
            this.rings.push(new Ring(this.scene, this.numRingsCreated, this.num, this.sides));
            this.numRingsCreated++;
        }
    }

    public destroyLast(): void {
        this.rings[0].destroy();
        this.rings.shift();
    }

    public updateRender(): void {
        this.rings.forEach(ring => {
            ring.updateRender();
        });
    }
}