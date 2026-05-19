import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Footer } from '../footer/footer';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JobService } from '../services/job-service';
import { DashboardHeader } from '../dashboard-header/dashboard-header';
import { UserService } from '../services/user-service';
import { Sidebar } from '../sidebar/sidebar';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [
    Footer,
    CommonModule,
    Sidebar,
    DashboardHeader
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  jobs: any[] = [];

  appliedCount = 0;
  interviewCount = 0;
  rejectedCount = 0;
  offerCount = 0;
  totalJobs = 0;
  userId: number | null = null;


  constructor(
    private jobservice: JobService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.UserService.getUserId();
    this.displayJobs();
  }

  displayJobs() {
    this.jobservice.get_jobs().subscribe((data: any) => {
      this.jobs = data.data.filter(
        (job: any) => job.user_id === this.userId
      );

         this.calculateStatusCounts();

      this.loadChart();

      console.log('jobs data', this.jobs);
      this.cd.detectChanges();
    });
  }

  calculateStatusCounts() {
    this.totalJobs = this.jobs.length;

    this.appliedCount = this.jobs.filter(
      job => job.status === 'Applied'
    ).length;

    this.interviewCount = this.jobs.filter(
      job => job.status === 'Interview'
    ).length;

    this.rejectedCount = this.jobs.filter(
      job => job.status === 'Rejected'
    ).length;

    this.offerCount = this.jobs.filter(
      job => job.status === 'Offer'
    ).length;
  }
 loadChart() {

    new Chart('jobChart', {

      type: 'bar',

      data: {

        labels: ['Applied', 'Interview', 'Rejected', 'Offer'],

        datasets: [{
          data: [
            this.appliedCount,
            this.interviewCount,
            this.rejectedCount,
            this.offerCount
          ],

          backgroundColor: [
            '#4e73df',
            '#f6c23e',
            '#e74a3b',
            '#1cc88a'
          ],

          borderWidth: 1
        }]
      },

      options: {
        responsive: true
      }

    });

  }
  getPercentage(count: number): number {
    if (this.totalJobs === 0) return 0;
    return Math.round((count / this.totalJobs) * 100);
  }

  editProduct(id: number) {
    this.jobservice.setjobId(id);
    this.router.navigate(['/add-job']);
  }

  back() {
    this.router.navigate(['/dashboard']);
  }
  addapplication(){
    this.router.navigate(['/add-job'])
  }
}
