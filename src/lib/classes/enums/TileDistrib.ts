import { NumDistrib } from "../structs/NumDistrib"
import { TileType } from "./TileType";

export class TileDistrib {
    public static readonly DISTRIB_1_10: NumDistrib = new NumDistrib(1, TileType.NORMAL + 1);
    public static readonly DISTRIB_11_30: NumDistrib = new NumDistrib(1, TileType.FALLING + 1);
    public static readonly DISTRIB_31_60: NumDistrib = new NumDistrib(1, TileType.JUMPING + 1);
    public static readonly DISTRIB_61_100: NumDistrib = new NumDistrib(1, TileType.BOMB + 1);

    public static readonly PREFERENCE_1_10: number[] = [5, 10];
    public static readonly PREFERENCE_11_30: number[] = [5, 10, 10];
    public static readonly PREFERENCE_31_60: number[] = [5, 10, 5, 2];
    public static readonly PREFERENCE_61_100: number[] = [20, 20, 15, 5, 5];

    public static getTileDistrib(num: number, sides: number): NumDistrib {
        TileDistrib.DISTRIB_1_10.numSlots = sides;
        TileDistrib.DISTRIB_11_30.numSlots = sides;
        TileDistrib.DISTRIB_31_60.numSlots = sides;
        TileDistrib.DISTRIB_61_100.numSlots = sides;
        if (num <= 10) {
            return TileDistrib.DISTRIB_1_10;
        } else if (num <= 30) {
            return TileDistrib.DISTRIB_11_30;
        } else if (num <= 60) {
            return TileDistrib.DISTRIB_31_60;
        } else {
            return TileDistrib.DISTRIB_61_100;
        }
    }

    public static getTilePreference(num: number): number[] {
        if (num <= 10) {
            return TileDistrib.PREFERENCE_1_10;
        } else if (num <= 30) {
            return TileDistrib.PREFERENCE_11_30;
        } else if (num <= 60) {
            return TileDistrib.PREFERENCE_31_60;
        } else {
            return TileDistrib.PREFERENCE_61_100;
        }
    }
}