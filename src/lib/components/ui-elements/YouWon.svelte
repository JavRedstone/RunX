<script lang="ts">
  import { MathHelper } from "$lib/classes/helpers/MathHelper";
    import { stats } from "$lib/stores/store";
</script>

<div class="you-won-wrapper">
    <h1 class="you-won-title">Congradulations!</h1>
    <h2 class="you-won-subtitle">You Beat RunX!</h2>
    <p class="you-won-stats you-won-stats-level">Level: {$stats.level}</p>
    <p class="you-won-stats you-won-stats-deaths">Deaths: {$stats.deaths}</p>
    <p class="you-won-stats you-won-stats-time">Time: {MathHelper.toHoursMinsSecs($stats.time)}</p>
    <button class="you-won-button you-won-restart" tabindex="-1" on:click={()=>location.reload()}>Restart</button>
</div>

<style>
    .you-won-wrapper {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(45deg, #f56e53, #f5a653, #f5d453, #c5f553, #53f5a6, #53f5d4, #53a6f5, #535cf5, #a653f5, #f553f5, #f553a6, #f5535c);
    }

    .you-won-title {
        position: absolute;
        top: 2rem;
        left: 50%;
        transform: translate(-50%);
        font-size: 3rem;
        text-shadow: 0 0 1rem #ffffff;
        user-select: none;
        text-align: center;
    }

    .you-won-subtitle {
        position: absolute;
        top: 7rem;
        left: 50%;
        transform: translate(-50%);
        font-size: 2rem;
        text-shadow: 0 0 1rem #ffffff;
        user-select: none;
        text-align: center;
    }

    .you-won-button {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20rem;
        height: 4rem;
        border-radius: 0.5rem;
        background-color: #f56e53;
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

    .you-won-restart {
        top: calc(23rem);
    }

    .you-won-stats {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        width: 12rem;
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        background-color: rgb(0, 0, 0, 0.5);
        border-radius: 0.5rem;
        font-size: 1rem;
        text-shadow: 0 0 1rem #ffffff;
        user-select: none;
        text-align: center;
    }

    .you-won-stats-level {
        top: 11rem;
    }

    .you-won-stats-deaths {
        top: 14rem;
    }

    .you-won-stats-time {
        top: 17rem;
    }
</style>

