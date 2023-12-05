import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { UpdateModel } from '../components/login/signup.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DBservice {
    constructor(private http : HttpClient) { }
    headers = new HttpHeaders().set('content-Type', 'application/json').set('Accept','application/json');
    httpOptions = { headers : this.headers }

  postsignup(data : any){
    return this.http.post<any>("http://localhost:3000/posts", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getsignup(data : any){
    return this.http.get<any>("http://localhost:3000/posts", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteSignup(id : number){
    return this.http.delete<any>("http://localhost:3000/posts/"+ id)
    .pipe(map((res:any)=>{
      return res;
    })) 
  }
  getSignupById(id : number): Observable<UpdateModel>{ 
    return this.http.get<UpdateModel>("http://localhost:3000/posts/"+ id, this.httpOptions)
    .pipe(map((res:any)=>{
      return res;


    }))
  }
  putSignupData(updateModelObj : any): Observable<UpdateModel>{
    return this.http.put<UpdateModel>("http://localhost:3000/posts/"+updateModelObj.id,updateModelObj,this.httpOptions)
    .pipe(map((res:any)=>{
      return res;


    }))
  }
}