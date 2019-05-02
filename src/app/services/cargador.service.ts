import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CodigoI } from '../../models/codigo.interface';
import { UsuarioI } from '../../models/usuario.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CargadorService {

  private qrCollection: AngularFirestoreCollection<CodigoI>;
  private codigos: Observable<CodigoI[]>;

  private usuarioCollection: AngularFirestoreCollection<UsuarioI>;
  // private usuarios: Observable<UsuarioI[]>;
  private usuarioLogeado: UsuarioI;

  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) {

    this.qrCollection = db.collection<any>('codigos');
    this.usuarioCollection = db.collection<any>('usuarios');

    this.afAuth.authState.subscribe(user => {

      // this.usuarioCollection.add({cargas : [], email: user.email},user.id);

      // this.usuarioLogeado = db.doc<UsuarioI>('usuarios/${user.uid}');
      // this.userPromisee = this.usuarioLogeado.valueChanges();

      this.usuarioCollection.doc(user.uid).valueChanges().subscribe((data: UsuarioI) =>{
        console.log("cambio la data del usuario", data);
        this.usuarioLogeado = data;
        this.usuarioLogeado.id = user.uid;
      });
    });

    // this.usuarioCollection.valueChanges().subscribe(userData => {
    //   console.log("userrDataaaNuevaa", userData)
    // });


  }


  public getSaldoFromQR(hashFromQR: string) {
    return this.qrCollection.doc<any>(hashFromQR).valueChanges();
  }

  public getLista(hashFromQR: string) {
    return this.qrCollection.valueChanges();
  }

  public getQrs(): any {
      return this.qrCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as CodigoI;
            data.id = a.payload.doc.id;
            return data;
          })
        })
      );
    }

  public agregarCarga(monto) {
    if (this.usuarioLogeado.cargas.find(x => x === monto)) {
      return false;
    }
    this.usuarioLogeado.cargas.push(monto);
    // console.log('cargas: ', this.usuarioLogeado);
    // this.usuarioCollection.doc(this.usuarioLogeado.id).update({cargas: this.usuarioLogeado.cargas});
    this.usuarioCollection.doc(this.usuarioLogeado.id).set({cargas: this.usuarioLogeado.cargas});

    // this.db.doc('usuarios/${this.usuarioLogeado.id}').update({cargas : []});
    // this.usuarioLogeado.cargas.push(monto);

    // this.usuarioLogeado.update({});
    return true;
  }

  public getSaldo(): number {
    // return this.usuarioLogeado.reduce((partial_sum, a) => partial_sum + a);
    if ( this.usuarioLogeado.cargas[0] > 0) {
      return this.usuarioLogeado.cargas.reduce((partial_sum, a) => partial_sum + a);
    } else {
      return 0;
    }

  }

}
