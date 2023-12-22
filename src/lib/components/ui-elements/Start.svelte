<script lang="ts">
    import { EventName } from "$lib/classes/enums/Message";
    import { eventName } from "$lib/stores/store";

    function startGame(): void {
        eventName.set(EventName.START);
    }
</script>

<div class="start-wrapper">
    <h1 class="start-title">Run X</h1>
    <button class="start-button start-start" on:click={startGame}>Start</button>
    <button class="start-button start-settings">Settings</button>
</div>

<style>
    .start-wrapper {
        width: 100vw;
        height: 100vh;
        /* background: linear-gradient(45deg, #f56e53, #f5a653, #f5d453, #c5f553, #53f5a6, #53f5d4, #53a6f5, #535cf5, #a653f5, #f553f5, #f553a6, #f5535c); */
        background: linear-gradient(#f56e53, #f5ba53, #f5e553);
    }

    .start-title {
        position: absolute;
        top: 5rem;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 5rem;
        text-shadow: 0 0 1rem #ffffff;
        user-select: none;
    }

    .start-button {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20rem;
        height: 4rem;
        border: none;
        border-radius: 0;
        background-color: #808080;
        border: 0.2rem solid #ffffff;
        color: #ffffff;
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
    }

    .start-settings {
        top: calc(22rem);
    }
</style>

