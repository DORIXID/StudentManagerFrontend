import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private username = '';
  private password = '';
  private authorized = false;

  setCredentials(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.authorized = false;
  }

  setAuthorized(value: boolean) {
    this.authorized = value;
  }

  getAuthHeader(): string {
    if (!this.username || !this.password) return '';
    return 'Basic ' + btoa(`${this.username}:${this.password}`);
  }

  isLoggedIn(): boolean {
    return this.authorized;
  }

  getUsername() {
    return this.username;
  }
  getPassword() {
    return this.password;
  }
}
