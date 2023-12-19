import type { TileType } from "$lib/enums/TileType";
import type { BoxGeometry, Euler, Mesh, MeshLambertMaterial, Vector3 } from "three";

export class Tile {
    public static readonly LENGTH: number = 1;
    public static readonly HEIGHT: number = 0.1;

    public position: Vector3;
    public rotation: Euler;
    public dimensions: Vector3;
    
    public type: TileType;
    public color: string;

    public mesh: Mesh;
    public geometry: BoxGeometry;
    public material: MeshLambertMaterial;
}