import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    private  router:  Router,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  async login() {
    // const = { this.email, this.password } = this;
    try {
      const response = await this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password);
      console.log(response);
      if (response.user) {
        this.router.navigateByUrl('bienvenido');
      }

    } catch (err) {
        if (err.code == 'auth/user-not-found' ) {
            console.dir(err);
        }
    }
  }

}
