import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Header } from '../header/header';
import { ProductServices } from '../services/product-services';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Footer } from '../footer/footer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  imports: [
    Header,
    CommonModule,
    FormsModule,
    Footer
  ],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
})
export class FileUpload implements OnInit {

  @ViewChild("nameinput")nameField!:ElementRef;
  @ViewChild("priceinput")priceField!:ElementRef;

  product={
    name: '',
    price: ""
  }

  products:any={};
  id: number | null = null;
  selectedfile : File | null=null;
  constructor(private productservice:ProductServices, private cd: ChangeDetectorRef, private router:Router){}
  ngOnInit(){
    this.id= this.productservice.getProductId();
    if(this.id){
      this.displayproduct_id(this.id);
      console.log("selected id is ", this.id);
    }
  }
  displayproduct_id(id: number) {
    this.productservice.get_products_id(id).subscribe(data => {
      this.products = data;
      this.product.name= this.products.name;
      this.product.price=this.products.price
      console.log("product name is ", this.product.name);
      console.log("product id data is ", this.products);
      this.cd.detectChanges();
    });
  }
  clearfunction(){
    this.nameField.nativeElement.focus();
    this.product.name="";
    this.product.price="";
    localStorage.removeItem("setProductId");
  }
  view_products(){
    this.router.navigate(['/product-list']);
  }
  delete_product(){
    console.log("Delete button is clicked");
    if(this.id){
      console.log("id is ",this.id);
      this.productservice.delete_product(this.id).subscribe(data=>{
        console.log("data deleted successfully",data);
        this.clearfunction();
        console.log("After submiting the product value is ", this.product);
        this.cd.detectChanges();
      });
    }
    else{
      this.nameField.nativeElement.focus();
    }
  }
  fileChoosenInput(event:any){
    this.selectedfile=event.target.files[0];
    console.log("selected file is ",this.selectedfile);
  }
  addProduct(){
    if(this.id){
      //update
    }
    else{
      //insert
      if(this.selectedfile){
      const formdata= new FormData();
      formdata.append('name', this.product.name);
      formdata.append('product_image', this.selectedfile, this.selectedfile.name);
      console.log("form data is ", formdata);
      this.productservice.add_file(formdata).subscribe(data=>{
        console.log("data added successfully",data);
        this.clearfunction();
        this.cd.detectChanges();
      });
    }
    }
    // if(this.selectedfile){
    //   const formdata= new FormData();
    //   formdata.append('name', this.product.name);
    //   formdata.append('product_image', this.selectedfile, this.selectedfile.name);
    //   console.log("form data is ", formdata);
    //   this.productservice.add_file(formdata).subscribe(data=>{
    //     console.log("data added successfully",data);
    //     this.clearfunction();
    //     this.cd.detectChanges();
    //   });
    // }
  }  
}

