<script lang="ts">
  import App from '$lib/components/App.svelte';
  import { appBackgroundColor } from '$lib/stores/store';
</script>

<svelte:head>
  <title>Run X</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</svelte:head>

<div class="app" style="background-color: {$appBackgroundColor}; transition: background-color 0.5s ease-in-out;">
  <App />
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  * { 
    color: white;
    text-shadow: 0 0 1rem #ffffff;
    font-family: 'Poppins', sans-serif;
  }

  .app {
    width: 100vw;
    height: 100vh;
  }
</style>
