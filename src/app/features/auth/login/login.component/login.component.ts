import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login.component',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  loginForm!: FormGroup;

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        username: [''],
        password: ['']
      })
  }

  submitLoginForm() {
    
  }
}
