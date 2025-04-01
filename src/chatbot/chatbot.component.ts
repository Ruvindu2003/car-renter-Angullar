import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import axios from 'axios';



@Component({
  selector: 'app-chatbot',
  imports: [CommonModule,FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  messages: { sender: string, text: string }[] = [];
  userInput: string = '';

  async sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ sender: 'User', text: this.userInput });

    try {
      const response = await axios.post('https://api.whatsapp.com/send/?phone=917009075316&text=%236hTuVN&type=94781001040', {
        message: this.userInput
      });

      this.messages.push({ sender: 'Bot', text: response.data.reply || "I'm not sure how to respond." });
    } catch (error) {
      this.messages.push({ sender: 'Bot', text: 'Error communicating with chatbot API.' });
    }

    this.userInput = '';
  }

}
