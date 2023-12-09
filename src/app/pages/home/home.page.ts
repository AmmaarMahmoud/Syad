import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { AccessService } from 'src/app/services/access/access.service';
import { DispalyImagePage } from '../dispaly-image/dispaly-image.page';


const IMAGE_DIR = 'stored-images'
interface LocalFile {
  name:string,
  path:string,
  data:string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  images:LocalFile[]=[]
  LogoutTimer= this.access.logoutTimer.asObservable()
  constructor(
      private platform : Platform, 
      private loadctr :LoadingController,
      private NavCtr: NavController, 
      private ToastCtr:ToastController,
      private access : AccessService,
      private ModelCtr : ModalController
    ) {}

    ngOnInit() {
      this.loadFiles()
    }

async loadFiles(){
this.images=[]
const loading =await this.loadctr.create({
  message:'loading data ....'
})
await loading.present()

Filesystem.readdir({
  directory:Directory.Data,
  path: IMAGE_DIR
}).then(result=>{
  this.loadFileData(result.files)
}, async err => {
  console.log('err' + err);
  await Filesystem.mkdir({
    directory:Directory.Data,
    path: IMAGE_DIR
  });
}).then(_ => {
  loading.dismiss()
})
}

async loadFileData(FileNmaes:any[]){
  for(let f of FileNmaes){
    const filepath = `${IMAGE_DIR}/${f.name}`
    const readFile = await Filesystem.readFile({
      directory:Directory.Data,
      path:filepath
    });
    this.images.push({
      name:f.name,
      path:filepath,
      data:`data:image/jpeg;base64,${readFile.data}`
    })
  }
}  

async OpenCamera(){
const image = await Camera.getPhoto({
  quality: 90,
  allowEditing: false,
  resultType: CameraResultType.Uri,
  source:CameraSource.Camera
});

  if(image){
  this.saveImage(image)
  }
}

async OpenGallary(){
const image = await Camera.getPhoto({
  quality: 90,
  allowEditing: false,
  resultType: CameraResultType.Uri,
  source:CameraSource.Photos
});

  if(image){
    this.saveImage(image)
  }

}


async saveImage(photo:Photo){
const base46Data= await this.readAsBase64(photo)
const filename = new Date().getTime() + '.jpeg';
const savedFile = await Filesystem.writeFile({
directory: Directory.Data,
path: `${IMAGE_DIR}/${filename}`,
data: base46Data
})
console.log('save' + savedFile);
this.loadFiles()
}

async readAsBase64(photo: Photo ) {

if(this.platform.is('hybrid')){
  const file = await Filesystem.readFile({
  path:photo.path!
});
return file.data
}
else{
const response = await fetch(photo.webPath!)
const blob = await response.blob()
return await this.convarteblobToBase6(blob) as string
}
}

convarteblobToBase6 = (blob:Blob) => new Promise((resolve,reject) =>{
const reader = new FileReader;
reader.onerror= ()=>{
  reject('is Error')
};
reader.onload=()=>{
resolve(reader.result)
}
reader.readAsDataURL(blob)
})


async deleteUpload(file:any){
  try{

    const F = await Filesystem.deleteFile({
       directory:Directory.Data,
       path:file.path
     }) 
     
    this.loadFiles()
    await this.Toast()
  }
  catch(error){

  }

}

async Toast(){
  const toast= await this.ToastCtr.create({
    message:'The item was deleted successfully...',
    color:'success',
    position: 'top'
  })
  await toast.present()

  setTimeout(()=>{
    toast.dismiss()
  },3000)
}

logout(){
  localStorage.removeItem('token')
  this.NavCtr.navigateForward('/login')
}


ionViewDidEnter(){
  this.access.resetLogoutTimer()
}

async showModel(image:any,path:any){
  console.log(image);
  console.log(path);
  
    const model = await this.ModelCtr.create({
      component:DispalyImagePage,
      componentProps: {
        image:image,
        path:path,
      },
    })
    await model.present()
  }
}