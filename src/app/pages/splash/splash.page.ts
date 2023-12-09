import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(
    private platform: Platform,
    private route :Router
  ) { }

  ngOnInit() {
    setTimeout(()=>{
      this.route.navigate(['login'])
    },3000)
  }

  initonializApp(){
    this.platform.ready().then(() => {
      this.route.navigate(['splash'])
    });
  }
}
