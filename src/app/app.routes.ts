import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Products } from './products/products';
import { Viewprojects } from './viewprojects/viewprojects';
import { Login } from './login/login';
import { Register } from './register/register';
import { authGuard } from './auth-guard';
import { Dashboard } from './dashboard/dashboard';
import { DashboardHeader } from './dashboard-header/dashboard-header';
import { Sidebar } from './sidebar/sidebar';
import { AddJob } from './add-job/add-job';
import { FileUpload } from './file-upload/file-upload';
import { Viewjobs } from './viewjobs/viewjobs';
import { Aboutus } from './aboutus/aboutus';
import { Blog } from './blog/blog';
import { ContactUs } from './contact-us/contact-us';

export const routes: Routes = [
    { 
        path        : "",  
        component   : Home,
    },
    { 
        path        : "products",
        component   : Products,
        canActivate : [authGuard]
    },
    { 
        path        : "product-list", 
        component   : Viewprojects
    },
     { 
        path        : "job-list", 
        component   : Viewjobs
    },
    {
        path        :"login", 
        component   : Login 
    },
    { 
        path        : 'register', 
        component   : Register
    },
    {
        path        : "dashboard",
        component   :  Dashboard,
        canActivate : [authGuard]
    },
    {
        path        : "dashboard-header",
        component   :  DashboardHeader,
        canActivate : [authGuard]
    },
    {
        path        : "sidebar",
        component   :  Sidebar,
        canActivate : [authGuard]
    },
    {
        path        : "add-job",
        component   :  AddJob,
        canActivate : [authGuard]
    },
    {
        path        : "file-upload",
        component   :  FileUpload,
        canActivate : [authGuard]
    },
    {
        path        : "about-us",
        component   :  Aboutus,
    },
     {
        path        : "contact",
        component   :  ContactUs,
    },
];
