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

<!-- Import Material Icons -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

{#if $toggles.paused}
    <div class="HUD-overlay">
        <button class="HUD-overlay-button HUD-overlay-resume" tabindex="-1" on:click={pausePlay}>Resume</button>
        <button class="HUD-overlay-button HUD-overlay-settings" tabindex="-1" on:click={openSettings}>Settings</button>
        <button class="HUD-overlay-button HUD-overlay-quit" tabindex="-1" on:click={() => location.reload()}>Quit Game</button>
    </div>
{/if}
<div class="HUD-level">
    <span class="HUD-level-label">Level</span>
    <span class="HUD-level-number">{$stats.level}</span>
</div>
<div class="HUD-deaths">
    <span class="HUD-deaths-label">Deaths</span>
    <span class="HUD-deaths-number">{$stats.deaths}</span>
</div>
<div class="HUD-time">
    <span class="HUD-time-label">Time</span>
    <span class="HUD-time-value">{MathHelper.toHoursMinsSecs($stats.time)}</span>
</div>
<div class="HUD-pause">
    <button class="HUD-pause-play" on:click={pausePlay} tabindex="-1">
        {#if $toggles.paused}
            <span class="material-icons">play_arrow</span>
        {:else}
            <span class="material-icons">pause</span>
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .HUD-overlay-button {
        position: absolute;
        width: 20rem;
        height: 4rem;
        border-radius: 0.5rem;
        background: linear-gradient(45deg, #f56e53, #f5ba53, #f5e553);
        border: 0.2rem solid #ffffff;
        color: #ffffff;
        text-shadow: 0 0 1rem #ffffff;
        font-family: 'Poppins', sans-serif;
        font-size: 2rem;
        transition: all 0.3s ease;
    }

    .HUD-overlay-button:hover {
        cursor: pointer;
        background: linear-gradient(90deg, #f56e53, #5399f5, #ed53f5);
        background-size: 200% 200%;
        animation: hoverGradient 1.5s ease infinite;
        transform: scale(1.05);
        box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.3);
    }

    @keyframes hoverGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
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
    
    .HUD-level {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-family: 'Poppins', sans-serif;
        font-size: 1.5rem;
        text-shadow: 0 0 0.5rem black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 1rem rgba(255, 255, 255, 0.5);
        animation: glowPulse 2s infinite;
    }

    .HUD-level-label {
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        color: #f5ba53;
        text-shadow: 0 0 0.5rem #f5ba53;
    }

    .HUD-level-number {
        font-size: 2.5rem;
        font-weight: bold;
        color: #ffffff;
        text-shadow: 0 0 1rem #f56e53, 0 0 2rem #f56e53;
    }

    @keyframes glowPulse {
        0% {
            box-shadow: 0 0 1rem rgba(255, 255, 255, 0.5);
        }
        50% {
            box-shadow: 0 0 2rem rgba(255, 255, 255, 0.8);
        }
        100% {
            box-shadow: 0 0 1rem rgba(255, 255, 255, 0.5);
        }
    }

    .HUD-deaths {
        position: absolute;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-family: 'Poppins', sans-serif;
        font-size: 1.5rem;
        text-shadow: 0 0 0.5rem black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 1rem rgba(255, 255, 255, 0.5);
        animation: glowPulse 2s infinite;
    }

    .HUD-deaths-label {
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        color: #f5ba53;
        text-shadow: 0 0 0.5rem #f5ba53;
    }

    .HUD-deaths-number {
        font-size: 2.5rem;
        font-weight: bold;
        color: #ffffff;
        text-shadow: 0 0 1rem #f56e53, 0 0 2rem #f56e53;
    }

    .HUD-time {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-family: 'Poppins', sans-serif;
        font-size: 1.5rem;
        text-shadow: 0 0 0.5rem black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 1rem rgba(255, 255, 255, 0.5);
        animation: glowPulse 2s infinite;
    }

    .HUD-time-label {
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        color: #f5ba53;
        text-shadow: 0 0 0.5rem #f5ba53;
    }

    .HUD-time-value {
        font-size: 2.5rem;
        font-weight: bold;
        color: #ffffff;
        text-shadow: 0 0 1rem #f56e53, 0 0 2rem #f56e53;
    }

    .HUD-pause {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 0.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 1rem rgba(255, 255, 255, 0.5);
    }

    .HUD-pause-play {
        outline: none;
        border: none;
        background-color: transparent;
        color: white;
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
    }

    .HUD-pause-play:hover {
        cursor: pointer;
        transform: scale(1.1);
    }

    .material-icons {
        font-size: 3rem;
        text-shadow: 0 0 1rem #f56e53, 0 0 2rem #f56e53;
    }

    .HUD-deaths, .HUD-time {
        font-size: 1.2rem;
        padding: 0.3rem 0.8rem;
    }

    .HUD-deaths-label, .HUD-time-label {
        font-size: 0.8rem;
    }

    .HUD-deaths-number, .HUD-time-value {
        font-size: 1.8rem;
    }
</style>