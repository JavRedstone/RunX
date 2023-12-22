<script lang="ts">
  import App from '$lib/components/App.svelte';
</script>

<svelte:head>
  <title>Run X</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</svelte:head>

<div>
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
    font-family: 'Poppins', sans-serif;
  }

  div {
    width: 100vw;
    height: 100vh;
    background-color: #000000;
  }
</style>
