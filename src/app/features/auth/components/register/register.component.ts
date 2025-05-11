import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  onSubmit() {
    // TODO: Implementar lógica de registro
    console.log('Register attempt:', this.registerData);
  }

  registerWithGoogle() {
    // TODO: Implementar registro con Google
    console.log('Register with Google');
  }

  passwordsMatch(): boolean {
    return this.registerData.password === this.registerData.confirmPassword;
  }
} 