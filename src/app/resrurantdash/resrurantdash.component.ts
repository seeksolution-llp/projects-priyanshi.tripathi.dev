import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ResturantData } from './resturant.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-resrurantdash',
  templateUrl: './resrurantdash.component.html',
  styleUrls: ['./resrurantdash.component.css'],
})
export class ResrurantdashComponent implements OnInit {
  formValue!: FormGroup;
  resturantModelObj: ResturantData = new ResturantData();
  allResturantData: any;
  showAdd!:boolean
  showbtn!:boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
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
    this.resturantModelObj.name = this.formValue.value.name;
    this.resturantModelObj.email = this.formValue.value.email;
    this.resturantModelObj.mobile = this.formValue.value.mobile;
    this.resturantModelObj.address = this.formValue.value.address;
    this.resturantModelObj.services = this.formValue.value.services;

    this.api.postResturant(this.resturantModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Resturant Record found successfully 😊😍');
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
        this.getAllData();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
  //Get All data
  getAllData() {
    this.api.getResturant().subscribe((res) => {
      this.allResturantData = res;
    });
  }

  //Delete record
  deleteResto(data: any) {
    this.api.deleteResturant(data.id).subscribe((res) => {
      alert('Resturant Records Deleted❤❤');
      this.getAllData(); // Quick refresh data
    });
  }
  onEditResto(data: any) {
    this.showAdd=false;
    this.showbtn=true;
    this.resturantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  updateResto() {
    this.resturantModelObj.name = this.formValue.value.name;
    this.resturantModelObj.email = this.formValue.value.email;
    this.resturantModelObj.mobile = this.formValue.value.mobile;
    this.resturantModelObj.address = this.formValue.value.address;
    this.resturantModelObj.services = this.formValue.value.services;

    this.api.updateResturant(this.resturantModelObj, this.resturantModelObj.id)
      .subscribe(res=> {
        alert('Resturant Record updated successfully 😊😍');
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
        this.getAllData(); //when a post any data
      });
  }
}
