import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {  BarcodeScannerOptions,  BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { CargadorService } from '../services/cargador.service';


@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.page.html',
  styleUrls: ['./bienvenido.page.scss'],
})
export class BienvenidoPage implements OnInit {

  // items: Observable<any[]>;
  // constructor(db: AngularFirestore) {
  //   this.items = db.collection('santiago').valueChanges();
  // }
  //

  encodeData: any;
  scannedData: {};
  valorCodigo: any;
  barcodeScannerOptions: BarcodeScannerOptions;
  arrCodigos: any = [];
  saldoVisible: any;
  saldoCargado: any;
  constructor(
    private barcodeScanner: BarcodeScanner,
    public cs: CargadorService
  ) {
    // this.encodeData = "https://www.FreakyJolly.com";
    // Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };

  }

  ngOnInit() {
    this.cs.getQrs().subscribe(data => {
       data.forEach(obj => {
         this.arrCodigos[obj.qr.substr(5, 10)] = obj.saldo;

       });
     });
     setTimeout(() => { this.saldoVisible = this.cs.getSaldo(); } , 2000);
     this.saldoVisible = 0;
     this.saldoCargado = false;
  }

  scanCode() {
    this.saldoCargado = false;
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
          this.scannedData = barcodeData;

          if (this.arrCodigos[barcodeData['text'].substr(5,10)]) {
              // this.saldoVisible = ;
              let cargo = this.cs.agregarCarga(this.arrCodigos[barcodeData['text'].substr(5, 10)]);
              if(cargo) {
                this.saldoVisible = this.cs.getSaldo();
              } else {
                this.saldoCargado = true;
              }



          } else {
              this.saldoVisible = 0;
          }
        // this.valorCodigo = this.cargadorService.getSaldoFromQR(JSON.stringify(barcodeData));

      })
      .catch(err => {
        console.log("Error", err);
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
          console.log("Error occured : " + err);
        }
      );
  }
}
