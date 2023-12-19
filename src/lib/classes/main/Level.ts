import { MathHelper } from "../helpers/MathHelper";
import { Ring } from "./Ring";

export class Level {
    public static readonly STARTING_LENGTH: number = 5;
    public static readonly ENDING_LENGTH: number = 5;
    public static readonly MIDDLE_LENGTH: number = 50;

    public static readonly MIN_SIDES: number = 4;
    public static readonly MAX_SIDES: number = 12;

    public num: number;
    public rings: Ring[] = [];

    public constructor(num: number) {
        this.num = num;
    }

    public createNext(): void {
        let sides: number = MathHelper.randIntRange(Level.MIN_SIDES, Level.MAX_SIDES);
        this.rings.push(new Ring(this.rings.length, this.num, sides));
    }

    public destroyLast(): void {
        this.rings.pop()?.destroy();
    }

    public destroy(): void {
        this.rings.forEach(ring => ring.destroy());
        this.rings = [];
    }
}