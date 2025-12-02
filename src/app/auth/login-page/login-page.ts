import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const USER = {
  email: 'usuario@ups.edu.ec',
  password: '123456'
};

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css'],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  errorMessage = signal('');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.errorMessage.set('');
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email === USER.email && password === USER.password) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage.set('Datos incorrectos');
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
