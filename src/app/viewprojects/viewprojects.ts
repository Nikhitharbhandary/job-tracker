import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ProductServices } from '../services/product-services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewprojects',
  imports: [
    Header,
    Footer,
     CommonModule
  ],
  templateUrl: './viewprojects.html',
  styleUrl: './viewprojects.css',
})
export class Viewprojects  implements OnInit{
  products:any[]=[];
  constructor(private productservice: ProductServices, private cd :ChangeDetectorRef, private router:Router){};
  ngOnInit(): void {
    this.displayProduct();
  }
  displayProduct(){
    this.productservice.get_products().subscribe(data=>{
      this.products=data.data;
      console.log("Products data", this.products);
      this.cd.detectChanges();
    });
  }
  editProduct(id: number) {
    this.productservice.setProductId(id);
    this.router.navigate(['/products']); 
  }
}
