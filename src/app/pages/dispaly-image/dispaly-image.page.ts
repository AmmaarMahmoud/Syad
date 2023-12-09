import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Share } from '@capacitor/share';
@Component({
  selector: 'app-dispaly-image',
  templateUrl: './dispaly-image.page.html',
  styleUrls: ['./dispaly-image.page.scss'],
})
export class DispalyImagePage implements OnInit {
  @Input() image: any;
  @Input() path: any;
  scale:any=1.0
  constructor(
    private ModelCtr : ModalController,
    private NavCtr: NavController, 
    ) { }

  ngOnInit() {
    console.log(Image);
  }

  async hideModel(){
    await this.ModelCtr.dismiss({reset:false})
    this.NavCtr.navigateForward('/home')
  }

  ZoomIn(){
    this.scale += 0.2
  }
  ZoomOut(){
    this.scale -= 0.2
  }

  
  async Share(){
    await Share.share({
      title: 'image',
      text: 'share image to social media',
      url: `http://${this.path}`
    });
  }

}
