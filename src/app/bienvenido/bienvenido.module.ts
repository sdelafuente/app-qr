import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BienvenidoPage } from './bienvenido.page';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: BienvenidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BienvenidoPage]
})
export class BienvenidoPageModule {
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('post').valueChanges();
  }
}
