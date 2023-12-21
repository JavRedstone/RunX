import { TileDistrib } from "$lib/classes/enums/TileDistrib";
import { MathHelper } from "$lib/classes/helpers/MathHelper";
import type { NumDistrib } from "$lib/classes/structs/NumDistrib";
import { Euler, Scene, Vector3 } from "three";
import { TileType } from "../enums/TileType";
import { Tile } from "./Tile";
import { Level } from "./Level";

export class Ring {
    public static readonly RADIUS: number = 2;

    public tiles: Tile[] = [];

    public num: number;
    public level: number;
    public sides: number;

    public scene: Scene;

    public constructor(scene: Scene, num: number, level: number, sides: number) {
        this.scene = scene;

        this.num = num;
        this.level = level;
        this.sides = sides;

        this.create();
    }

    public getLeftTile(tile: Tile): Tile {
        let index: number = this.tiles.indexOf(tile);
        if (index == 0) {
            return this.tiles[this.tiles.length - 1];
        }
        return this.tiles[index - 1];
    }

    public getRightTile(tile: Tile): Tile {
        let index: number = this.tiles.indexOf(tile);
        if (index == this.tiles.length - 1) {
            return this.tiles[0];
        }
        return this.tiles[index + 1];
    }

    public rerender(): void {
        this.tiles.forEach(tile => {
            tile.create();
        });
    }

    public update(): void {
        this.tiles.forEach(tile => {
            tile.update();
        });
    }

    public updateRender(): void {
        this.tiles.forEach(tile => {
            tile.updateRender();
        });
    }

    public create(): void {
        let tileDistrib: NumDistrib = TileDistrib.getTileDistrib(this.level, this.sides);
        let tilePreference: number[] = TileDistrib.getTilePreference(this.level);
        tileDistrib.randDistribBias(MathHelper.percCumSum(tilePreference));
        let width: number = 2 * Ring.RADIUS * Math.tan(Math.PI / this.sides) - Tile.HEIGHT * Math.tan(Math.PI / this.sides);
        for (let i = 0; i < this.sides; i++) {
            let angle: number = (i / this.sides) * Math.PI * 2;
            let tileType: number = tileDistrib.slots[i];
            if (this.num > -1 && this.num < Level.STARTING_LENGTH) {
                tileType = TileType.STARTING;
            }
            else if (this.num >= Level.STARTING_LENGTH + Level.MIDDLE_LENGTH && this.num <= Level.STARTING_LENGTH + Level.MIDDLE_LENGTH + Level.ENDING_LENGTH) {
                tileType = TileType.ENDING;
            }
            this.tiles.push(new Tile(
                this.scene,
                new Vector3(Tile.LENGTH * this.num, Math.cos(angle + Math.PI) * Ring.RADIUS, Math.sin(angle + Math.PI) * Ring.RADIUS),
                new Euler(angle + Math.PI / 2, 0, 0),
                new Vector3(Tile.LENGTH, width, Tile.HEIGHT),
                tileType
            ));
        }
    }

    public completelyDestroy(): void {
        this.tiles.forEach(tile => tile.destroy());
        this.tiles = [];
    }

    public destroy(): void {
        this.tiles.forEach(tile => tile.destroy());
    }
}