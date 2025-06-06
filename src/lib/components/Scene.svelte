<script lang="ts">
    import { Color } from '$lib/classes/enums/Color';
  import { TileType } from '$lib/classes/enums/TileType';
    import { Game } from '$lib/classes/main/Game';
    import { Tile } from '$lib/classes/main/Tile';
    import { gameSettings, appBackgroundColor } from '$lib/stores/store';
    import { T, useThrelte, type ThrelteContext, useTask, type Size } from '@threlte/core';
    import { OrbitControls } from '@threlte/extras';
    import { BlendFunction, BloomEffect, EffectComposer, EffectPass, KernelSize, RenderPass } from 'postprocessing';
    import { onMount } from 'svelte';
    import { Fog, type Camera } from 'three';

    const TC: ThrelteContext = useThrelte();
    const { scene, renderer, camera, size, autoRender, renderStage } = TC;
    
    const game: Game = new Game(scene);
    game.start();
    setMovement();

    let effectComposer: EffectComposer = new EffectComposer(renderer);
    setupEffectComposer();

    function setupEffectComposer(): void {
        useTask(
            (delta: number) => {
                effectComposer.render(delta);
            },
            {
                stage: renderStage,
                autoInvalidate: false
            }
        );
    }

    function updateFog(): void {
        const fog: Fog = new Fog(Color.BLACK, Tile.LENGTH * (Game.RENDER_END - 1), Tile.LENGTH * Game.RENDER_END);
        scene.fog = fog;
    }

    function updateEffects(camera: Camera): void {
        let renderPass: RenderPass = new RenderPass(scene, camera);
        const bloomEffect: BloomEffect = new BloomEffect({
            blendFunction: BlendFunction.SCREEN,
            luminanceThreshold: 0,
            luminanceSmoothing: 0.25,
            intensity: 0.75,
            kernelSize: KernelSize.HUGE,
        });
        let bloomEffectPass: EffectPass = new EffectPass(camera, bloomEffect);
        bloomEffectPass.renderToScreen = true;

        effectComposer.removeAllPasses();
        effectComposer.setSize(window.innerWidth, window.innerHeight);
        effectComposer.addPass(renderPass);
        effectComposer.addPass(bloomEffectPass);
    }

    function updateComposerSize(size: Size): void {
        effectComposer.setSize(size.width, size.height);
    }
    
    function updateRenderPass(camera: Camera, size: Size): void {
        updateFog();
        updateEffects(camera);
        updateComposerSize(size);
    }

    function setMovement(): void {
        document.addEventListener('keydown', (e) => {
            if (e.key == 'w' || e.key == 'W' || e.key == 'ArrowUp' || e.key == ' ') {
                game.player.pressedJump = true;
            } else if (e.key == 'Shift') {
                game.player.pressedRun = true;
            } else if (e.key == 'a' || e.key == 'A' || e.key == 'ArrowLeft') {
                game.player.pressedStrafeLeft = true;
            } else if (e.key == 'd' || e.key == 'D' || e.key == 'ArrowRight') {
                game.player.pressedStrafeRight = true;
            } else if (e.key == 'r' || e.key == 'R') {
                game.player.pressedReset = true;
            }
        });
        document.addEventListener('keyup', (e) => {
            if (e.key == 'w' || e.key == 'W' || e.key == 'ArrowUp') {
                game.player.pressedJump = false;
            } else if (e.key == 'Shift') {
                game.player.pressedRun = false;
            } else if (e.key == 'a' || e.key == 'A' || e.key == 'ArrowLeft') {
                game.player.pressedStrafeLeft = false;
            } else if (e.key == 'd' || e.key == 'D' || e.key == 'ArrowRight') {
                game.player.pressedStrafeRight = false;
            } else if (e.key == 'r' || e.key == 'R') {
                game.player.pressedReset = false;
            }
        });
    }

    function checkPlayerTile(): void {
        if (game.player.currTile?.type === TileType.ENDING) {
            appBackgroundColor.set(Color.ORANGE);
            scene.fog.color.set(Color.ORANGE);
        } else {
            appBackgroundColor.set(Color.BLACK);
            scene.fog.color.set(Color.BLACK);
        }
    }

    $: if (camera && scene) updateRenderPass($camera, $size);

    gameSettings.subscribe((value) => {
        updateFog();
    });

    onMount(() => {
        let before: boolean = autoRender.current;
        autoRender.set(false);
        return () => {
            autoRender.set(before);
        }
    });

    useTask(() => {
        checkPlayerTile();
    }, { stage: renderStage });
    
    $: if (game.player) {
        checkPlayerTile();
    }
</script>

<T.PerspectiveCamera
  makeDefault
  fov={75}

  bind:ref={game.camera}
>
  <OrbitControls
    enableDamping
    enableRotate={false}
    enableKeys={false}
    enablePan={false}
    enableZoom={false}

    bind:ref={game.orbitControls}
  />
</T.PerspectiveCamera>