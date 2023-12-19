import { TileDistrib } from "$lib/classes/enums/TileDistrib";
import { MathHelper } from "$lib/classes/helpers/MathHelper";
import type { NumDistrib } from "$lib/classes/structs/NumDistrib";
import { Euler, Vector3 } from "three";
import { TileType } from "../enums/TileType";
import { Tile } from "./Tile";

export class Ring {
    public static readonly RADIUS: number = 2;

    public tiles: Tile[] = [];

    public num: number;
    public level: number;
    public sides: number;

    public constructor(num: number, level: number, sides: number) {
        this.num = num;
        this.level = level;
        this.sides = sides;

        this.create();
    }

    public create(): void {
        let tileDistrib: NumDistrib = TileDistrib.getTileDistrib(this.level, this.sides);
        let tilePreference: number[] = TileDistrib.getTilePreference(this.level);
        tileDistrib.randDistribBias(MathHelper.percCumSum(tilePreference));
        let width: number = 2 * Ring.RADIUS * Math.tan(Math.PI / this.sides) - Tile.HEIGHT * Math.tan(Math.PI / this.sides);
        for (let i = 0; i < this.sides; i++) {
            let angle: number = (i / this.sides) * Math.PI * 2;
            let tileType: number;
            switch(this.level) {
                case TileType.STARTING:
                    tileType = TileType.STARTING;
                    break;
                case TileType.ENDING:
                    tileType = TileType.ENDING;
                    break;
                default:
                    tileType = tileDistrib.slots[i];
                    break;
            }
            this.tiles.push(new Tile(  
                new Vector3(0, Math.cos(angle) * Ring.RADIUS, Math.sin(angle) * Ring.RADIUS),
                new Euler(angle, 0, 0),
                new Vector3(Tile.LENGTH, width, Tile.HEIGHT),
                tileType
            ));
        }
    }

    public destroy(): void {
        this.tiles.forEach(tile => tile.destroy());
        this.tiles = [];
    }
}