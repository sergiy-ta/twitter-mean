import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './page/login/login.component';
import { IndexComponent } from './page/index/index.component';
import { UserCreateComponent } from './page/user-create/user-create.component';
import { MainComponent } from './page/main/main.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'user/create', component: UserCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', canActivate: [AuthGuard], component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
