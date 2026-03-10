import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component/register.component';
import { LoginComponent } from './features/auth/login/login.component/login.component';

export const routes: Routes = [
    { path: '', component: RegisterComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
];
