<script lang="ts">
    import { EventName } from "$lib/classes/enums/Message";
    import { eventName } from "$lib/stores/store";
    import { onMount } from "svelte";

    let level: number = 1;

    function pausePlay(): void {
        eventName.set(EventName.PAUSE_PLAY);
    }

    eventName.subscribe((value: EventName) => {
        if (value === EventName.LEVEL_INCREMENT) {
            level++;
        }
        eventName.set(EventName.NONE);
    });

    onMount(() => {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "p" || event.key === "P" || event.key === "Escape") {
                pausePlay();
            }
        });
    });
</script>

<div class="HUD-wrapper">
    <div class="HUD-level-counter">
        Level {level}
    </div>
    <button class="HUD-pause" on:click={pausePlay}>
        <img class="HUD-pause-play-icon" src="/UI/pause.svg" alt="Pause" />
    </button>
</div>

<style>
    .HUD-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3rem;
        background-color: rgba(255, 255, 255, 0.5);
    }

    .HUD-level-counter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        color: black;
        font-size: 2rem;
        text-align: center;
    }

    .HUD-pause {
        position: absolute;
        top: 0;
        right: 0;
        outline: none;
        border: none;
        background-color: transparent;

        &:hover {
            cursor: pointer;
        }
    }

    .HUD-pause-play-icon {
        width: 3rem;
        height: 3rem;
    }
</style>