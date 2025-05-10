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
        <span class="material-icons">close</span>
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
        background: linear-gradient(135deg, #2c2c2c, #1a1a1a);
        border: 0.2rem solid #ffffff;
        border-radius: 0.5rem;
        text-align: center;
        padding: 1rem;
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.5);
        animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -60%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
    }

    .settings-toggle {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        width: 3rem;
        height: 3rem;
        outline: none;
        border: none;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        transition: transform 0.3s ease, background-color 0.3s ease;
    }

    .settings-toggle:hover {
        cursor: pointer;
        transform: scale(1.1);
        background-color: rgba(255, 255, 255, 0.2);
    }

    .settings-button {
        width: 20rem;
        height: 4rem;
        border-radius: 0.5rem;
        background: linear-gradient(45deg, #f56e53, #f5ba53);
        border: 0.2rem solid #ffffff;
        color: #ffffff;
        text-shadow: 0 0 1rem #ffffff;
        font-family: 'Poppins', sans-serif;
        font-size: 2rem;
        margin-top: 1rem;
        transition: transform 0.3s ease, background 0.3s ease;
    }

    .settings-button:hover {
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
        color: white;
        text-shadow: 0 0 1rem black;
    }
</style>