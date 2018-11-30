import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ngx-Materialize
import {
  MzInputModule,
  MzValidationModule,
  MzBadgeModule,
  MzButtonModule,
  MzCardModule,
  MzCheckboxModule,
  MzChipModule,
  MzCollapsibleModule,
  MzCollectionModule,
  MzDatepickerModule,
  MzDropdownModule,
  MzFeatureDiscoveryModule,
  MzIconModule,
  MzModalModule,
  MzNavbarModule,
  MzPaginationModule,
  MzParallaxModule,
  MzProgressModule,
  MzRadioButtonModule,
  MzSelectModule,
  MzSidenavModule,
  MzSpinnerModule,
  MzSwitchModule,
  MzTabModule,
  MzTextareaModule,
  MzTimepickerModule,
  MzToastModule,
  MzTooltipModule,
  MzIconMdiModule
} from 'ngx-materialize';

// Angular material
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {
//   MatAutocompleteModule,
//   MatBadgeModule,
//   MatBottomSheetModule,
//   MatButtonModule,
//   MatButtonToggleModule,
//   MatCardModule,
//   MatCheckboxModule,
//   MatChipsModule,
//   MatDatepickerModule,
//   MatDialogModule,
//   MatDividerModule,
//   MatExpansionModule,
//   MatGridListModule,
//   MatIconModule,
//   MatInputModule,
//   MatListModule,
//   MatMenuModule,
//   MatNativeDateModule,
//   MatPaginatorModule,
//   MatProgressBarModule,
//   MatProgressSpinnerModule,
//   MatRadioModule,
//   MatRippleModule,
//   MatSelectModule,
//   MatSidenavModule,
//   MatSliderModule,
//   MatSlideToggleModule,
//   MatSnackBarModule,
//   MatSortModule,
//   MatStepperModule,
//   MatTableModule,
//   MatTabsModule,
//   MatToolbarModule,
//   MatTooltipModule,
//   MatTreeModule,
// } from '@angular/material';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainPageComponent,
    MainComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MzIconMdiModule,
    MzInputModule,
    MzValidationModule,
    MzBadgeModule,
    MzButtonModule,
    MzCardModule,
    MzCheckboxModule,
    MzChipModule,
    MzCollapsibleModule,
    MzCollectionModule,
    MzDatepickerModule,
    MzDropdownModule,
    MzFeatureDiscoveryModule,
    MzIconModule,
    MzModalModule,
    MzNavbarModule,
    MzPaginationModule,
    MzParallaxModule,
    MzProgressModule,
    MzRadioButtonModule,
    MzSelectModule,
    MzSidenavModule,
    MzSpinnerModule,
    MzSwitchModule,
    MzTabModule,
    MzTextareaModule,
    MzTimepickerModule,
    MzToastModule,
    MzTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
