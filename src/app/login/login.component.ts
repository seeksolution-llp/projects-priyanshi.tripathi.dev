import { HttpClient } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
   submitted:false | undefined;

  constructor(private formbuilder: FormBuilder, private _http:HttpClient, private router:Router){}
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })

   }
   //[ngClass]="{'is-invalid':submitted && loginForm.controls.email.errors}"
   //[ngClass]="{'is-invalid':loginForm.get('email').invalid && (loginForm.get('email').dirty||loginForm.get('email').touched|| loginForm.submitted)}"
// login method define


login(){
    this._http.get<any>("http://localhost:3000/Signup").subscribe(res=>{
      const user=res.find((a:any)=>{
       return a.email === this.loginForm.value.email && a.password=== this.loginForm.value.password
      })
       if(user){
        alert("User login successfull😊");
        this.loginForm.reset();
        this.router.navigate(['resturant'])

       }else{
        alert('User Not Found!!')
       }
      },err =>{
        alert("Somthing wrong from server site")
    }
   )
}
}
