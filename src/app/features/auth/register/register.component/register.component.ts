import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { equalPasswordFieldsValidator } from '../../../../shared/custom-validators';

@Component({
  selector: 'app-register.component',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  registrationForm!: FormGroup;

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: [''],
      password: [''],
      confirmPassword: ['']
    },
    {validators: equalPasswordFieldsValidator})
  }
}
