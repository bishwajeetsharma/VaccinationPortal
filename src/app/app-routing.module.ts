import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserRegisterFormComponent } from './body/user-register-form-component/user-register-form.component';
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'user-register', component: UserRegisterFormComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
