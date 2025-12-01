import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  private readonly USER = {
    email: 'usuario@ups.edu.ec',
    password: '123456'
  };

  myForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.myForm.value;

    if (
      email === this.USER.email &&
      password === this.USER.password
    ) {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas');
    }
  }

  isValidField(field: string) {
    const control = this.myForm.get(field);
    return control && control.invalid && control.touched;
  }

  getFieldError(field: string): string | null {
    const control = this.myForm.get(field);
    if (!control || !control.errors) return null;

    if (control.errors['required']) return 'Este campo es obligatorio';
    if (control.errors['email']) return 'Formato de correo inválido';
    if (control.errors['minlength']) {
      const required = control.errors['minlength'].requiredLength;
      return `Mínimo ${required} caracteres`;
    }

    return null;
  }
}
