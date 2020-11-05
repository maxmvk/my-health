import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterLinkWithHref} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {SignInComponent} from './sign-in.component';
import {NavigateState} from 'src/app/shared/utils';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [RouterTestingModule]
    });

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should be a link to register page', () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    let index = debugElements.findIndex(e => e.properties['href'] === NavigateState.auth.register);

    expect(index).toBeGreaterThan(-1);
  });

  it('should be a link to authentication page', () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    let index = debugElements.findIndex(e => e.properties['href'] === NavigateState.auth.authentication);

    expect(index).toBeGreaterThan(-1);
  });
});
