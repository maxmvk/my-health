import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  Output, EventEmitter
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectorWindowInnerWidth} from 'src/app/shared/store/selectors';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-avatar-model',
  template: '<div #avatarModelContainer></div>'
})
export class AvatarModelComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('avatarModelContainer') avatarModelContainerRef: ElementRef;
  @Input('avatarModel') avatarModelProps: Blob;
  @Output('isRendering') isRenderingProps: EventEmitter<boolean> = new EventEmitter<boolean>();

  containerHeight: number;
  containerWidth: number;

  private renderer;
  private camera;

  private handleAnimFrame: number;
  private isDestroyed: boolean = false;
  private unsubscribe$ = new Subject();

  constructor(private store$: Store) {
  }

  ngOnInit(): void {
    this.setDimensions(window.innerWidth);
  }

  ngAfterViewInit(): void {
    this.initAvatar(this.avatarModelProps);
  }

  private initAvatar(avatarModel: Blob): void {
    const container = this.avatarModelContainerRef.nativeElement;
    const scene = new THREE.Scene();
    const fov = 35;
    const aspect = 3 / 5;
    const near = 0.1;
    const far = 1000;

    this.isRenderingProps.emit(true);

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 0, 2.4);

    const ambient = new THREE.AmbientLight(0x505050, 3);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 0.7);
    light.position.set(20, 10, 10);
    scene.add(light);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(this.containerWidth, this.containerHeight);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, -0.5, 0);

    const manager = new THREE.LoadingManager();
    const loader = new GLTFLoader(manager);

    this.renderer.outputEncoding = THREE.sRGBEncoding;
    loader.load(URL.createObjectURL(avatarModel), (gltf: GLTF) => {

      const animate = () => {
        this.handleAnimFrame = requestAnimationFrame(animate);
        controls.update();
        this.renderer.render(scene, this.camera);
      };

      if (!this.isDestroyed) {
        this.isRenderingProps.emit(false);
        container.appendChild(this.renderer.domElement);
        scene.add(gltf.scene);
        this.onAvatarResize();

        animate();
      }
    });
  }

  private setDimensions(width: number): void {
    const setValues = (height: number): void => {
      this.containerHeight = height;
      this.containerWidth = Math.round(this.containerHeight / 5 * 3);
    };

    switch (true) {
      // $lg+
      case width >= 992:
        setValues(540);
        break;
      // $lg
      case 992 > width && width >= 768:
        setValues(480);
        break;
      // $md
      case 768 > width && width >= 576:
        setValues(400);
        break;
      // $sm
      case 576 > width:
        setValues(333);
        break;
      // $lg+
      default:
        setValues(540);
    }
  }

  private onAvatarResize(): void {
    this.store$
      .pipe(
        select(selectorWindowInnerWidth),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((width: number) => {
        this.setDimensions(width);
        this.camera.aspect = this.containerWidth / this.containerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.containerWidth, this.containerHeight);
      });
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    this.isRenderingProps.emit(false);

    cancelAnimationFrame(this.handleAnimFrame);

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
