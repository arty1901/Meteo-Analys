import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Papa} from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  public remoteMaskURL = '/api/t/idd_amkf/*/tm/2018-04-10T16:31:00+07/2018-04-10T17:31:00+07?ids_group=1&sn=15409AMK-03';
  private options = {
    complete: result => {
      console.log(result);
    },
    newline: '',
    download: true,
    delimiter: ';'
  };

  constructor(private http: HttpClient,
              private papa: Papa) {}

  // @ts-ignore
  public getRemoteData() {
    // this.http.get(this.remoteMaskURL, {responseType: 'text'});
    this.papa.parse(this.remoteMaskURL, this.options);
  }
}
