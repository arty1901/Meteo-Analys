import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  citiesList: AngularFireList<any>;
  citiesObserver: Observable<any[]>;
  dataLis: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.citiesList = db.list('meteodata-analys', ref => ref.limitToFirst(5));
    this.citiesObserver = this.citiesList.snapshotChanges().pipe(
      map(actions => actions.map(a => {
      }))
    );
  }

  ngOnInit() {
  }

}
