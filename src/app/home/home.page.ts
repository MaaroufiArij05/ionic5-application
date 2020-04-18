import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private connected = false
  constructor(private _storage: Storage) {}

  ngOnInit() {
    this._storage.get('ACCESS_TOKEN').then(token => {
      if(token && token.length > 0){
        this.connected =  true
      }
    })
   
  }

}
