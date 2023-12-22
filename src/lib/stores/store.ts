import { EventName } from '$lib/classes/enums/Message';
import { writable } from 'svelte/store';

export const eventName = writable(EventName.NONE);