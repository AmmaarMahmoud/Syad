import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispalyImagePageRoutingModule } from './dispaly-image-routing.module';

import { DispalyImagePage } from './dispaly-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispalyImagePageRoutingModule
  ],
  declarations: [DispalyImagePage]
})
export class DispalyImagePageModule {}
