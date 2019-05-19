import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';

import { Observable } from 'rxjs';
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { CargadorService } from '../services/cargador.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.page.html',
  styleUrls: ['./bienvenido.page.scss'],
})
export class BienvenidoPage implements OnInit {

  encodeData: any;
  scannedData: {};
  valorCodigo: any;
  barcodeScannerOptions: BarcodeScannerOptions;
  arrCodigos: any = [];
  saldoVisible: any;
  saldoCargado: any;
  // salirDeEscanear: any;

  constructor(
    private platform: Platform,
    private barcodeScanner: BarcodeScanner,
    public cs: CargadorService,
    public afAuth: AngularFireAuth

  ) {
    // Options
    this.barcodeScannerOptions = {
      showTorchButton: false,
      showFlipCameraButton: true
    };
  }

  ngOnInit() {
    this.cs.getQrs().subscribe(data => {
      data.forEach(obj => {
        this.arrCodigos[obj.qr.substr(5, 10)] = obj.saldo;
      });
    });
    setTimeout(() => { this.saldoVisible = this.cs.getSaldo(); }, 3000);
    this.saldoVisible = 0;
    this.saldoCargado = false;
    // this.backButtonEvent();
    // this.salirDeEscanear = false;

  }


  scanCode() {
    this.saldoCargado = false;
    this.barcodeScanner
      .scan()
      .then(barcodeData => {

        if (barcodeData.cancelled !== true) {
          this.scannedData = barcodeData;

          if (this.arrCodigos[barcodeData['text'].substr(5, 10)]) {

            let cargo = this.cs.agregarCarga(this.arrCodigos[barcodeData['text'].substr(5, 10)]);
            if (cargo) {
              this.saldoVisible = this.cs.getSaldo();
            } else {
              this.saldoCargado = true;
            }

          } else {
            this.saldoVisible = 0;
          }
        } else {
          console.log('Barcode Canelado');
        }

      })
      .catch(err => {
        console.log(err);
      });
  }

  encodedText() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
      .then(
        encodedData => {
          console.log(encodedData);
          this.encodeData = encodedData;
        },
        err => {
          console.log(err);
        }
      );
  }

  // backButtonEvent() {
  //   this.platform.backButton.subscribe(() => {
  //     try {
  //       alert('Voy a hacer logout');
  //       this.afAuth.auth.signOut();
  //       // signed out
  //     } catch (e) {
  //      // an error
  //     }
  //   });
  // }
}
