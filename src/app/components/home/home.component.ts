import { Component, OnInit } from '@angular/core';
import { DBservice } from 'src/app/services/db.service';
import { SignupModel } from '../login/signup.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  signupModelObj : SignupModel = new SignupModel();
  getSignupData! : any;

  constructor(private DB : DBservice) { }
  ngOnInit(): void {
    this.getsignupModel();
  }
  getsignupModel(){
    this.DB.getsignup(this.signupModelObj)
    .subscribe(res=>{
     this.getSignupData = res;
    });


}
deleteSignupModel(row : any){
  this.DB.deleteSignup(row.id)
  .subscribe(data=>{
    console.log(data)
    alert("Query data deleted successfully")
  })

}
}