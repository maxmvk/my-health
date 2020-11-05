import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AvatarModule, SharedPipesModule, WindowTabsModule} from 'src/app/site/modules';
import {MatBadgeModule} from '@angular/material/badge';
import {AgeFormattingPipe, HeightFormattingPipe, WeightFormattingPipe} from './pipes';
import {MatButtonModule} from '@angular/material/button';
import {
  AgeomeComponent,
  AvatarContainerComponent, ChartComponent,
  ConnectionsComponent,
  FeedComponent,
  HomeComponent,
  TooltipComponent,
  LpcConnectModalComponent
} from './components';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ChatbotModule} from './modules/chatbot/chatbot.module';
import {ChartsModule} from 'ng2-charts';
import {LoaderModule} from '../../../shared/modules/loader/loader.module';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WindowTabsModule,
    MatBadgeModule,
    SharedPipesModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    MatSlideToggleModule,
    ChatbotModule,
    AvatarModule,
    ChartsModule,
    LoaderModule
  ],
  declarations: [
    HomeComponent,
    FeedComponent,
    AvatarContainerComponent,
    WeightFormattingPipe,
    AgeFormattingPipe,
    HeightFormattingPipe,
    AgeomeComponent,
    ConnectionsComponent,
    TooltipComponent,
    ChartComponent,
    LpcConnectModalComponent
  ]
})
export class HomeModule {
}
