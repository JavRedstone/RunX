import { MathHelper } from "$lib/helpers/MathHelper";

export class NumDistrib {
    public numSlots: number = 0;
    public numItems: number = 0;
    public slots: number[] = [];

    constructor(numSlots: number, numItems: number) {
        this.numSlots = numSlots;
        this.numItems = numItems;
        this.slots = Array(numSlots).fill(0);
    }

    public randDistrib() {
        for (let i = 0; i < this.numSlots; i++) {
            let item = MathHelper.randIntMax(this.numItems - 1);
            this.slots[i] = item;
        }
    }

    public randDistribBias(preference: number[]) {
        preference.unshift(0);
        for (let i = 0; i < this.numSlots; i++) {
            let randomNumber = Math.random();
            for (let j = 0; j < this.numItems; j++) {
                if (randomNumber >= preference[j] && randomNumber < preference[j + 1]) {
                    this.slots[i] = j;
                    break;
                }
            }
        }
    }
}