import { Injectable } from '@angular/core';

const USER = "user";
const TOKEN = "token";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: { jwt: string; userRoles?: string; userid?: string }): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
    console.log('User saved:', user);
  }

  static getUser(): any {
    const userData = window.localStorage.getItem(USER);
    console.log('Retrieved user data:', userData);
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        return null;
      }
    }
    return null;
  }

  static getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  static getUserRoles(): string {
    const user = this.getUser();
    console.log('User retrieved:', user);
    return user && user.userRole ? user.userRole : ''; 
  }

  static getUserId(): number | null {
    const user = this.getUser();
    console.log('User retrieved:', user);
    return user && user.userid ? user.userid : null;
  }

  static isAdminLogin(): boolean {
    const token = this.getToken();
    console.log('Token retrieved Check:', token);
    const userRole = this.getUserRoles();
    return token != null && userRole != null && userRole === "ADMIN";
  }
  
  static isCustomerLogin(): boolean {
    const token = this.getToken();
    const userRole = this.getUserRoles();
    return token != null && userRole != null && userRole === "CUSTOMER";
  }

  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}

