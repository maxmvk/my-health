// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {ApolloModule} from 'apollo-angular';
// import {MyInformationComponent} from './my-information.component';
// import {ReactiveFormsModule} from '@angular/forms';
// import {Router} from '@angular/router';
// import {JwtHelperService} from '@auth0/angular-jwt';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatNativeDateModule} from '@angular/material/core';
// import {NotificationService} from 'src/app/shared/services';
// import * as faker from 'faker';
// import {MyInformationService, AvatarService} from '../../services';
// import {HttpClientModule} from '@angular/common/http';
// import {provideMockStore, MockStore} from '@ngrx/store/testing';
// import {TextTruncatePipe} from '../../pipes';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatSelectModule} from '@angular/material/select';
// import {NoopAnimationsModule} from '@angular/platform-browser/animations';
// import {of} from 'rxjs';
// import {MyInfoInterface} from 'src/app/shared/models';
// import * as moment from 'moment';
// import {getFullPhoneNumber, NavigateState} from 'src/app/shared/utils';
// import {appFormParams} from 'src/app/shared/form.config';
// import {FetchResult} from 'apollo-link';
// import {By} from '@angular/platform-browser';
//
// class RouterStab {
//     navigate(path: string[]) {
//     }
// }
//
// class JwtHelperServiceStab {
//     isTokenExpired(token?: string, offsetSeconds?: number) {
//     }
//
//     getTokenExpirationDate(token?: string) {
//     }
// }
//
// class NotificationServiceStab {
//     showMessage(message: string) {
//     }
// }
//
// describe('MyInformationComponent', () => {
//     const minPhone = 1e10;
//     const maxPhone = 1e11 - 1;
//     const maxFt = 9;
//     const maxIn = 11;
//     const maxLbs = 999;
//     const initialState = {
//         SITE : {
//             userData: {
//                 myInfo: null,
//                 healthLabInfo: null
//             },
//             avatarData: null
//         }
//     };
//
//     let component: MyInformationComponent;
//     let fixture: ComponentFixture<MyInformationComponent>;
//     let myInfoService: MyInformationService;
//     let avatarService: AvatarService;
//     let store: MockStore;
//     let email: string;
//     let firstName: string;
//     let lastName: string;
//     let phoneNumber: number;
//     let date: string;
//     let gender: string;
//     let heightFt: number;
//     let heightIn: number;
//     let weight: number;
//     let silhouetteId: string;
//
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//           declarations: [MyInformationComponent, TextTruncatePipe],
//           imports: [
//             ApolloModule,
//             ReactiveFormsModule,
//             MatDatepickerModule,
//             MatNativeDateModule,
//             MatFormFieldModule,
//             MatSelectModule,
//             HttpClientModule,
//             NoopAnimationsModule
//           ],
//           providers: [
//             MyInformationService,
//             AvatarService,
//             provideMockStore({ initialState }),
//             {provide: Router, useClass: RouterStab},
//             {provide: JwtHelperService, useClass: JwtHelperServiceStab},
//             {provide: NotificationService, useClass: NotificationServiceStab}
//           ]
//         });
//
//         fixture = TestBed.createComponent(MyInformationComponent);
//         component = fixture.componentInstance;
//         myInfoService = TestBed.inject(MyInformationService);
//         avatarService = TestBed.inject(AvatarService);
//         store = TestBed.inject(MockStore);
//         email = faker.internet.email();
//         firstName = faker.name.firstName();
//         lastName = faker.name.lastName();
//         fixture.detectChanges();
//         phoneNumber = Math.floor(minPhone + Math.random() * (maxPhone + 1 - minPhone));
//         date = new Date(Date.now()).toString();
//         gender = appFormParams.GENDERS[Math.floor(Math.random() * appFormParams.GENDERS.length)];
//         heightFt = Math.floor(Math.random() * (maxFt + 1));
//         heightIn = Math.floor(Math.random() * (maxIn + 1));
//         weight = Math.floor(Math.random() * (maxLbs + 1));
//         silhouetteId = null;
//     });
//
//     xit('should be defined', () => {
//         expect(component).toBeDefined();
//     });
//
//     xit('should firstName be valid if set in input firstName', () => {
//         const control = component.form.get('firstName');
//
//         control.setValue(firstName);
//
//         expect(control.valid).toBeTruthy();
//     });
//
//     xit('should lastName be valid if set in input lastName', () => {
//         const control = component.form.get('lastName');
//
//         control.setValue(lastName);
//
//         expect(control.valid).toBeTruthy();
//     });
//
//     xit('should date be valid if set in input birthDate', () => {
//         component.ngOnInit();
//         const control = component.form.get('dateOfBirth');
//
//         control.setValue(date);
//
//         expect(control.valid).toBeTruthy();
//     });
//
//     xit('should phone be valid if set in input phone', () => {
//         const control = component.form.get('phoneNumber');
//
//         control.setValue(phoneNumber);
//
//         expect(control.valid).toBeTruthy();
//     });
//
//     xit('should email be valid if set in input email', () => {
//         const control = component.form.get('email');
//
//         control.setValue(email);
//
//         expect(control.valid).toBeTruthy();
//     });
//
//     xit('should be a disabled button "Save" after init component', () => {
//         const btn = fixture.debugElement.query(By.css('.button-save'));
//         const el: HTMLElement = btn.nativeElement;
//
//         component.ngOnInit();
//         expect(el.attributes.getNamedItem('disabled')).toBeTruthy();
//     });
//
//     xit('should call "updateInfo" with data on form submitting', () => {
//         component.ngOnInit();
//         const spy = spyOn(myInfoService, 'updateInfo');
//
//         spyOn(component, 'processUserAvatar').and.callFake(() => {
//             return of(null);
//         });
//
//         component.form.setValue({
//           dateOfBirth: date + '',
//           email,
//           firstName,
//           lastName,
//           phoneNumber,
//           gender,
//           heightFt,
//           heightIn,
//           weight
//         });
//
//         const height = (heightFt * 12 + +heightIn);
//
//         const haveToBeCalledData: MyInfoInterface = {
//           dateOfBirth: moment(date).toDate().toISOString(),
//           email,
//           firstName,
//           lastName,
//           phoneNumber: getFullPhoneNumber(appFormParams.DEFAULT_PHONE_PREFIX, phoneNumber + ''),
//           gender,
//           silhouetteId: undefined,
//           height: height || undefined,
//           weight: weight || undefined
//         };
//
//         component.onSubmit();
//         expect(spy).toHaveBeenCalledWith(haveToBeCalledData);
//     });
//
//     xit('should navigate to home page with state if user submitted data successfully', () => {
//         const router = TestBed.inject(Router);
//         const spy = spyOn(router, 'navigate');
//
//         component.ngOnInit();
//
//         spyOn(component, 'processUserAvatar').and.callFake(() => {
//             return of(null);
//         });
//
//         spyOn(myInfoService, 'updateInfo').and.callFake(() => {
//           const res: FetchResult<{myInfo: MyInfoInterface}> = {
//             data: {
//               myInfo: {
//                 firstName: '',
//                 lastName: '',
//                 phoneNumber: '',
//                 email: '',
//                 dateOfBirth: '',
//                 gender: '',
//                 silhouetteId: '',
//                 height: undefined,
//                 weight: undefined
//               }
//             }
//           };
//
//           return of(res);
//         });
//
//         component.form.setValue({
//             dateOfBirth: date + '',
//             email,
//             firstName,
//             lastName,
//             phoneNumber,
//             gender,
//             heightFt,
//             heightIn,
//             weight
//         });
//
//         component.onSubmit();
//         expect(spy).toHaveBeenCalledWith([NavigateState.site.home]
//         );
//     });
// });
