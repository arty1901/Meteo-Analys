import { Component, OnInit } from '@angular/core';
import { MeteoService } from '../meteo.service';
import { Chart } from '../../../node_modules/chart.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  chart = []; // Переменная будет содержать информацию для графика
  city = []; // Список городов
  selectedCity: number;
  selectedType: string;
  dateFrom = '';
  dateTo = '';
  parsedDateFrom: Date;
  parsedDateTo: Date;
  dataType = [
    {value: 'month', name: 'Месячные'},
    {value: 'day', name: 'Дневные'},
  ];
  month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  public options: Pickadate.DateOptions = {
    clear: 'Clear', // Clear button text
    close: 'Ok',    // Ok button text
    today: 'Today', // Today button text
    closeOnClear: true,
    closeOnSelect: true,
    format: 'dddd, dd mmm, yyyy', // Visible date format (defaulted to formatSubmit if provided otherwise 'd mmmm, yyyy')
    formatSubmit: 'yyyy-mm-dd',   // Return value format (used to set/get value)
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10,    // Creates a dropdown of 10 years to control year,
  };
  constructor(private meteoService: MeteoService) {}

  ngOnInit() {
    this.meteoService.getCity().subscribe(data => {
      this.city = data;
    }, error1 => {
      console.log(error1);
    });
  }

  // Получает данные в зависимости от типа выбранных данных и выводит график
  public getData() {
    this.parsedDateFrom = new Date(this.dateFrom);
    this.parsedDateTo = new Date(this.dateTo);
    console.log(this.parsedDateTo, this.parsedDateFrom);

    if (this.parsedDateFrom <= this.parsedDateTo) {
      if (this.selectedType === 'month') {
        // Если выбраны месячные данные
        this.meteoService.getMonthData().subscribe(next => {

            const monthData = []; // Список месячных данных
            const monthDate = []; // Список данных формата Date
            console.log(this.selectedCity);
            next.forEach(el => {

              if (Number(this.selectedCity) === Number(el.indexVMO)) {

                for (let i = 0; i < 12; ++i) {

                  let currentDate = new Date(el.year, i);
                  if ((this.parsedDateFrom.getFullYear() <= currentDate.getFullYear()) &&
                    (currentDate.getFullYear() <= this.parsedDateTo.getFullYear())) {

                    if ((this.parsedDateFrom.getMonth() <= currentDate.getMonth()) &&
                      (currentDate.getMonth() <= this.parsedDateTo.getMonth())) {

                      monthData.push(el[i]);
                      monthDate.push(`${this.month[currentDate.getMonth()]} ${currentDate.getFullYear()}`);
                    }
                  }
                }
              }
            });
            // Создание графика
            this.buildChart(monthData, monthDate);
          },
          error1 => {
            console.log(error1);
          });
      } else {

        // Если выбрны дневные данные
        this.meteoService.getDayliData().subscribe(data => {

          const dayliData = []; // Список месячных данных
          const dayliDate = []; // Список данных формата Date
          data.forEach(el => {
            if (el.indexVMO === this.selectedCity) {
              dayliData.push(el.maxTemp);
            }
          });

          // Создание графика
          this.buildChart(dayliData, dayliDate);

        }, error1 => {
          console.log(error1);
        });
      }
    } else {
      alert('Incorrect date period');
    }
  }

  public buildChart(data, labels) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
}
