import { Component, OnInit } from '@angular/core';
import {importType} from '@angular/compiler/src/output/output_ast';
import {FormBuilder} from '@angular/forms';
import {MeteoService} from '../meteo.service';
import {Papa} from 'ngx-papaparse';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  plotly: any;
  url = '/api/tl/48/idd_amkf/*/tm/2018-04-10T16:31:00+07/2018-04-14T16:31:00+07?ids_group=1&sn=15409AMK-03';

  form = this.fb.group({
    method: [''],
    dateFrom: [''],
    dateTo: ['']
  });

  constructor(private fb: FormBuilder,
              private meteService: MeteoService,
              private papa: Papa) { }

  ngOnInit() {
  }

  public dataProcessing() {
    let tempArray = [];

    this.papa.parse(this.url, {
      download: true,
      newline: '',
      delimiter: ';',
      skipEmptyLines: true,
      // step: results => {
      //   tempArray.push(results.data[0][4]);
      // },
      complete: results => {

        console.log(results);
      }
    });
  }
}
