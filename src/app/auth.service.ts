import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(form: any): Observable<any> {
    return new Observable;
  }

  login(form: any): Observable<any> {
    debugger;
    // return Observable.create((observer: Observable<any>) => {
    //      this.httpClient.get('https://restcountries.eu/rest/v2/all')
    //          .map(res => {
    //            // Do my service.ts logic.
    //            // ...
    //            // observer.next(res)
    //            // observer.complete()
    //        }, err => observer.error(err))
    //  })
     return this.httpClient.get( 'https://restcountries.eu/rest/v2/all' ).pipe()
  }

}
