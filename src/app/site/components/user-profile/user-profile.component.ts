import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectorMyInfo} from 'src/app/site/store';
import {Observable} from 'rxjs';
import {MyInfoInterface} from 'src/app/shared/models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  @Input('color') colorProps: 'white' | 'black' = 'black';
  @ViewChild('userFullName') userFullNameRef: ElementRef;
  colors: {[key: string]: string} = {
    black: '#333',
    white: '#fff'
  };

  myInfo$: Observable<MyInfoInterface>;

  constructor(
    private store$: Store,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.myInfo$ = this.store$.pipe(select(selectorMyInfo));
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.userFullNameRef.nativeElement, 'color', this.colors[this.colorProps]);
  }
}
