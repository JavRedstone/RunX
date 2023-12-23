<script lang="ts">
    import { toggles } from "$lib/stores/store";

    function exitSettings(): void {
        toggles.update((value) => {
            return {
                ...value,
                credits: false
            }
        });
    }
</script>

<div class="credits-wrapper">
    <button class="credits-toggle" on:click={exitSettings} tabindex="-1">
        <img class="credits-toggle-icon" src="UI/exit.svg" alt="Exit icon">
    </button>
    <h1>Game Credits</h1>
    <p>Created by JavRedstone</p>
    <p>Original game idea from Space Run 3 published by Unblocked Games FreezeNova</p>
    <p>Feature ideas suggested by my friends</p>
    <h1>Music Credits</h1>
    <p>
        Ghostrifter Official - Neon Drive" is under a Creative Commons (CC BY-ND 3.0) license.
    </p>
    <a href="https://creativecommons.org/licenses/by-nd/3.0/" target="_blank">https://creativecommons.org/licenses/by-nd/3.0/</a>
    <br>
    <a href="https://soundcloud.com/ghostrifter-official" target="_blank">https://soundcloud.com/ghostrifter-official</a>
    <br>
    <a href="https://www.youtube.com/channel/UCoRhkLdsX2OKwaEjwdZIQ8Q" target="_blank">https://www.youtube.com/channel/UCoRhkLdsX2OKwaEjwdZIQ8Q</a>
    <p>
        Music promoted by BreakingCopyright:
        <a href="https://www.youtube.com/watch?v=kQj5HUhTXcc" target="_blank">https://www.youtube.com/watch?v=kQj5HUhTXcc</a>
    </p>
</div>

<style>
    .credits-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 33rem;
        background-color: rgba(0, 0, 0, 0.75);
        border: 0.2rem solid #ffffff;
        border-radius: 0.5rem;
        text-align: center;
        padding: 1rem;
        backdrop-filter: blur(0.5rem);
    }

    .credits-toggle {
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

    .credits-toggle-icon {
        width: 2rem;
        height: 2rem;
    }

    a {
        color: #ffffff;
    }
</style>