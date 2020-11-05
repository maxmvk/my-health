import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {RouterOutlet, RouterLinkWithHref} from '@angular/router';
import {SiteComponent} from './site.component';
import {MyInformationService, AvatarService} from 'src/app/shared/services';
import {ApolloModule} from 'apollo-angular';
import {NotificationService} from 'src/app/shared/services';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {NavigateState} from 'src/app/shared/utils';
import {EMPTY} from 'rxjs';

class JwtHelperServiceStab {
  isTokenExpired(token?: string, offsetSeconds?: number) {
  }

  getTokenExpirationDate(token?: string) {
  }
}

class NotificationServiceStab {
  showMessage(message: string) {
  }
}

describe('SiteLayoutComponent', () => {
  const initialState = {
    SITE : {
        userData: {
            myInfo: null,
            healthLabInfo: null
        },
        avatarData: null
    }
  };

  let component: SiteComponent;
  let fixture: ComponentFixture<SiteComponent>;
  let myInfoService: MyInformationService;
  let avatarService: AvatarService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteComponent],
      imports: [
        RouterTestingModule,
        ApolloModule,
        HttpClientModule,
        MatDialogModule
      ],
      providers: [
        MyInformationService,
        AvatarService,
        provideMockStore({ initialState }),
        {provide: JwtHelperService, useClass: JwtHelperServiceStab},
        {provide: NotificationService, useClass: NotificationServiceStab}
      ]
    });

    fixture = TestBed.createComponent(SiteComponent);
    component = fixture.componentInstance;
    myInfoService = TestBed.inject(MyInformationService);
    avatarService = TestBed.inject(AvatarService);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  xit('should be defined', () => {
    expect(component).toBeDefined();
  });

  xit('should have router-outlet directive', () => {
    const de = fixture.debugElement.query(By.directive(RouterOutlet));

    expect(de).not.toBeNull();
  });

  xit('should be a link to home page', () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    let index = debugElements.findIndex(e => e.properties['href'] === NavigateState.site.home);

    expect(index).toBeGreaterThan(-1);
  });

  xit('should be a link to my information', () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    let index = debugElements.findIndex(e => e.properties['href'] === NavigateState.site.myInformation);

    expect(index).toBeGreaterThan(-1);
  });

  xit('should call "getInfo" after init component', () => {
    const spy = spyOn(myInfoService, 'getInfo').and.callFake(() => EMPTY);

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
