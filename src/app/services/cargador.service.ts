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
    this.qrCollection = db.collection<CodigoI>('codigos');
    this.codigos = this.qrCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          const saldo = a.payload.doc.data();
          return { id, ...saldo };
        });
      })
    );
  }


  public getSaldoFromQR(hashFromQR : string){
    return this.qrCollection.doc<CodigoI>(hashFromQR).valueChanges();
  }

}
