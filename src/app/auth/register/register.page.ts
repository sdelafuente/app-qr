import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  email: string;
  password: string;
  cpassword: string;

  constructor(
    private  router:  Router,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  async register() {
    const {email, password, cpassword} = this;

    if ( password !== cpassword) {
      console.log('error');
    }
// cynteran@gmail.com
    try {
        const response = await this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
        if (response.user) {
          this.router.navigateByUrl('login');
        }
    } catch (err) {
        if (err.code === 'auth/user-not-found' ) {
            console.dir(err);
        }
    }
  }
}
