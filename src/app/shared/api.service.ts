import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ map } from'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
  //Now here i will define the POST ,GET ,PUT , DELETE@
//create RESTURANT using POST method
postResturant(data:any){
  return this._http.post<any>('http://localhost:3000/posts',data).pipe(map((res:any)=>{
  return res;
  }))
}
 //get resturant data usinng GET method
 getResturant(){
  return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
  return res;
}))
 }
 // update resturant using UPDATE method
 updateResturant(data:any,id:number){
  return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
  return res;
}))
 }

 // delete resturant using DELETE method
 deleteResturant(id:number){
  return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
  return res;
}))
 }
 //this is done ....0 simple
}
