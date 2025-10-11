import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatInputModule,

    CommonModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private http: HttpClient) {}

  login() {
    this.auth.setCredentials(this.username, this.password);
    this.http
      .get('/api/base/students', {
        headers: { Authorization: this.auth.getAuthHeader() },
      })
      .subscribe({
        next: () => {
          this.auth.setAuthorized(true);
          this.error = '';
        },
        error: () => {
          this.auth.setAuthorized(false);
          this.error = 'Неверный логин или пароль';
        },
      });
  }
}
