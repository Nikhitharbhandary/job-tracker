import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-blog',
  imports: [
    Header,
    Footer
  ],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {}
