import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CodigoI } from '../../models/codigo.interface';
import { UsuarioI } from '../../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class CargadorService {

  private qrCollection: AngularFirestoreCollection<CodigoI>;
  private codigos: Observable<CodigoI[]>;

  // private usuarioCollection: AngularFirestoreCollection<UsuarioI>;
  // private usuarios: Observable<UsuarioI[]>;

  constructor(db: AngularFirestore) {
    this.qrCollection = db.collection<any>('codigos');
    // this.codigos = this.qrCollection.snapshotChanges().pipe(
    //   map(actions => {
    //     return actions.map(a => {
    //       const id = a.payload.doc.id;
    //       const saldo = a.payload.doc.data();
    //       return { id, ...saldo };
    //     });
    //   })
    // );
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
}
