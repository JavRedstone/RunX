<script lang="ts">
    import { toggles } from "$lib/stores/store";

    function startGame(): void {
        toggles.update((value) => {
            return {
                ...value,
                started: true,
                settings: false
            }
        });
    }

    function switchMode(): void {
        toggles.update((value) => {
            return {
                ...value,
                mode: value.mode === "speedrun" ? "creative" : "speedrun"
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
</script>

<div class="start-wrapper">
    <h1 class="start-title">Run X</h1>
    <button class="start-button start-start" tabindex="-1" on:click={startGame}>Start</button>
    <button class="start-button start-mode" tabindex="-1" on:click={switchMode}>
        Mode: 
        {#if $toggles.mode === "speedrun"}
            Speedrun
        {:else if $toggles.mode === "creative"}
            Creative
        {/if}
    </button>
    <button class="start-button start-settings" tabindex="-1" on:click={openSettings}>Settings</button>
</div>

<style>
    .start-wrapper {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(#f56e53, #f5ba53, #f5e553);
    }

    .start-title {
        position: absolute;
        top: 2rem;
        left: 50%;
        transform: translate(-50%);
        font-size: 5rem;
        text-shadow: 0 0 1rem #ffffff;
        user-select: none;
        text-align: center;
    }

    .start-button {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
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

    .start-start {
        top: calc(16rem);
        border-bottom: 0.1rem dashed #ffffff;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .start-mode {
        top: calc(20rem);
        border-top: 0.1rem dashed #ffffff;
        border-top-left-radius: 0;
        border-top-right-radius: 0;

        background-color: #5399f5;

        &:hover {
            background-color: #ed53f5;
        }
    }

    .start-settings {
        top: calc(26rem);
    }
</style>

