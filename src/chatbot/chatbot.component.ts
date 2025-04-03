import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../app/modules/customer/services/customer.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  to: string = '';
  text: string = '';
  response: any;
  error: string = '';
  isLoading: boolean = false;

  constructor(private service: CustomerService) {}

  
  private isValidWhatsAppNumber(number: string): boolean {
    
    const cleanedNumber = number.replace(/\D/g, '');
    
    return /^[1-9]\d{8,14}$/.test(cleanedNumber);
  }

  sendWhatsAppMessage() {
    
    this.error = '';
    this.response = null;

    
    if (!this.to || !this.text) {
      this.error = 'Both phone number and message are required';
      return;
    }

    if (!this.isValidWhatsAppNumber(this.to)) {
      this.error = 'Invalid WhatsApp number format. Please include country code and try again.';
      return;
    }

    this.isLoading = true;

    this.service.getWhatssapp(this.to, this.text).subscribe({
      next: (res) => {
        this.isLoading = false;
        
        
        if (res.status?.groupName === 'REJECTED') {
          this.error = `Message could not be sent: ${res.status.description}`;
        } else {
          this.response = res;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 
                    err.error?.status?.description || 
                    'Failed to send message. Please try again later.';
      }
    });
  }
}