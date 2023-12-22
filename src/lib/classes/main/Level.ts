import type { Scene } from "three";
import { MathHelper } from "../helpers/MathHelper";
import { Ring } from "./Ring";
import type { Tile } from "./Tile";

export class Level {
    public static readonly STARTING_LENGTH: number = 12;
    public static readonly ENDING_LENGTH: number = 25;
    public static readonly MIDDLE_LENGTH: number = 50;

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

    public getFrontBackTiles(tile: Tile): Tile[] {
        let connectingTiles = [];
        for (let ring of this.rings) {
            let index: number = ring.tiles.indexOf(tile);
            if (index != -1) {
                let backRing: Ring = this.getBackRing(ring);
                if (backRing) {
                    let backTile: Tile = backRing.tiles[index];
                    if (backTile) {
                        connectingTiles.push(backTile);
                    }
                }
                let frontRing: Ring = this.getFrontRing(ring);
                if (frontRing) {
                    let frontTile: Tile = frontRing.tiles[index];
                    if (frontTile) {
                        connectingTiles.push(frontTile);
                    }
                }
            }
        }
        return connectingTiles;
    }

    public getLeftRightTiles(tile: Tile): Tile[] {
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
            }
        }
        return connectingTiles;
    }

    public getConnectingTiles(tile: Tile): Tile[] {
        return this.getFrontBackTiles(tile).concat(this.getLeftRightTiles(tile));
    }

    public getBackRing(ring: Ring): Ring {
        let ringIndex: number = this.rings.indexOf(ring);
        if (ringIndex == 0) {
            return null;
        }
        return this.rings[ringIndex - 1];
    }

    public getFrontRing(ring: Ring): Ring {
        let ringIndex: number = this.rings.indexOf(ring);
        if (ringIndex == this.rings.length - 1) {
            return null;
        }
        return this.rings[ringIndex + 1];
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

    public reset() {
        this.destroy();
        this.numRingsCreated = 0;
    }

    public destroy(): void {
        this.rings.forEach(ring => ring.destroy());
        this.rings = [];
    }

    public destroyLast(): void {
        this.rings[0].destroy();
        this.rings.shift();
    }

    public update(): void {
        this.rings.forEach(ring => {
            ring.update();
        });
    }

    public updateRender(): void {
        this.rings.forEach(ring => {
            ring.updateRender();
        });
    }
}