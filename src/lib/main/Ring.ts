import { TileDistrib } from "$lib/enums/TileDistrib";
import { MathHelper } from "$lib/helpers/MathHelper";
import type { NumDistrib } from "$lib/structs/NumDistrib";
import type { Tile } from "./Tile";

export class Ring {
    public static readonly RADIUS: number = 2;
    public static readonly MIN_SIDES: number = 4;
    public static readonly MAX_SIDES: number = 12;

    public tiles: Tile[] = [];

    public num: number;
    public level: number;
    public sides: number;

    public constructor(num: number, level: number, sides: number) {
        this.num = num;
        this.sides = sides;
    }

    public generateTiles(): void {
        let tileDistrib: NumDistrib = TileDistrib.getTileDistrib(this.level, this.sides);
        let tilePreference: number[] = TileDistrib.getTilePreference(this.level);
        tileDistrib.randDistribBias(MathHelper.percCumSum(tilePreference));
        for (let i = 0; i < this.sides; i++) {

        }
    }
}