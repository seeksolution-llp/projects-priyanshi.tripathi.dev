import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder ,private _http:HttpClient , private router:Router) {}

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
    name:['',[Validators.required,Validators.minLength(4)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(8)]]
    })
  }
  //signup method to create User

  signUp(){
    this._http.post<any>("http://localhost:3000/Signup",this.signupForm.value).subscribe(res=>{
      alert("Registration successfully!! thanku😍😊")
      this.signupForm.reset();
      this.router.navigate(['login'])
    },err=>{
      alert("Something went wrong")
    }

    )
  }
}


