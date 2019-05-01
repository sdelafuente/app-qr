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
  constructor(private barcodeScanner: BarcodeScanner, public cs: CargadorService) {
    // this.encodeData = "https://www.FreakyJolly.com";
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
    this.saldoVisible = 0;
  }

  ngOnInit() {
    this.cs.getQrs().subscribe(data => {
       data.forEach(obj => {
         this.arrCodigos[obj.qr.substr(5,10)] = obj.saldo;

       });
     });
       console.log(this.arrCodigos);
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
          this.scannedData = barcodeData;

          if (this.arrCodigos[barcodeData['text'].substr(5,10)]) {
              this.saldoVisible = this.arrCodigos[barcodeData['text'].substr(5,10)];
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
