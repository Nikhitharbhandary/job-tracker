import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';


@Component({
  selector: 'app-aboutus',
  imports: [
    Header,
    Footer
  ],
  templateUrl: './aboutus.html',
  styleUrl: './aboutus.css',
})
export class Aboutus {}
