import { Injectable } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { DispalyImagePage } from 'src/app/pages/dispaly-image/dispaly-image.page';

@Injectable({
  providedIn: 'root'
})
export class ShowImageService {

  constructor(private platform : Platform ,  private modalCtr:ModalController) { }

//  async showModel(image:any){
//   const model = await this.modalCtr.create({
//     component:DispalyImagePage,
//     componentProps:{
//       image:image
//     }
//   })
//    await model.present()
//   }
  
}
