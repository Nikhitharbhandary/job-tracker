import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header  implements OnInit{
  constructor(private cd:ChangeDetectorRef, private userService: UserService){}
  islogin:boolean=false;
  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe(status => {
    this.islogin = status;
  });
  }
  logout(){
   this.userService.logout();
  }
}
