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

  
  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }


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

  static getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  
  static getUserRole(): string {
    const user = this.getUser();
    console.log(user);
    
    return user?.role ?? ''; 
  }

  
  static isAdminLogin(): boolean {
    const token = this.getToken();
    return token != null && this.getUserRole() === "ADMIN";
  }

  
  static isCustomerLogin(): boolean {
    const token = this.getToken();
    return token != null && this.getUserRole() === "CUSTOMER";
  }


  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
  static Logout():void{

  }
}
  