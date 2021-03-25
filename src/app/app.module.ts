import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { MatCardModule } from '@angular/material/card';
import { UtilService } from './services/util.service';
import { LoginComponent } from './body/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { DialogComponent } from './util_module/dialog/dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProgressSpinnerComponent } from './util_module/progress-spinner/progress-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    DropdownDirective,
    LoginComponent,
    DialogComponent,
    ProgressSpinnerComponent,
  ],
  entryComponents: [LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatDialogModule,    
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  providers: [UtilService],
  bootstrap: [AppComponent],
})
export class AppModule {}
