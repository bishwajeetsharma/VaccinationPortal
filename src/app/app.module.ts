import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { MatTabsModule } from '@angular/material/tabs';
import { DialogComponent } from './util_module/dialog/dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressSpinnerComponent } from './util_module/progress-spinner/progress-spinner.component';
import { UserRegisterFormComponent } from './body/user-register-form-component/user-register-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterDialogComponent } from './util_module/register-dialog/register-dialog.component';
import { AuthenticationServiceService } from './services/authentication-service.service';
import {UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { ChatboxComponent } from './chatbox/chatbox.component';
import {NgChatModule} from 'ng-chat';
import { DoctorRegisterComponent } from './body/doctor-register/doctor-register.component';
import { DoctorDashboardComponent } from './body/doctor-dashboard/doctor-dashboard.component';
import { DoctorPendingApprovalsComponent } from './body/doctor-dashboard/doctor-pending-approvals/doctor-pending-approvals.component';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DoctorApprovedComponent } from './body/doctor-dashboard/doctor-approved/doctor-approved.component';
import { DoctorRejectedComponent } from './body/doctor-dashboard/doctor-rejected/doctor-rejected.component';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PendingApprovalComponent } from './util_module/pending-approval/pending-approval.component';
import { DoctorApprovalComponent } from './body/doctor-dashboard/doctor-approval/doctor-approval.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard/admin-dashboard.component';
import { AdminVaccineUpdateComponent } from './admin-dashboard/admin-vaccine-update/admin-vaccine-update.component';
import { AdminVaccineDeleteComponent } from './admin-dashboard/admin-vaccine-delete/admin-vaccine-delete.component';

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
    UserDashboardComponent,
    ChatboxComponent,
    DoctorRegisterComponent,
    DoctorDashboardComponent,
    DoctorPendingApprovalsComponent,
    DoctorApprovedComponent,
    DoctorRejectedComponent,
    PendingApprovalComponent,
    DoctorApprovalComponent,
    AdminDashboardComponent,
    AdminVaccineUpdateComponent,
    AdminVaccineDeleteComponent
  ],
  entryComponents: [LoginComponent],
  imports: [
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      maxOpened: 3,
      autoDismiss: true,
      newestOnTop: true      
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    NgChatModule
  ],
  providers: [
    UtilService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationServiceService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
