import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import {FormTestComponent} from './form-test/form-test.component';
import {StatisticComponent} from './statistic/statistic.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'statisctic', component: StatisticComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
