import { Component, OnInit } from '@angular/core';
import { faEnvelope, faPhone, faCar } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-whatssapp-boat',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './whatssapp-boat.component.html',
  styleUrls: ['./whatssapp-boat.component.css']
})
export class WhatssappBoatComponent implements OnInit {
  message: string = '';
  isOpen: boolean = false;
  isTyping: boolean = false;
  quickReplies: string[] = [
    "I need to book a car",
    "What's your rental rates?",
    "Do you offer long-term rentals?",
    "What documents are required?",
    "Can I extend my rental period?"
  ];
  isAdmin: boolean = false;
  businessHours = {
    open: 7,
    close: 22, // 10 PM
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };
  whatsappNumber: string = '94781001040';

  // Font Awesome icons
  faWhatsapp = faWhatsapp;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faCar = faCar;

  ngOnInit(): void {
    this.checkBusinessHours();
  }

  private checkBusinessHours(): void {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][now.getDay()];

    this.isOpen = 
      this.businessHours.days.includes(currentDay) && 
      currentHour >= this.businessHours.open && 
      currentHour < this.businessHours.close;
  }

  handleSendMessage(): void {
    if (this.message.trim() === '') return;

    this.isTyping = true;

    setTimeout(() => {
      const encodedMessage = encodeURIComponent(`[Car Rental Inquiry] ${this.message}`);
      const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      this.message = '';
      this.isTyping = false;
      this.logMessage(encodedMessage);
    }, 1000);
  }

  private logMessage(msg: string): void {
    console.log("Car rental inquiry sent:", {
      message: msg,
      timestamp: new Date().toISOString()
    });
  }

  handleQuickReply(reply: string): void {
    this.message = reply;
    setTimeout(() => {
      const input = document.querySelector('.message-input input') as HTMLElement;
      input?.focus();
    }, 0);
  }
}