import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ImageUploadComponent } from './app/auth/components/image-upload/image-upload.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
