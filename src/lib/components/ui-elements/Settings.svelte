<script lang="ts">
    import { toggles } from "$lib/stores/store";

    function exitSettings(): void {
        toggles.update((value) => {
            return {
                ...value,
                settings: false
            }
        });
    }
</script>

<div class="settings-wrapper">
    <button class="settings-toggle" on:click={exitSettings} tabindex="-1">
        <img class="settings-toggle-icon" src="UI/exit.svg" alt="Exit icon">
    </button>
    <h1>Settings</h1>
</div>

<style>
    .settings-wrapper {
        position: absolute;
        top: 5rem;
        left: 50%;
        transform: translate(-50%);
        width: 30rem;
        height: 30rem;
        background-color: rgba(0, 0, 0, 0.75);
        border: 0.2rem solid #ffffff;
        border-radius: 0.5rem;
        text-align: center;
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
</style>