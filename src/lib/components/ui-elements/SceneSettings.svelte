<script lang="ts">
    import { sceneSettings } from "$lib/stores/store";
    import { StringHelper } from "$lib/classes/helpers/StringHelper";
    import { NumDistrib } from "$lib/classes/structs/NumDistrib";
    import { Level } from "$lib/classes/main/Level";
    import { Ring } from "$lib/classes/main/Ring";
    import { TileType } from "$lib/classes/enums/TileType";
    import { onMount } from "svelte";
    import { Tile } from "$lib/classes/main/Tile";
  import { Game } from "$lib/classes/main/Game";
  
    let sceneLength: number = 50;
    let numSides: number = Level.MIN_SIDES;
    let ringRadius: number = Ring.RADIUS;
    let gravity: number = Game.GRAVITY;
    let tP = {
        empty: 5,
        normal: 10,
        falling: 4,
        jump: 3,
        bomb: 2,
        boost: 1,
        slow: 1
    };

    function updateSceneSettings(): void {
        sceneSettings.update((value) => {
            return {
                ...value,
                levelLength: sceneLength,
                numSides: numSides,
                ringRadius: ringRadius,
                gravity: gravity,
                tileDistribution: new NumDistrib(numSides, TileType.SLOW + 1),
                tilePreference: Object.values(tP)
            }
        });
    }

    onMount(() => {
        updateSceneSettings();
    });
</script>

<div class="scene-settings-wrapper">
    <p class="scene-settings-large-input-title">Scene length (tiles)</p>
    <input class="scene-settings-input scene-settings-large-input" tabindex="-1" placeholder="Scene length (tiles)" type="number" bind:value={sceneLength}>
    <p class="scene-settings-large-input-title">Number of sides</p>
    <input class="scene-settings-input scene-settings-large-input" tabindex="-1" placeholder="Number of sides" type="number" bind:value={numSides}>
    <p class="scene-settings-large-input-title">Radius of ring</p>
    <input class="scene-settings-input scene-settings-large-input" tabindex="-1" placeholder="Radius of ring" type="number" bind:value={ringRadius}>
    <p class="scene-settings-large-input-title">Gravity</p>
    <input class="scene-settings-input scene-settings-large-input" tabindex="-1" placeholder="Tile length" type="number" bind:value={gravity}>
    <p class="scene-settings-large-input-title">Tile preference</p>
    <table class="scene-settings-table">
        {#each Object.keys(tP) as tile}
            <tr>
                <td>{StringHelper.capitalizeFirstLetter(tile)}</td>
                <td>
                    <input class="scene-settings-input" tabindex="-1" placeholder={tile} type="number" bind:value={tP[tile]}>
                </td>
            </tr>
        {/each}
    </table>
    <button class="scene-settings-button" on:click={updateSceneSettings}>Update current level</button>
</div>

<style>
    .scene-settings-wrapper {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        background-color: rgba(0, 0, 0, 0.75);
        border: 0.2rem solid #ffffff;
        border-radius: 0.5rem;
        text-align: left;
        padding: 0.5rem;
        padding-right: 0;
    }

    .scene-settings-large-input-title {
        margin: 0;
    }

    .scene-settings-input {
        height: 1rem;
        padding-left: 0.25rem;
        border-radius: 0.25rem;
        border: 0.1rem solid #ffffff;
        outline: none;
        background-color: #f56e53;
        color: #ffffff;
        text-shadow: 0 0 1rem #ffffff;
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;

        transition: 0.25s;

        &::placeholder {
            color: #ffffff;
        }

        &:hover {
            cursor: text;
        }

        &:focus {
            background-color: #5399f5;
        }
    }

    .scene-settings-large-input {
        width: calc(100% - 1rem);
    }

    .scene-settings-table td {
        padding-right: 0.5rem;
    }

    .scene-settings-button {
        width: calc(100% - 0.5rem);
        margin-top: 0.5rem;
        height: 2rem;
        border-radius: 0.5rem;
        background-color: #5399f5;
        border: 0.1rem solid #ffffff;
        color: #ffffff;
        text-shadow: 0 0 1rem #ffffff;
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;

        transition: 0.25s;

        &:hover {
            cursor: pointer;

            background-color: #ed53f5;
        }
    }
</style>