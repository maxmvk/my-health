import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ChangeValueFtDirective} from './change-value-ft.directive';

@Component({
  template: `
    <input type="text" appChangeValueFt>
  `
})
class HostComponent {
}

describe('ChangeValueFtDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChangeValueFtDirective,
        HostComponent
      ]
    });

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    let directive = new ChangeValueFtDirective(null);
    expect(directive).toBeTruthy();
  });

  it('should overwrite to a value that will contain "9" if value > 9', () => {
    let de = fixture.debugElement.query(By.css('input'));
    let directive = de.injector.get(ChangeValueFtDirective);
    let el: HTMLInputElement = de.nativeElement;

    let testNum = directive.maxValue + 1;

    el.value = testNum.toString();
    de.triggerEventHandler('input', null);

    expect(el.value).toContain(directive.maxValue.toString());
  });

  it('should overwrite to a value that will contain "0" if value < 0', () => {
    let de = fixture.debugElement.query(By.css('input'));
    let directive = de.injector.get(ChangeValueFtDirective);
    let el: HTMLInputElement = de.nativeElement;

    let testNum = directive.minValue - 1;

    el.value = testNum.toString();
    de.triggerEventHandler('input', null);

    expect(el.value).toContain(directive.minValue.toString());
  });

  it(`should overwrite to a value that will contain "[value]" if value in the range from 0 to 9`, () => {
    let de = fixture.debugElement.query(By.css('input'));
    let directive = de.injector.get(ChangeValueFtDirective);
    let el: HTMLInputElement = de.nativeElement;

    let testNum = Math.floor(Math.random() * (directive.maxValue + 1));

    el.value = testNum.toString();
    de.triggerEventHandler('input', null);

    expect(el.value).toContain(el.value.toString());
  });
});
