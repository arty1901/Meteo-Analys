import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { City } from './interfaces/city';
import { DayliData } from './interfaces/dayliData';
import { MonthData } from './interfaces/monthData';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  private url = '/assets/jsonFiles/cities.json';
  private urlDayliData = '/assets/jsonFiles/dayliData.json';
  private urlMonthData = '/assets/jsonFiles/monthData.json';
  constructor(private http: HttpClient) {}

  public getCity(): Observable<City[]> {
    return this.http.get<City[]>(this.url);
  }
  public getDayliData(): Observable<DayliData[]> {
    return this.http.get<DayliData[]>(this.urlDayliData);
  }
  public getMonthData(): Observable<MonthData[]> {
    return this.http.get<MonthData[]>(this.urlMonthData);
  }
}
