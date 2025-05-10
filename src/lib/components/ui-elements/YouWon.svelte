<script lang="ts">
  import { MathHelper } from "$lib/classes/helpers/MathHelper";
  import { stats } from "$lib/stores/store";
  import confetti from "canvas-confetti";
  import { onMount, onDestroy } from "svelte";

  let confettiInterval: ReturnType<typeof setInterval>;

  onMount(() => {
    confettiInterval = setInterval(() => {
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(confettiInterval);
  });
</script>

<div class="you-won-wrapper">
    <h1 class="you-won-title">Congratulations!</h1>
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

    .you-won-title {
        position: absolute;
        top: 2rem;
        font-size: 3rem;
        text-shadow: 0 0 1rem #ffffff;
        user-select: none;
        text-align: center;
    }

    .you-won-subtitle {
        position: absolute;
        top: 7rem;
        font-size: 2rem;
        text-shadow: 0 0 1rem #ffffff;
        user-select: none;
        text-align: center;
    }

    .you-won-button {
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

    .you-won-button:hover {
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

    .you-won-restart {
        top: calc(23rem);
    }

    .you-won-stats {
        position: absolute;
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

