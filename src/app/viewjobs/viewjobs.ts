import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ProductServices } from '../services/product-services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JobService } from '../services/job-service';
import { DashboardHeader } from '../dashboard-header/dashboard-header';
import { UserService } from '../services/user-service';


@Component({
  selector: 'app-viewjobs',
  imports: [
    Footer,
    CommonModule,
    DashboardHeader
  ],
  templateUrl: './viewjobs.html',
  styleUrl: './viewjobs.css',
})
export class Viewjobs implements OnInit{
  jobs:any[]=[];
  userId: number | null = null;
  constructor(private jobservice: JobService, private cd :ChangeDetectorRef, private router:Router,private UserService:UserService){};
  ngOnInit(): void {
    this.userId = this.UserService.getUserId();
    this.displayJobs();
  }
  displayJobs(){
    this.jobservice.get_jobs().subscribe(data=>{
     this.jobs = data.data.filter(
      (job: any) => job.user_id === this.userId
    );
      console.log("jobs data", this.jobs);
      this.cd.detectChanges();
    });
  }
  editProduct(id: number) {
    this.jobservice.setjobId(id);
    this.router.navigate(['/add-job']); 
  }
  back(){
    this.router.navigate(['/dashboard'])
  }
}
