export class ObjectHelper {
    public static deepCopy(obj: any): any {
        return JSON.parse(JSON.stringify(obj));
    }

    public static shiftArrayLeft(arr: any[], n: number): any[] {
        let shifted: any[] = [];
        for (let i = 0; i < arr.length; i++) {
            shifted.push(arr[(i + n) % arr.length]);
        }
        return shifted;
    }

    public static shiftArrayRight(arr: any[], n: number): any[] {
        let shifted: any[] = [];
        for (let i = 0; i < arr.length; i++) {
            shifted.push(arr[(i - n + arr.length) % arr.length]);
        }
        return shifted;
    }
}