<script lang="ts">
    import { EventName } from "$lib/classes/enums/Message";
    import { eventName } from "$lib/stores/store";
    import { onMount } from "svelte";

    let level: number = 1;
    let deaths: number = 0;

    function pausePlay(): void {
        eventName.set(EventName.PAUSE_PLAY);
    }

    function openSettings(): void {
        eventName.set(EventName.TOGGLE_SETTINGS);
    }
    
    let isPaused: boolean = false;
    eventName.subscribe((value: EventName) => {
        if (value === EventName.LEVEL_INCREMENT) {
            level++;
        }
        else if (value === EventName.DEATH_INCREMENT) {
            deaths++;
        }
        else if (value === EventName.PAUSE_PLAY) {
            isPaused = !isPaused;
        }
    });

    onMount(() => {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "p" || event.key === "P" || event.key === "Escape") {
                pausePlay();
            }
        });
    });
</script>

{#if isPaused}
    <div class="HUD-overlay">
        <button class="HUD-overlay-button HUD-overlay-resume" on:click={pausePlay}>Resume</button>
        <button class="HUD-overlay-button HUD-overlay-settings" on:click={openSettings}>Settings</button>
        <button class="HUD-overlay-button HUD-overlay-quit" on:click={() => location.reload()}>Quit Game</button>
    </div>
{/if}
<div class="HUD-wrapper">
    <div class="HUD-level-counter">
        Level {level} | Deaths {deaths}
    </div>
    <button class="HUD-pause-play" on:click={pausePlay} tabindex="-1">
        {#if isPaused}
            <img class="HUD-pause-play-icon" src="UI/play.svg" alt="Play icon">
        {:else}
            <img class="HUD-pause-play-icon" src="UI/pause.svg" alt="Pause icon">
        {/if}
    </button>
</div>

<style>
    .HUD-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .HUD-overlay-button {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        width: 20rem;
        height: 4rem;
        border: none;
        border-radius: 0;
        background-color: #808080;
        border: 0.2rem solid #ffffff;
        color: #ffffff;
        font-family: 'Poppins', sans-serif;
        font-size: 2rem;

        transition: 0.25s;

        &:hover {
            cursor: pointer;

            background-color: #5399f5;
        }
    }

    .HUD-overlay-resume {
        top: calc(10rem);
    }

    .HUD-overlay-settings {
        top: calc(16rem);
    }

    .HUD-overlay-quit {
        top: calc(22rem);
    }
    
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

    .HUD-pause-play {
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