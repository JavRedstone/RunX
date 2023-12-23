<script lang="ts">
    import { onMount } from "svelte";
    import { toggles } from "$lib/stores/store";
    import { stats } from "$lib/stores/store";
    import { MathHelper } from "$lib/classes/helpers/MathHelper";

    function pausePlay(): void {
        toggles.update((value) => {
            return {
                ...value,
                paused: !value.paused,
                settings: false
            }
        });
    }

    function openSettings(): void {
        toggles.update((value) => {
            return {
                ...value,
                settings: true
            }
        });
    }

    onMount(() => {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "p" || event.key === "P" || event.key === "Escape") {
                pausePlay();
            }
        });
    });
</script>

{#if $toggles.paused}
    <div class="HUD-overlay">
        <button class="HUD-overlay-button HUD-overlay-resume" tabindex="-1" on:click={pausePlay}>Resume</button>
        <button class="HUD-overlay-button HUD-overlay-settings" tabindex="-1" on:click={openSettings}>Settings</button>
        <button class="HUD-overlay-button HUD-overlay-quit" tabindex="-1" on:click={() => location.reload()}>Quit Game</button>
    </div>
{/if}
<div class="HUD-wrapper">
    <div class="HUD-level-counter">
        Level {$stats.level} &bull; {$stats.deaths} {$stats.deaths == 1 ? 'death' : 'deaths'} &bull; {MathHelper.toHoursMinsSecs($stats.time)} elapsed
    </div>
    <button class="HUD-pause-play" on:click={pausePlay} tabindex="-1">
        {#if $toggles.paused}
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
        backdrop-filter: blur(0.5rem);
    }

    .HUD-overlay-button {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        width: 20rem;
        height: 4rem;
        border-radius: 0.5rem;
        background-color: #f56e53;
        border: 0.2rem solid #ffffff;
        color: #ffffff;
        text-shadow: 0 0 1rem #ffffff;
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
        backdrop-filter: blur(0.5rem);
    }

    .HUD-level-counter {
        position: absolute;
        top: 0.4rem;
        left: 0;
        width: 100%;
        color: black;
        font-size: 1.5rem;
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