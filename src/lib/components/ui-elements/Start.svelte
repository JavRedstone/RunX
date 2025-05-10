<script lang="ts">
    import { toggles } from "$lib/stores/store";

    function startGame(): void {
        toggles.update((value) => {
            return {
                ...value,
                started: true,
                settings: false,
                credits: false
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

    function openCredits(): void {
        toggles.update((value) => {
            return {
                ...value,
                credits: true
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
    <button class="start-button start-credits" tabindex="-1" on:click={openCredits}>Credits</button>
</div>

<style>
    .start-wrapper {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(45deg, #f56e53, #f5ba53, #f5e553);
        background-size: 300% 300%;
        animation: gradientAnimation 6s ease infinite;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .start-title {
        font-size: 5rem;
        text-shadow: 0 0 1rem #ffffff;
        user-select: none;
        text-align: center;
        font-family: 'Poppins', sans-serif;
        color: #ffffff;
        margin-bottom: 2rem;
        animation: fadeIn 1.5s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .start-button {
        width: 20rem;
        height: 4rem;
        border-radius: 0.5rem;
        background-color: #f56e53;
        border: 0.2rem solid #ffffff;
        color: #ffffff;
        text-shadow: 0 0 1rem #ffffff;
        font-family: 'Poppins', sans-serif;
        font-size: 2rem;
        margin: 0;
        transition: all 0.3s ease;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    }

    .start-button:hover {
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

    .start-start {
        border-bottom: 0.1rem dashed #ffffff;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .start-mode {
        background-color: #5399f5;
        border-top: 0.1rem dashed #ffffff;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .start-mode:hover {
        background: linear-gradient(90deg, #5399f5, #ed53f5, #f56e53);
        background-size: 200% 200%;
        animation: hoverGradient 1.5s ease infinite;
    }

    .start-settings {
        margin-top: 1rem;
    }

    .start-credits {
        margin-top: 1rem;
    }
</style>

