import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterLink
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
