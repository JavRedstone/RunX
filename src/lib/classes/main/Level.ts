import type { Scene } from "three";
import { MathHelper } from "../helpers/MathHelper";
import { Ring } from "./Ring";
import type { Tile } from "./Tile";

export class Level {
    public static readonly STARTING_LENGTH: number = 5;
    public static readonly ENDING_LENGTH: number = 100;
    public static readonly MIDDLE_LENGTH: number = 20;

    public static readonly MIN_SIDES: number = 4;
    public static readonly MAX_SIDES: number = 8;

    public num: number;
    public sides: number;

    public numRingsCreated: number = 0;
    public rings: Ring[] = [];
    public generatedRings: Ring[] = [];

    public scene: Scene;

    public constructor(scene: Scene, num: number) {
        this.scene = scene;
        this.num = num;
        
        this.sides = MathHelper.randIntRange(Level.MIN_SIDES, Level.MAX_SIDES);
    }

    public getConnectingTiles(tile: Tile): Tile[] {
        let connectingTiles = [];
        for (let ring of this.rings) {
            let index: number = ring.tiles.indexOf(tile);
            if (index != -1) {
                let leftTile: Tile = ring.getLeftTile(tile);
                if (leftTile) {
                    connectingTiles.push(leftTile);
                }
                let rightTile: Tile = ring.getRightTile(tile);
                if (rightTile) {
                    connectingTiles.push(rightTile);
                }
                let leftRing: Ring = this.getLeftRing(ring);
                if (leftRing != null) {
                    connectingTiles.push(leftRing.tiles[index]);
                }
                connectingTiles.push(this.getRightRing(ring).tiles[index]);
                console.log(connectingTiles)
            }
        }
        return connectingTiles;
    }

    public getLeftRing(ring: Ring): Ring {
        if (ring.num == 0) {
            return null;
        }
        return this.rings[ring.num - 1];
    }

    public getRightRing(ring: Ring): Ring {
        return this.rings[ring.num + 1];
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
            if (this.generatedRings.length > this.numRingsCreated) {
                let generatedRing: Ring = this.generatedRings[this.numRingsCreated];
                generatedRing.rerender();
                this.rings.push(generatedRing);
            }
            else {
                let ring: Ring = new Ring(this.scene, this.numRingsCreated, this.num, this.sides);
                this.rings.push(ring);
                this.generatedRings.push(ring);
            }
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