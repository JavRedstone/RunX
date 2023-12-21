import { TileType } from "$lib/classes/enums/TileType";
import { Vector3, BoxGeometry, Euler, Mesh, MeshLambertMaterial, Scene } from "three";
import { Ring } from "./Ring";

export class Tile {
    public static readonly LENGTH: number = 2;
    public static readonly HEIGHT: number = 0.1;

    public static readonly JUMPING_BOOST_SPEED: number = 0.2;
    public static readonly FORWARD_BOOST_SPEED: number = 0.1;

    public static readonly FALL_ACCELERATION: number = 0.003;
    public static readonly MAX_FALL_MULTIPLIER: number = 3;

    public static readonly SHRINK_RATE: number = 0.01;
    public static readonly MIN_SHRINK_SCALE: number = 0.25;

    public position: Vector3;
    public originalPosition: Vector3;
    public velocity: Vector3;
    public acceleration: Vector3;
    public rotation: Euler;
    public dimensions: Vector3;
    public scale: Vector3;
    
    public type: number;
    public color: string;

    public hasBeenTouched: boolean = false;
    public touchOriginType: number;
    public destroyed: boolean = false;

    public mesh: Mesh;
    public geometry: BoxGeometry;
    public material: MeshLambertMaterial;

    public scene: Scene;

    public constructor(scene: Scene, position: Vector3, rotation: Euler, dimensions: Vector3, type: number) {
        this.scene = scene;

        this.position = position;
        this.originalPosition = position.clone();
        this.velocity = new Vector3(0, 0, 0);
        this.acceleration = new Vector3(0, 0, 0);
        this.rotation = rotation;
        this.dimensions = dimensions;
        this.scale = new Vector3(1, 1, 1);
        this.type = type;
        this.color = TileType.getColor(this.type);

        this.create();
    }

    public equals(other: Tile): boolean {
        return this.position.equals(other.position) && this.rotation.equals(other.rotation) && this.dimensions.equals(other.dimensions) && this.type == other.type;
    }

    public getNormal(face: number): Vector3 {
        return new Vector3(0, 1, 0).applyEuler(this.rotation);
    }

    public update(): void {
        this.move();
        this.updIntrinsic();
    }

    public move(): void {
        if (this.hasBeenTouched) {
            switch(this.touchOriginType) {
                case TileType.FALLING:
                    this.acceleration.y = -Tile.FALL_ACCELERATION;
                    break;
                case TileType.BOMB:
                    this.scale.multiplyScalar(1 - Tile.SHRINK_RATE);
                    break;
            }
        }
    }

    public distSurfaceTo(position: Vector3): number {
        const localPoint = position.clone().sub(this.position).applyAxisAngle(new Vector3(1, 0, 0), -this.rotation.x);
        const halfDimensions = this.dimensions.clone().multiplyScalar(0.5);
        const dx = Math.max(Math.abs(localPoint.x) - halfDimensions.x, 0);
        const dy = Math.max(Math.abs(localPoint.y) - halfDimensions.y, 0);
        const dz = Math.max(Math.abs(localPoint.z) - halfDimensions.z, 0);
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    public updIntrinsic(): void {
        this.velocity.add(this.acceleration);
        let rotatedVelocity: Vector3 = this.velocity.clone().applyEuler(
            new Euler(this.rotation.x - Math.PI / 2, this.rotation.y, this.rotation.z)
        );
        this.position.add(rotatedVelocity);

        if (this.position.distanceTo(new Vector3(this.position.x, 0, 0)) > Ring.RADIUS * Tile.MAX_FALL_MULTIPLIER) {
            this.destroy();
        }
        if (this.scale.x < Tile.MIN_SHRINK_SCALE) {
            this.destroy();
        }
    }

    public create(): void {
        this.destroyed = false;
        
        this.geometry = new BoxGeometry(this.dimensions.x, this.dimensions.y, this.dimensions.z);
        this.material = new MeshLambertMaterial({ color: this.color, emissive: this.color });
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);

        this.mesh.visible = this.type == TileType.EMPTY ? false : true;

        this.scene.add(this.mesh);
    }

    public reset(): void {
        this.hasBeenTouched = false;
        this.touchOriginType = null;
        this.position = this.originalPosition.clone();
        this.velocity = new Vector3(0, 0, 0);
        this.acceleration = new Vector3(0, 0, 0);
        this.scale = new Vector3(1, 1, 1);
    }

    public destroy(): void {
        if (this.mesh) {
            this.scene.remove(this.mesh);
            this.mesh.geometry.dispose();
        }
        if (this.geometry) {
            this.geometry.dispose();
        }
        if (this.material) {
            this.material.dispose();
        }
        
        this.mesh = null;
        this.geometry = null;
        this.material = null;

        this.destroyed = true;
        
        this.reset();
    }

    public updateRender(): void {
        if (this.mesh) {
            this.mesh.position.set(this.position.x, this.position.y, this.position.z);
            this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
            this.mesh.visible = this.type == TileType.EMPTY ? false : true;
        }
        if (this.material) {
            this.material.color.set(this.color);
            this.material.emissive.set(this.color);
        }
        if (this.geometry) {
            this.mesh.geometry.scale(this.scale.x, this.scale.y, this.scale.z);
        }
    }
}