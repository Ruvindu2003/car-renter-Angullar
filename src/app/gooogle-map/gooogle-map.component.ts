import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-gooogle-map',
  templateUrl: './gooogle-map.component.html',
  styleUrls: ['./gooogle-map.component.css'],
  imports:[CommonModule]
})
export class GooogleMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;
  @Input() carModelPath: string = 'assets/models/car.glb';
  @Input() carName: string = 'Premium Sedan';
  @Input() dailyRate: number = 75;
  @Input() features: string[] = ['GPS', 'Bluetooth', 'Air Conditioning'];

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private carModel!: THREE.Object3D;
  private animationId!: number;
  isRotating = true;
  modelLoaded = false;
  selectedColor: string = '#ffffff';
  rentalDays: number = 1;
  totalPrice: number = this.dailyRate;

  colorOptions = [
    { name: 'Ruby Red', value: '#ff0000', premium: 10 },
    { name: 'Ocean Blue', value: '#0000ff', premium: 5 },
    { name: 'Onyx Black', value: '#000000', premium: 0 },
    { name: 'Pearl White', value: '#ffffff', premium: 7 },
    { name: 'Silver Metallic', value: '#c0c0c0', premium: 3 },
    { name: 'Emerald Green', value: '#2e8b57', premium: 8 }
  ];

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.loadCarModel();
    this.animate();
    this.addWindowResizeListener();
  }

  ngOnDestroy(): void {
    this.cleanupThreeJS();
  }

  private initThreeJS(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf5f5f5);

   
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.2);
    this.scene.add(hemisphereLight);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 1, 5);

    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  private loadCarModel(): void {
    const loader = new GLTFLoader();
    loader.load(
      this.carModelPath,
      (gltf: GLTF) => {
        this.carModel = gltf.scene;
        this.prepareModel();
        this.scene.add(this.carModel);
        this.modelLoaded = true;
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
        this.createFallbackModel();
        this.modelLoaded = true;
      }
    );
  }

  private prepareModel(): void {
   
    const box = new THREE.Box3().setFromObject(this.carModel);
    const center = box.getCenter(new THREE.Vector3());
    this.carModel.position.sub(center);

    const size = box.getSize(new THREE.Vector3()).length();
    const scale = 5 / Math.max(size, 1);
    this.carModel.scale.set(scale, scale, scale);

    this.carModel.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  private createFallbackModel(): void {
    const bodyGeometry = new THREE.BoxGeometry(3, 1.5, 6);
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32);
    
    // Create car body
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2e8b57,
      metalness: 0.3,
      roughness: 0.6
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.75;
    body.castShadow = true;

    
    const wheelMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333,
      metalness: 0.8,
      roughness: 0.2
    });

    const positions = [
      { x: -1.2, y: -0.5, z: 2, ry: Math.PI/2 },
      { x: 1.2, y: -0.5, z: 2, ry: Math.PI/2 },
      { x: -1.2, y: -0.5, z: -2, ry: Math.PI/2 },
      { x: 1.2, y: -0.5, z: -2, ry: Math.PI/2 }
    ];

    const wheels = positions.map(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.position.set(pos.x, pos.y, pos.z);
      wheel.rotation.y = pos.ry;
      wheel.castShadow = true;
      return wheel;
    });

    this.carModel = new THREE.Group();
    this.carModel.add(body, ...wheels);
    this.scene.add(this.carModel);
  }

  changeColor(color: string, premium: number = 0): void {
    this.selectedColor = color;
    if (this.carModel) {
      this.carModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (Array.isArray(child.material)) {
            child.material.forEach(m => {
              if (m instanceof THREE.MeshStandardMaterial) {
                m.color.setStyle(color);
                m.metalness = premium > 0 ? 0.9 : 0.5;
              }
            });
          } else if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.setStyle(color);
            child.material.metalness = premium > 0 ? 0.9 : 0.5;
          }
        }
      });
    }
    this.calculateTotal();
  }

  updateRentalDays(days: number): void {
    this.rentalDays = Math.max(1, Math.min(30, days));
    this.calculateTotal();
  }

  private calculateTotal(): void {
    const selectedColor = this.colorOptions.find(c => c.value === this.selectedColor);
    const colorPremium = selectedColor?.premium || 0;
    this.totalPrice = (this.dailyRate + colorPremium) * this.rentalDays;
  }

  toggleRotation(): void {
    this.isRotating = !this.isRotating;
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    if (this.carModel && this.isRotating) {
      this.carModel.rotation.y += 0.005;
    }
    
    this.renderer.render(this.scene, this.camera);
  }

  private addWindowResizeListener(): void {
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private cleanupThreeJS(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.scene) {
      this.scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          if (Array.isArray(object.material)) {
            object.material.forEach(m => m.dispose());
          } else {
            object.material.dispose();
          }
          object.geometry.dispose();
        }
      });
    }
  }

  bookNow(): void {
    console.log('Booking confirmed:', {
      car: this.carName,
      color: this.colorOptions.find(c => c.value === this.selectedColor)?.name,
      days: this.rentalDays,
      total: this.totalPrice
    });
    
    alert(`Booking confirmed for ${this.carName} for ${this.rentalDays} days. Total: $${this.totalPrice}`);
  }

}