import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThakYouPageRoutingModule } from './thak-you-page-routing.module';
import { ThakYouPageComponent } from './thak-you-page.component';


@NgModule({
  declarations: [
    ThakYouPageComponent
  ],
  imports: [
    CommonModule,
    ThakYouPageRoutingModule
  ]
})
export class ThakYouPageModule { }
