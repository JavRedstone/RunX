<script lang="ts">
  import App from '$lib/components/App.svelte'
</script>

<div>
  <App />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  div {
    width: 100vw;
    height: 100vh;
    background: #000;
  }
</style>
