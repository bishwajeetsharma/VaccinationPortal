import { DoctorDashboardComponent } from './body/doctor-dashboard/doctor-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserRegisterFormComponent } from './body/user-register-form-component/user-register-form.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthenticationGuard } from './authentication.guard';
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'user-register', component: UserRegisterFormComponent },
  {
    path: 'userDashboard',
    component: UserDashboardComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'doctorDashboard',
    component: DoctorDashboardComponent,
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
    children: [],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
