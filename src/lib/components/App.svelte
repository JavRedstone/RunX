<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from './Scene.svelte';
  import Start from './ui-elements/Start.svelte';
  import Hud from './ui-elements/HUD.svelte';
  import Settings from './ui-elements/Settings.svelte';
  import YouWon from './ui-elements/YouWon.svelte';
  
  import { musicSettings, toggles } from '$lib/stores/store';
  import TilePreferenceChooser from './ui-elements/SceneSettings.svelte';

  import NoCopyrightMusic from '$lib/music/NoCopyrightMusic.mp3';
  import { onMount } from 'svelte';
  import Credits from './ui-elements/Credits.svelte';

  let audio: HTMLAudioElement;
  onMount(() => {
    document.body.addEventListener('click', () => {
      audio.play();
    });
    musicSettings.subscribe((value) => {
      audio.muted = value.muted;
      audio.volume = value.volume / 100;
    });
  });
</script>

<audio bind:this={audio} loop={true} autoplay={true}>
  <source src={NoCopyrightMusic} type="audio/mpeg" />
</audio>

{#if !$toggles.won}
  {#if !$toggles.started}
    <Start />
  {:else}
    <Hud />
    <Canvas>
      <Scene />
    </Canvas>

    {#if $toggles.mode === 'creative'}
      <TilePreferenceChooser />
    {/if}
  {/if}

  {#if $toggles.settings}
    <Settings />
  {/if}
  {#if $toggles.credits}
    <Credits />
  {/if}
{:else}
  <YouWon />
{/if}