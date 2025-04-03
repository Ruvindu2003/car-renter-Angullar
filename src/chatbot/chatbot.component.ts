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
  messages: {text: string, sender: 'customer' | 'business', time: Date}[] = [];

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
    
   
    this.messages.push({
      text: this.text,
      sender: 'customer',
      time: new Date()
    });

    this.service.getWhatssapp(this.to, this.text).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.response = res;
        
        if (res.status?.groupName === 'REJECTED') {
          this.error = `Message could not be sent: ${res.status.description}`;
        } else {
          
          const thankYouMessage = this.generateThankYouMessage(this.text);
          this.messages.push({
            text: thankYouMessage,
            sender: 'business',
            time: new Date()
          });
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

  private generateThankYouMessage(customerMessage: string): string {
    
    const lowerMsg = customerMessage.toLowerCase();
    
    if (lowerMsg.includes('thank') || lowerMsg.includes('thanks')) {
      return "You're welcome! We appreciate your feedback. Is there anything else we can assist you with?";
    }
    else if (lowerMsg.includes('help') || lowerMsg.includes('issue')) {
      return "Thank you for your message. Our team will look into this and get back to you shortly.";
    }
    else if (lowerMsg.includes('good') || lowerMsg.includes('great') || lowerMsg.includes('excellent')) {
      return "Thank you for your positive feedback! We're thrilled to hear about your great experience.";
    }
    else {
      return "Thank you for your feedback! We appreciate you taking the time to share your thoughts with us.";
    }
  }
}