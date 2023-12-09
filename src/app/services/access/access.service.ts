import { Injectable } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { LockedPage } from 'src/app/pages/locked/locked.page';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  logoutTimer = new BehaviorSubject(0)
  constructor(private platform : Platform , private modalCtr:ModalController) {
    this.platform.pause.subscribe(()=>{
      this.lockApp()
    })
  }
  resetLogoutTimer(){
    this.logoutTimer.next(3)
    this.descreaseTimer()
  }
  descreaseTimer(){
    setTimeout(()=>{
      if(this.logoutTimer.value==0){
        this.lockApp()
      }
      else{
        this.logoutTimer.next(this.logoutTimer.value-1)
        this.descreaseTimer()
      }
    }, 10)
  }
  async lockApp(){
    const modal = await this.modalCtr.create({
      component:LockedPage
    })
    await modal.present();
    modal.onDidDismiss().then(result=>{
      if(result.data && result.data.reset){
        this.resetLogoutTimer()
      }
    })
  }

}
