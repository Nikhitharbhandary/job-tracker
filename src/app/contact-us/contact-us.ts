import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-contact-us',
  imports: [
    Header,
    Footer
  ],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUs {}
