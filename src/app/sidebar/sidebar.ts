import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user-service';
@Component({
  selector: 'app-sidebar',
  imports: [
    RouterModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(private cd:ChangeDetectorRef, private userService: UserService){}
  logout(){
    this.userService.logout();
  }
}
