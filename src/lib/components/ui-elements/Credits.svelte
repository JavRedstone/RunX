<script lang="ts">
    import { toggles } from "$lib/stores/store";

    function exitSettings(): void {
        toggles.update((value) => {
            return {
                ...value,
                credits: false
            };
        });
    }
</script>

<div class="credits-wrapper">
    <button class="credits-toggle" on:click={exitSettings} tabindex="-1">
        <span class="material-icons">close</span>
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

    .credits-toggle {
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

    .credits-toggle:hover {
        cursor: pointer;
        transform: scale(1.1);
        background-color: rgba(255, 255, 255, 0.2);
    }

    a {
        color: #ffffff;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    a:hover {
        color: #f5ba53;
    }
</style>