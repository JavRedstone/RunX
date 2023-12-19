<script lang="ts">
  import { Color } from '$lib/classes/enums/Color';
    import { Game } from '$lib/classes/main/Game';
    import { T, useThrelte, type ThrelteContext, useTask, type Size } from '@threlte/core';
    import { BlendFunction, BloomEffect, EffectComposer, EffectPass, KernelSize, RenderPass } from 'postprocessing';
    import { onMount } from 'svelte';
    import { Fog, type Camera } from 'three';

    const TC: ThrelteContext = useThrelte();
    const { scene, renderer, camera, size, autoRender, renderStage } = TC;
    const game: Game = new Game();

    let effectComposer: EffectComposer = new EffectComposer(renderer);
    const fog: Fog = new Fog(Color.BLACK, 20, 30);
    setupEffectComposer();

    function setupEffectComposer(): void {
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

    function updateFog(): void {
        scene.fog = fog;
    }

    function updateBloomEffect(camera: Camera): void {
        const bloomEffect: BloomEffect = new BloomEffect({
            blendFunction: BlendFunction.SCREEN,
            luminanceThreshold: 0,
            luminanceSmoothing: 0.25,
            intensity: 1,
            kernelSize: KernelSize.HUGE,
        });
        let renderPass: RenderPass = new RenderPass(scene, camera);
        let effectPass: EffectPass = new EffectPass(camera, bloomEffect);
        effectPass.renderToScreen = true;

        effectComposer.removeAllPasses();
        effectComposer.setSize(window.innerWidth, window.innerHeight);
        effectComposer.addPass(renderPass);
        effectComposer.addPass(effectPass);
    }

    function updateComposerSize(size: Size): void {
        effectComposer.setSize(size.width, size.height);
    }
    
    function updateRenderPass(camera: Camera, size: Size): void {
        updateFog();
        updateBloomEffect(camera);
        updateComposerSize(size);
    }

    $: if (camera && scene) updateRenderPass($camera, $size);

    onMount(() => {
        let before: boolean = autoRender.current;
        autoRender.set(false);
        return () => {
            autoRender.set(before);
        }
    });
</script>