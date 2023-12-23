import { writable } from 'svelte/store';

export const toggles = writable({
    started: false,
    paused: false,
    settings: false,
    won: false,
});
export const stats = writable({
    level: 1,
    deaths: 0,
    time: 0
});