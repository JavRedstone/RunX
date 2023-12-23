<script lang="ts">
    import { gameSettings, toggles } from "$lib/stores/store";
    import { musicSettings } from "$lib/stores/store";

    let volume: number = $musicSettings.volume;
    let renderDistance: number = $gameSettings.renderDistance;

    function exitSettings(): void {
        toggles.update((value) => {
            return {
                ...value,
                settings: false
            }
        });
    }

    function toggleMusic(): void {
        musicSettings.update((value) => {
            return {
                ...value,
                muted: !value.muted
            }
        });
    }

    function updateMusicSettings(): void {
        musicSettings.update((value) => {
            return {
                ...value,
                volume: volume
            }
        });
    }

    function updateGameSettings(): void {
        gameSettings.update((value) => {
            return {
                ...value,
                renderDistance: renderDistance
            }
        });
    }

    $: if (volume) updateMusicSettings();

    $: if (renderDistance) updateGameSettings();
</script>

<div class="settings-wrapper">
    <h1>Game Settings</h1>
    <input class="settings-slider" type="range" min="6" max="128" bind:value={renderDistance}>
    <p class="settings-slider-value">Render distance (tiles): {renderDistance}</p>
    <h1>Music Settings</h1>
    <button class="settings-toggle" on:click={exitSettings} tabindex="-1">
        <img class="settings-toggle-icon" src="UI/exit.svg" alt="Exit icon">
    </button>
    <button class="settings-button" on:click={toggleMusic}>
        {#if $musicSettings.muted}
            Unmute music
        {:else}
            Mute music
        {/if}
    </button>
    <input class="settings-slider" type="range" min="1" max="100" bind:value={volume}>
    <p class="settings-slider-value">Volume: {volume}</p>
</div>

<style>
    .settings-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30rem;
        background-color: rgba(0, 0, 0, 0.75);
        border: 0.2rem solid #ffffff;
        border-radius: 0.5rem;
        text-align: center;
        padding: 1rem;
    }

    .settings-toggle {
        position: absolute;
        top: 0;
        right: 0;
        width: 3rem;
        height: 3rem;
        outline: none;
        border: none;
        border-bottom-left-radius: 0.5rem;
        border-top-right-radius: 0.25rem;
        background-color: #f56e53;

        &:hover {
            cursor: pointer;
        }
    }

    .settings-toggle-icon {
        width: 2rem;
        height: 2rem;
    }

    .settings-button {
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

    .settings-slider {
        -webkit-appearance: none;
        width: calc(100% - 2rem);
        height: 1rem;
        margin-top: 1rem;
        border-radius: 5px;
        background: #f56e53;
        outline: none;
    }

    .settings-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
        background: #5399f5;
        cursor: pointer;
    }

    .settings-slider::-moz-range-thumb {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: #5399f5;
        cursor: pointer;
    }
    
    .settings-slider-value {
        margin: 0;
        font-size: 1.5rem;
    }
</style>