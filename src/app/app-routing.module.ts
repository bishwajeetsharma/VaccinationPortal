import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserRegisterFormComponent } from './body/user-register-form-component/user-register-form.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'user-register', component: UserRegisterFormComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
