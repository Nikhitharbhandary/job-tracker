import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class JobService {
   private apiUrl= environment.apiUrl;
    constructor(private http: HttpClient){}
    get_jobs():Observable<any>{
      const token = localStorage.getItem('token');
      console.log("token is ", token);
      return this.http.get<any>(this.apiUrl+'/jobs/jobs');
    }
    add_jobs(data:any):Observable<any[]>{
    return this.http.post<any[]>(this.apiUrl+'/jobs/add-job', data);
  }
    update_job(id:number, data:any):Observable<any[]>{
      return this.http.post<any[]>(this.apiUrl+'/jobs/update-job', { id, ...data });
    }
    delete_job(id:number):Observable<any[]>{
      return this.http.delete<any>(`${this.apiUrl}/jobs/delete-job?id=${id}`);
    }
    get_job_id(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/jobs/job_id?id=${id}`);
    }
    setjobId(id: number) {
      localStorage.setItem("setJobId", id.toString());
    }
    getJobId() {
      const id= localStorage.getItem('setJobId');
      return Number(id);
    }
}
