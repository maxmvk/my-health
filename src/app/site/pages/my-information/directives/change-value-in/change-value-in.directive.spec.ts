import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {ChangeValueInDirective} from './change-value-in.directive';

@Component({
  template: `
    <input type="text" appChangeValueIn>
  `
})
class HostComponent {
}

describe('ChangeValueInDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChangeValueInDirective,
        HostComponent
      ]
    });

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    let directive = new ChangeValueInDirective(null);
    expect(directive).toBeTruthy();
  });

  it('should overwrite a value that will contain "11" if it > 11', () => {
    let de = fixture.debugElement.query(By.css('input'));
    let directive = de.injector.get(ChangeValueInDirective);
    let el: HTMLInputElement = de.nativeElement;

    let testNum = directive.maxValue + 1;

    el.value = testNum.toString();
    de.triggerEventHandler('input', null);

    expect(el.value).toContain(directive.maxValue.toString());
  });

  it('should overwrite a value that will contain "0" if it < 0', () => {
    let de = fixture.debugElement.query(By.css('input'));
    let directive = de.injector.get(ChangeValueInDirective);
    let el: HTMLInputElement = de.nativeElement;

    let testNum = directive.minValue - 1;

    el.value = testNum.toString();
    de.triggerEventHandler('input', null);

    expect(el.value).toContain(directive.minValue.toString());
  });

  it('should overwrite a value that will contain "[value]" if it in the range from 0 to 11', () => {
    let de = fixture.debugElement.query(By.css('input'));
    let directive = de.injector.get(ChangeValueInDirective);
    let el: HTMLInputElement = de.nativeElement;

    let testNum = Math.floor(Math.random() * (directive.maxValue + 1));

    el.value = testNum.toString();
    de.triggerEventHandler('input', null);

    expect(el.value).toContain(el.value.toString());
  });
});
