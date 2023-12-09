import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispalyImagePage } from './dispaly-image.page';

const routes: Routes = [
  {
    path: '',
    component: DispalyImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispalyImagePageRoutingModule {}
