import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [
    Header,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    constructor( private router:Router){}

  dashboard(){
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }
  }
}
