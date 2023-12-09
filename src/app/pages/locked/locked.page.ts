import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BiometricAuth, BiometryType, CheckBiometryResult } from '@aparajita/capacitor-biometric-auth'
// import 'capacitor-biometric-auth'
@Component({
  selector: 'app-locked',
  templateUrl: './locked.page.html',
  styleUrls: ['./locked.page.scss'],
})
export class LockedPage implements OnInit {
  biometryType?: BiometryType;
  isAvailable = false;
  constructor(  private modalCtr:ModalController) { }


 ngOnInit() {
   this.checkBioAvailable()
  }
 updateBiometryInfo(info: CheckBiometryResult): void {
  if (info.isAvailable) {
    // Biometry is available, info.biometryType will tell you the primary type.
  } else {
    // Biometry is not available, info.reason and info.code will tell you why.
  }
}
//   async openBiometricAuth(){
//     const authResult = await BiometricAuth['verify']({
//       reason:'your session timed out',
//       title:'your session timed out'
//     })
//     if(authResult.verified){
//       this.dissmisLockScreen()
//     }
//   }

  async unLock(){
    const modal = await this.modalCtr.getTop(); // الحصول على أعلى نموذج حاليًا
    if (modal) {
      await modal.dismiss();
    }
  }
  dissmisLockScreen(){
    this.modalCtr.dismiss({reset:false})
  }
checkBioAvailable() {
  return new Promise<boolean>(async (resolve) => {
    
    const { biometryType, isAvailable } = await BiometricAuth.checkBiometry();
    this.biometryType = biometryType;
    this.isAvailable = isAvailable;
    await BiometricAuth.addResumeListener((res) => {
      console.log('biometricRes resume', res);
      this.biometryType = res.biometryType;
      this.isAvailable = res.isAvailable;
    });
    if (biometryType && isAvailable) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}
async authenticate() {
  return new Promise<boolean>(async (resolve) => {
    if (this.biometryType && this.isAvailable) {
      await BiometricAuth.authenticate({
        iosFallbackTitle: 'faceId',
        androidTitle: 'fingerprint',
        cancelTitle: 'cancel',
        reason: 'pioreson',
        androidConfirmationRequired: false,
        allowDeviceCredential: false,
      })
        .then(() => {
          this.dissmisLockScreen()
          resolve(true);
        })
        .catch((err) => {
          console.log('biometricRes err', err);
          resolve(false);
        });
    }
  });
}
}
