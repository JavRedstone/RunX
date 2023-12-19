import { TileType } from "$lib/classes/enums/TileType";
import { Vector3, BoxGeometry, type Euler, Mesh, MeshLambertMaterial } from "three";

export class Tile {
    public static readonly LENGTH: number = 1;
    public static readonly HEIGHT: number = 0.1;

    public position: Vector3;
    public rotation: Euler;
    public dimensions: Vector3;
    
    public type: number;
    public color: string;

    public mesh: Mesh;
    public geometry: BoxGeometry;
    public material: MeshLambertMaterial;

    public constructor(position: Vector3, rotation: Euler, dimensions: Vector3, type: number) {
        this.position = position;
        this.rotation = rotation;
        this.dimensions = dimensions;
        this.type = type;
        this.color = TileType.getColor(this.type);

        this.spawn();
    }

    public spawn(): void {
        this.geometry = new BoxGeometry(this.dimensions.x, this.dimensions.y, this.dimensions.z);
        this.material = new MeshLambertMaterial({ color: this.color });
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    }

    public destroy(): void {
        this.geometry.dispose();
        this.material.dispose();

        this.mesh.geometry.dispose();

        this.mesh = null;
    }

    public getNormal(face: number): Vector3 {
        return new Vector3(0, 1, 0).applyEuler(this.rotation);
    }
}