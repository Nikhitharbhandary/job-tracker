import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user-service';
@Component({
  selector: 'app-login',
  imports: [
    Header,
    Footer,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login  implements OnInit{
  @ViewChild("nameinput")nameField!:ElementRef;
  @ViewChild("passwordinput")passwordField!:ElementRef;
  user={
    username: '',
    password: ""
  }
  ngOnInit(): void {
    
  }
   constructor(private userservice:UserService, private cd: ChangeDetectorRef, private router:Router){}
  login(){
     if(this.user.username==""){
      this.nameField.nativeElement.focus();
    }
    else if (this.user.password==""){
      this.passwordField.nativeElement.focus();
    }
    else{
      this.userservice.get_user(this.user).subscribe(
  data => {

    console.log("user details is", data);

    // ✅ SAFE CHECK (THIS FIXES YOUR ERROR)
    if (!data || !data.token) {
      console.log("Invalid response:", data);
      alert("Login failed - invalid response");
      return;
    }

    alert("login successful");

    this.userservice.setLogin(data.token);

    this.router.navigate(['/dashboard']);

    this.clearfunction();
    this.cd.detectChanges();
  },
  err => {
    console.log("login failed:", err);
    alert("invalid credentials");
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
