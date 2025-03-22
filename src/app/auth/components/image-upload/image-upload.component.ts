import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PostCarComponent } from '../../../post-car/post-car.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  imports: [CommonModule]
})
export class ImageUploadComponent {
  selectedFile!: File;
  imageUrl: string = '';

  constructor(private http: HttpClient,private postcar:PostCarComponent) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    if (!this.selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:8080/api/images/upload', formData, { responseType: 'text' })
      .subscribe({
        next: (response: any) => {
          this.imageUrl = response;
          this.postcar.imageUrlCaptured = this.imageUrl;
        },
        error: (err) => {
          alert("Upload failed: " + err.message);
        }
      });

  }
}
