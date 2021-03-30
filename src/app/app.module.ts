import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
import { UserRegisterFormComponent } from './body/user-register-form-component/user-register-form.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegisterDialogComponent } from './util_module/register-dialog/register-dialog.component';
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
    UserRegisterFormComponent,
    RegisterDialogComponent,
  ],
  entryComponents: [LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    MatCardModule,
    MatDialogModule,    
    MatTabsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,FormsModule
  ],
  providers: [UtilService],
  bootstrap: [AppComponent],
})
export class AppModule {}
