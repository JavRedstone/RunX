import { TileType } from '$lib/classes/enums/TileType';
import { NumDistrib } from '$lib/classes/structs/NumDistrib';
import { writable } from 'svelte/store';

export const toggles = writable({
    started: false,
    mode: "speedrun",
    paused: false,
    settings: false,
    won: false,
});
export const sceneSettings = writable({
    sceneLength: 0,
    numSides: 0,
    ringRadius: 0,
    gravity: 0,
    tileDistribution: new NumDistrib(1, TileType.EMPTY + 1),
    tilePreference: [1]
});
export const stats = writable({
    level: 1,
    deaths: 0,
    time: 0
});