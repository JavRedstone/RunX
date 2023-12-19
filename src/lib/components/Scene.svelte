<script lang="ts">
    import { Game } from '$lib/main/Game';
    import { T, useThrelte, type ThrelteContext, useTask } from '@threlte/core';
    import { BlendFunction, BloomEffect, EffectComposer, EffectPass, KernelSize, RenderPass } from 'postprocessing';
    import { onMount } from 'svelte';
    import type { Camera } from 'three';

    const TC: ThrelteContext = useThrelte();
    const { scene, renderer, camera, size, autoRender, renderStage } = TC;
    const game: Game = new Game();

    let effectComposer: EffectComposer;
    setupEffectComposer();

    function setupEffectComposer(): void {
        effectComposer = new EffectComposer(renderer);
        useTask(
            (delta: number) => {
                effectComposer.render(delta);
            },
            {
                stage: this.TC.renderStage,
                autoInvalidate: false
            }
        );
    }

    function updateBloomEffect(camera: Camera): void {
        const bloomEffect: BloomEffect = new BloomEffect({
            blendFunction: BlendFunction.SCREEN,
            luminanceThreshold: 0,
            luminanceSmoothing: 0.25,
            intensity: 1,
            kernelSize: KernelSize.HUGE,
        });
        let renderPass: RenderPass = new RenderPass(this.TC.scene, camera);
        let effectPass: EffectPass = new EffectPass(camera, bloomEffect);
        effectPass.renderToScreen = true;

        effectComposer.removeAllPasses();
        effectComposer.setSize(window.innerWidth, window.innerHeight);
        effectComposer.addPass(renderPass);
        effectComposer.addPass(effectPass);
    }
    
    function updateRenderPass(camera: Camera): void {
        updateBloomEffect(camera);
    }

    $: if (camera && scene) updateRenderPass($camera);

    onMount(() => {
        let before: boolean = autoRender.current;
        autoRender.set(false);
        return () => {
            autoRender.set(before);
        }
    });
</script>