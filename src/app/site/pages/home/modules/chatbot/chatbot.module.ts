import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatbotComponent, ChatbotModalComponent} from './components';
import {MatButtonModule} from '@angular/material/button';
import {SharedDirectivesModule} from 'src/app/site/modules';
import {FormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    SharedDirectivesModule,
    FormsModule,
    MatDialogModule
  ],
  declarations: [
    ChatbotComponent,
    ChatbotModalComponent,
  ],
  exports: [
    ChatbotComponent,
    ChatbotModalComponent
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ]
})
export class ChatbotModule {
}
