import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Header } from '../header/header';
import { ProductServices } from '../services/product-services';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Footer } from '../footer/footer';
import { Router } from '@angular/router';
import { JobService } from '../services/job-service';
import { DashboardHeader } from '../dashboard-header/dashboard-header';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-add-job',
  imports: [
    CommonModule,
    FormsModule,
    Footer,
    DashboardHeader
  ],
  templateUrl: './add-job.html',
  styleUrl: './add-job.css',
})
export class AddJob implements OnInit {

  @ViewChild("cnameinput")cnameField!:ElementRef;
  @ViewChild("roleinput")roleField!:ElementRef;
  @ViewChild("statusinput")statusField!:ElementRef;
  @ViewChild("locationinput")locationField!:ElementRef;

  job={
    cname: '',
    role: "",
    status:"",
    location:"",
    note:"",
    applied_date:"",
    user_id:0
  }

  jobs:any={};
  id: number | null = null;
  editmode:boolean=false;
  userId: number | null = null;
  constructor(private jobservice:JobService, private cd: ChangeDetectorRef, private router:Router, private UserService:UserService){}
  ngOnInit(){
    this.id= this.jobservice.getJobId();
    this.userId = this.UserService.getUserId();
    if(this.id){
      this.editmode=true;
      this.displayproduct_id(this.id);
      console.log("selected id is ", this.id);
    }
    else{
      this.job.applied_date = new Date().toISOString().split('T')[0];
    }
  }
  displayproduct_id(id: number) {
    this.jobservice.get_job_id(id).subscribe(data => {
      this.jobs = data;
      console.log("data is ", this.jobs);
      this.job.cname= this.jobs.cname;
      this.job.location=this.jobs.location;
      this.job.status=this.jobs.status;
      this.job.role=this.jobs.role;
      this.job.note=this.jobs.note,
      this.job.applied_date=this.jobs.applied_date.split('T')[0];
      console.log("job id data is ", this.jobs);
      this.cd.detectChanges();
    });
  }
  addProduct(){
    if(this.job.cname==""){
      this.cnameField.nativeElement.focus();
    }
    else if (this.job.role==""){
      this.roleField.nativeElement.focus();
    }
    else if (this.job.status==""){
      this.statusField.nativeElement.focus();
    }
    else if (this.job.location==""){
      this.locationField.nativeElement.focus();
    }
    else{
      if(this.id){
        this.jobservice.update_job(this.id, this.job).subscribe(data=>{
          console.log("data updated successfully",data);
          this.clearfunction();
          console.log("After submiting the product value is ", this.job);
          this.cd.detectChanges();
        });
      }
      else{
        console.log("Add product button is cliked");
        console.log("passing data is ", this.job);
         this.job.user_id = this.userId ?? 0;
        this.jobservice.add_jobs(this.job).subscribe(data=>{
          console.log("data added successfully",data);
          this.clearfunction();
          console.log("After submiting the product value is ", this.job);
          this.cd.detectChanges();
        });
      }
    }
  }
  clearfunction(){
    this.editmode=false;
    this.cnameField.nativeElement.focus();
    this.job.cname= "";
    this.job.location="";
    this.job.status="";
    this.job.role="";
    this.job.note="";
    this.job.applied_date = new Date().toISOString().split('T')[0];
    localStorage.removeItem("setJobId");
  }
  view_jobs(){
    this.router.navigate(['/job-list']);
  }
  delete_product(){
    console.log("Delete button is clicked");
    if(this.id){
      console.log("id is ",this.id);
      this.jobservice.delete_job(this.id).subscribe(data=>{
        console.log("data deleted successfully",data);
        this.clearfunction();
        console.log("After submiting the product value is ", this.job);
        this.cd.detectChanges();
      });
    }
    else{
      this.cnameField.nativeElement.focus();
    }
  }
}