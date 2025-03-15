import { Injectable } from '@angular/core';

const USER = "user";
const TOKEN = "token";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Save token to localStorage
  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  // Save user to localStorage
  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  // Get user from localStorage
  static getUser(): any {
    const userData = window.localStorage.getItem(USER);
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

  // Get token from localStorage
  static getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  // Get user role from localStorage
  static getUserRole(): string {
    const user = this.getUser();
    if (user == null || !user.role) return ""; // Check if user or role is null/undefined
    return user.role;
  }

  // Check if the logged-in user is an admin
  static isAdminLogin(): boolean {
    if (this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role === "ADMIN";
  }

  // Check if the logged-in user is a customer
  static isCustomerLogin(): boolean {
    if (this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role === "CUSTOMER";
  }

  // Clear user and token from localStorage (logout)
  static clearStorage(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}