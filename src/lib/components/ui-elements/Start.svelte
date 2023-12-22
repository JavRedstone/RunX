<script lang="ts">
    import { EventName } from "$lib/classes/enums/Message";
    import { eventName } from "$lib/stores/store";

    function startGame(): void {
        eventName.set(EventName.START);
    }
</script>

<div class="start-wrapper">
    <h1 class="start-title">Run X</h1>
    <button class="start-button" on:click={startGame}>Start</button>
</div>

<style>
    .start-wrapper {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(45deg, #f56e53, #f5a653, #f5d453, #c5f553, #53f5a6, #53f5d4, #53a6f5, #535cf5, #a653f5, #f553f5, #f553a6, #f5535c);
    }

    .start-title {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 5rem;
        text-shadow: 0 0 1rem #ffffff;
    }

    .start-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20rem;
        height: 5rem;
        border: none;
        border-radius: 0.5rem;
        background-color: #45ff4e;
        box-shadow: 0 0 1rem #45ff4e;
        font-family: 'Poppins', sans-serif;
        font-size: 2rem;

        transition: 0.5s;

        &:hover {
            cursor: pointer;

            background-color: #5399f5;
            box-shadow: 0 0 1rem #5399f5;
        }
    }
</style>

