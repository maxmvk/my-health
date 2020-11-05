// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {HomeComponent} from './home.component';
// import {Router} from '@angular/router';
// import {ApolloModule} from 'apollo-angular';
// import {MyInformationService} from '../../services';
// import {NotificationService} from '../../../shared/services';
// import {MatDialogModule, MatDialog} from '@angular/material/dialog';
// import {JwtHelperService} from '@auth0/angular-jwt';
// import {AgeFormattingPipe, HeightFormattingPipe, TextTruncatePipe, WeightFormattingPipe} from '../../pipes';
// import {MockStore, provideMockStore} from '@ngrx/store/testing';
// import {NO_ERRORS_SCHEMA} from '@angular/core';
// import { NavigateState } from 'src/app/shared/utils';
//
//
// class JwtHelperServiceStab {
//   isTokenExpired(token?: string, offsetSeconds?: number) {
//   }
//
//   getTokenExpirationDate(token?: string) {
//   }
// }
//
// class RouterStab {
//   navigate(path: string[]) {
//   }
// }
//
// class NotificationServiceStab {
//   showMessage(message: string) {
//   }
// }
//
// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;
//   let myInfoService: MyInformationService;
//   let store$: MockStore;
//
//   const initialState = {
//     SITE: {
//       userData: {
//         myInfo: null,
//         healthLabInfo: null
//       }
//     }
//   };
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         HomeComponent,
//         AgeFormattingPipe,
//         WeightFormattingPipe,
//         HeightFormattingPipe,
//         TextTruncatePipe
//       ],
//       imports: [
//         ApolloModule,
//         MatDialogModule
//       ],
//       providers: [
//         MyInformationService,
//         provideMockStore({initialState}),
//         {provide: Router, useClass: RouterStab},
//         {provide: JwtHelperService, useClass: JwtHelperServiceStab},
//         {provide: NotificationService, useClass: NotificationServiceStab}
//       ],
//       schemas: [NO_ERRORS_SCHEMA]
//     });
//
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     myInfoService = TestBed.inject(MyInformationService);
//     store$ = TestBed.inject(MockStore);
//     fixture.detectChanges();
//   });
//
//   xit('should be defined', () => {
//     expect(component).toBeDefined();
//   });
//
//   xit('should navigate to my information if user click "Edit avatar" button', () => {
//     const router = TestBed.inject(Router);
//     const spy = spyOn(router, 'navigate');
//
//     const button = fixture.debugElement.nativeElement.querySelector('.edit-avatar button');
//     button.click();
//
//     expect(spy).toHaveBeenCalledWith([NavigateState.site.myInformation]
//     );
//   });
//
//   xit('should open chatbot-modal window if user click chat button', () => {
//     const dialog = TestBed.inject(MatDialog);
//     const spy = spyOn(dialog, 'open');
//
//     const button = fixture.debugElement.nativeElement.querySelector('.btn-chat');
//     button.click();
//
//     expect(spy).toHaveBeenCalled();
//   });
//
//   xit('should open lpc pop-up window if user click on LPC data "Connect" button', () => {
//     const dialog = TestBed.inject(MatDialog);
//     const spy = spyOn(dialog, 'open');
//
//     const button = fixture.debugElement.nativeElement.querySelector('.lpc-data button');
//     button.click();
//
//     expect(spy).toHaveBeenCalled();
//   });
// });
