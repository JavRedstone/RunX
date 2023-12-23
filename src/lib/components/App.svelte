<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from './Scene.svelte';
  import Start from './ui-elements/Start.svelte';
  import Hud from './ui-elements/HUD.svelte';
  import Settings from './ui-elements/Settings.svelte';
  import YouWon from './ui-elements/YouWon.svelte';
  
  import { toggles } from '$lib/stores/store';
</script>

{#if !$toggles.won}
  {#if !$toggles.started}
    <Start />
  {:else}
    <Hud />
    <Canvas>
      <Scene />
    </Canvas>
  {/if}

  {#if $toggles.settings}
    <Settings />
  {/if}
{:else}
  <YouWon />
{/if}