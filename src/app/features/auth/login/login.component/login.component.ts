import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login.component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  loginForm!: FormGroup;
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private routerService = inject(Router);

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginUsername: [''],
      loginPassword: ['']
    })
  }

  submitLoginForm() {
    const loginFormData = this.loginForm.value;

    if (loginFormData == null) return;

    const loginRequest: Auth = {
      username: loginFormData.loginUsername,
      password: loginFormData.loginPassword
    }

    this.authService.login(loginRequest)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.authService.setAccessToken(res.accessToken)
          this.routerService.navigateByUrl('/home')
        }
      })
  }
}
