import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component/register.component';
import { LoginComponent } from './features/auth/login/login.component/login.component';
import { HomeComponent } from './shared/components/home/home.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent }
];
