import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { equalPasswordFieldsValidator } from '../../../../shared/custom-validators';
import { AuthService } from '../../../../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register.component',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  registrationForm!: FormGroup;
  authService = inject(AuthService);
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: [''],
      password: [''],
      confirmPassword: ['']
    },
    {validators: equalPasswordFieldsValidator})
  }

  submitRegistration() {
    if (!this.registrationForm.valid || this.registrationForm == null)
      return;

   this.authService.registerUser(this.registrationForm.value)
   .pipe(
    takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
        
      }
    })
  }
}
