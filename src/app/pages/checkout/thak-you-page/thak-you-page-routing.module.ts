import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThakYouPageComponent } from './thak-you-page.component';

const routes: Routes = [{ path: '', component: ThakYouPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThakYouPageRoutingModule { }
