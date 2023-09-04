import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ResturantData } from './ecommerce.model';

@Component({
  selector: 'app-ecommercedash',
  templateUrl: './ecommercedash.component.html',
  styleUrls: ['./ecommercedash.component.css']
})
export class EcommercedashComponent implements OnInit{

  formValue!: FormGroup;
  ecommerceModelObj: ResturantData = new ResturantData();
  allResturantData: any;
  showAdd!:boolean
  showbtn!:boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:['',[Validators.required,Validators.maxLength(4)]],
      productname: ['',[Validators.required,Validators.maxLength(10)]],
      category: ['',[Validators.required,Validators.minLength(3)]],
      price : ['',[Validators.required,Validators.minLength(2)]],
      description : ['',[Validators.required,Validators.minLength(10)]],
      discount : ['',[Validators.required]],
      finalprice:['',[Validators.required]]
    })
    this.getAllData();
  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  // Now subscribing our data which is mapped via services
  addResto() {
    this.ecommerceModelObj.productname = this.formValue.value.productname;
    this.ecommerceModelObj.price = this.formValue.value.price;
    this.ecommerceModelObj.category = this.formValue.value.category;
    this.ecommerceModelObj.description = this.formValue.value.description;
    this.ecommerceModelObj.discount = this.formValue.value.discount;
    this.ecommerceModelObj.finalprice = this.formValue.value.price - (this.formValue.value.price*(this.formValue.value.discount/100));

    this.api.postResturant(this.ecommerceModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Product Record found successfully 😊😍');

        this.formValue.reset();
        this.getAllData();

        console.log(this.getAllData())
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
  //Get All data
  getAllData() {
    this.api.getResturant().subscribe((res:any) => {
      this.allResturantData = res;
    });
  }

  //Delete record
  deleteResto(data: any) {
    if(confirm("Are You Sure to delete data")){
    this.api.deleteResturant(data.id).subscribe((res:any) => {

      this.getAllData(); // Quick refresh data
    });
  }
  }
  onEditResto(data: any) {
    this.showAdd=false;
    this.showbtn=true;
    this.ecommerceModelObj.id = data.id;
    this.formValue.controls['productname'].setValue(data.productname);
    this.formValue.controls['price'].setValue(data.price);
    this.formValue.controls['category'].setValue(data.category);
    this.formValue.controls['description'].setValue(data.description);
    this.formValue.controls['discount'].setValue(data.discount);
    this.formValue.controls['finalprice'].setValue(data.finalprice);
  }
  updateResto() {
    this.ecommerceModelObj.productname = this.formValue.value.productname;
    this.ecommerceModelObj.price = this.formValue.value.price;
    this.ecommerceModelObj.category = this.formValue.value.category;
    this.ecommerceModelObj.description = this.formValue.value.description;
    this.ecommerceModelObj.discount = this.formValue.value.discount;
    this.ecommerceModelObj.finalprice = this.formValue.value.finalprice;

    this.api.updateResturant(this.ecommerceModelObj, this.ecommerceModelObj.id)
      .subscribe((res:any)=> {
        alert('Product Record updated successfully 😊😍');
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
        this.getAllData(); //when a post any data
      });
  }
}
