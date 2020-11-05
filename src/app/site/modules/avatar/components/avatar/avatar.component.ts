import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ModelState, selectorAvatarModel, selectorAvatarState} from 'src/app/site/store';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @ViewChild('container') containerRef: ElementRef;

  avatarState$: Observable<ModelState>;
  avatarModel$: Observable<Blob>;

  isRendering: boolean = false;

  constructor(
    private store$: Store,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.avatarState$ = this.store$.pipe(select(selectorAvatarState));
    this.avatarModel$ = this.store$.pipe(select(selectorAvatarModel));
  }

  setIsRendering(isRendering: boolean) {
    this.isRendering = isRendering;

    // solution of problem with expression that has changed after it was checked
    this.changeDetectorRef.detectChanges();
  }
}
