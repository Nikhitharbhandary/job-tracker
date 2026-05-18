import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-register',
  imports: [
    Header,
    Footer,
    CommonModule,
    FormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit{
  @ViewChild("nameinput")nameField!:ElementRef;
  @ViewChild("passwordinput")passwordField!:ElementRef;
  user={
    username: '',
    password: ""
  }
  ngOnInit(): void {
    
  }
  constructor(private userservice:UserService, private cd: ChangeDetectorRef, private router:Router){}
  register(){
    console.log("register function");
    if(this.user.username==""){
      this.nameField.nativeElement.focus();
    }
    else if (this.user.password==""){
      this.passwordField.nativeElement.focus();
    }
    else{
      this.userservice.insert_user(this.user).subscribe(
        data => {
          console.log("user details is", data);
          alert("register succesfull");
          this.cd.detectChanges();
          this.router.navigate(['login'])
        },
        err => {
          console.log("registration failed:", err);
           alert(err.error.error);
        }
      );
    }
  }
  clearfunction(){
    this.nameField.nativeElement.focus();
    this.user.username="";
    this.user.password="";
    localStorage.removeItem("setuserId");
  }
}
