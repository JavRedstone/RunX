import { Color } from "./Color";

export class TileType {
    public static readonly STARTING: number = -1;
    public static readonly ENDING: number = -2;
    public static readonly EMPTY: number = 0;
    public static readonly NORMAL: number = 1;
    public static readonly FALLING: number = 2;
    public static readonly JUMPING: number = 3;
    public static readonly BOMB: number = 4;
    public static readonly FORWARD: number = 5;
    public static readonly BACKWARD: number = 6;

    public static getColor(type: number): string {
        switch (type) {
            case TileType.NORMAL:
                return Color.BLUE;
            case TileType.FALLING:
                return Color.GRAY;
            case TileType.JUMPING:
                return Color.GREEN;
            case TileType.BOMB:
                return Color.YELLOW;
            case TileType.FORWARD:
                return Color.RED;
            case TileType.BACKWARD:
                return Color.MAGENTA;
            case TileType.STARTING:
                return Color.BLUE;
            case TileType.ENDING:
                return Color.BLUE;
            default:
            case TileType.EMPTY:
                return '';
        }
    }
}