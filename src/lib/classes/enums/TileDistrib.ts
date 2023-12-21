import { NumDistrib } from "../structs/NumDistrib"
import { TileType } from "./TileType";

export class TileDistrib {
    public static readonly DISTRIB_1: NumDistrib = new NumDistrib(1, TileType.NORMAL + 1);
    public static readonly DISTRIB_2: NumDistrib = new NumDistrib(1, TileType.FALLING + 1);
    public static readonly DISTRIB_3: NumDistrib = new NumDistrib(1, TileType.JUMPING + 1);
    public static readonly DISTRIB_4: NumDistrib = new NumDistrib(1, TileType.BOMB + 1);
    public static readonly DISTRIB_5: NumDistrib = new NumDistrib(1, TileType.BOMB + 1);
    public static readonly DISTRIB_6: NumDistrib = new NumDistrib(1, TileType.FORWARD + 1);
    public static readonly DISTRIB_7: NumDistrib = new NumDistrib(1, TileType.BACKWARD + 1);

    public static readonly PREFERENCE_1: number[] = [5, 10];
    public static readonly PREFERENCE_2: number[] = [5, 10, 10];
    public static readonly PREFERENCE_3: number[] = [5, 10, 5, 2];
    public static readonly PREFERENCE_4: number[] = [20, 15, 20, 2, 1];
    public static readonly PREFERENCE_5: number[] = [30, 20, 15, 5, 2];
    public static readonly PREFERENCE_6: number[] = [30, 20, 30, 5, 5, 1, 1];
    public static readonly PREFERENCE_7: number[] = [50, 10, 30, 5, 5, 2, 2];

    public static getTileDistrib(num: number, sides: number): NumDistrib {
        TileDistrib.DISTRIB_1.numSlots = sides;
        TileDistrib.DISTRIB_2.numSlots = sides;
        TileDistrib.DISTRIB_3.numSlots = sides;
        TileDistrib.DISTRIB_4.numSlots = sides;
        TileDistrib.DISTRIB_5.numSlots = sides;
        TileDistrib.DISTRIB_6.numSlots = sides;
        TileDistrib.DISTRIB_7.numSlots = sides;
        if (num <= 10) {
            return TileDistrib.DISTRIB_1;
        } else if (num <= 20) {
            return TileDistrib.DISTRIB_2;
        } else if (num <= 40) {
            return TileDistrib.DISTRIB_3;
        } else if (num <= 60) {
            return TileDistrib.DISTRIB_4;
        } else if (num <= 80) {
            return TileDistrib.DISTRIB_5;
        } else if (num <= 90) {
            return TileDistrib.DISTRIB_6;
        } else if (num <= 100) {
            return TileDistrib.DISTRIB_7;
        } else {
            return new NumDistrib(1, TileType.EMPTY + 1);
        }
    }

    public static getTilePreference(num: number): number[] {
        if (num <= 10) {
            return TileDistrib.PREFERENCE_1;
        } else if (num <= 20) {
            return TileDistrib.PREFERENCE_2;
        } else if (num <= 40) {
            return TileDistrib.PREFERENCE_3;
        } else if (num <= 60) {
            return TileDistrib.PREFERENCE_4;
        } else if (num <= 80) {
            return TileDistrib.PREFERENCE_5;
        } else if (num <= 90) {
            return TileDistrib.PREFERENCE_6;
        } else if (num <= 100) {
            return TileDistrib.PREFERENCE_7;
        } else {
            return [0];
        }
    }
}