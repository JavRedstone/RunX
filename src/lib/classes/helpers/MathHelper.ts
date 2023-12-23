import type { Vector2, Vector3 } from "three";

export class MathHelper {
    public static readonly EPSILON: number = 0.00001;

    public static clamp(x: number, min: number, max: number): number {
        return Math.max(min, Math.min(x, max));
    }

    public static sum(arr: number[]): number {
        let sum: number = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }

    public static randRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public static randIntRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static randIntMax(max: number): number {
        return Math.floor(Math.random() * (max + 1));
    }

    public static randIdx(arr: number[]): number {
        return MathHelper.randIntMax(arr.length - 1);
    }

    public static randItem(arr: number[]): number {
        return arr[MathHelper.randIdx(arr)];
    }

    public static cumSum(arr: number[]): number[] {
        let cumSum: number[] = [];
        let sum: number = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
            cumSum.push(sum);
        }
        return cumSum;
    }

    public static percList(arr: number[]): number[] {
        let sum: number = MathHelper.sum(arr);
        let percentage: number[] = [];
        for (let i = 0; i < arr.length; i++) {
            percentage.push(arr[i] / sum);
        }
        return percentage;
    }

    public static percCumSum(arr: number[]): number[] {
        let cumSum: number[] = MathHelper.cumSum(arr);
        let percentage: number[] = [];
        for (let i = 0; i < arr.length; i++) {
            percentage.push(cumSum[i] / cumSum[cumSum.length - 1]);
        }
        return percentage;
    }

    public static dist2(p1: Vector2, p2: Vector2): number {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    public static dist3(p1: Vector3, p2: Vector3): number {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) + Math.pow(p2.z - p1.z, 2);
    }

    public static toHoursMinsSecs(ms: number): string {
        let secs: number = Math.floor(ms / 1000);
        let mins: number = Math.floor(secs / 60);
        secs = secs % 60;
        let hours: number = Math.floor(mins / 60);
        mins = mins % 60;
        return `${hours}h ${mins}m ${secs}s`;
    }
}