import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageCompPathService {
  private imageurlcomplocation: string = '';

  setImageUrl(url: string) {
    this.imageurlcomplocation = url;
  }

  getImageUrl(): string {
    return this.imageurlcomplocation;
  }
}
