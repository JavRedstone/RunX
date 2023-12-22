<script lang="ts">
  import { EventName } from "$lib/classes/enums/Message";
  import { eventName } from "$lib/stores/store";

    function exitSettings(): void {
        eventName.set(EventName.TOGGLE_SETTINGS);
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
        text-align: center;
    }

    .settings-toggle {
        position: absolute;
        top: 0;
        right: 0;
        outline: none;
        border: none;
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