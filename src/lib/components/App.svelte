<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from './Scene.svelte';
  import Start from './ui-elements/Start.svelte';
  import { eventName } from '$lib/stores/store';
  import { EventName } from '$lib/classes/enums/Message';
    import Hud from './ui-elements/HUD.svelte';

  let hasStarted: boolean = false;
  eventName.subscribe((value: EventName) => {
    if (value === EventName.START) {
      hasStarted = true;
    }
  });
</script>

{#if !hasStarted}
  <Start />
{:else}
  <Hud />
  <Canvas>
    <Scene />
  </Canvas>
{/if}
