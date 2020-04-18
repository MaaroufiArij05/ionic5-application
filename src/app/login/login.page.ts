import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../api/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public toastController: ToastController, 
    private _authService: AuthService,
    private _storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    
    console.log("start")
    console.log(this.loginForm.value);
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    this._authService.login(email,password).subscribe(
      async data => {
          console.log(data)
          this._storage.set('ACCESS_TOKEN',data.access_token)
          this._storage.set('EXPIRES_AT',data.expires_at)
          const tos = await this.toastController.create({
            message: 'succefully connected....',
            duration: 5000,
            color: "success"
          })
          tos.present()
          this.router.navigate(['/home'])
      },
      async error => {
        console.log(error)
        let errorMsg = 'error while trying to connect'
        if(error.error.message){
          errorMsg = error.error.message
        }
        if(error.status == 401){
          errorMsg = 'Wrong email or passowrd'
        }
        
        const tos = await this.toastController.create({
          message: errorMsg,
          duration: 5000,
          color: "danger"
        })
        tos.present()
      }
    )
  }

}
