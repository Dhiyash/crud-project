import { Component, OnInit } from '@angular/core';
import { DBservice } from 'src/app/services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateModel } from '../login/signup.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{
  signupID : any;
  updateModelObj : UpdateModel = new UpdateModel();
constructor( private DB: DBservice, private AR: ActivatedRoute, private r : Router) { }
  ngOnInit(): void {
    this.signupID = this.AR.snapshot.paramMap.get('id');
    console.log("ID " + this.signupID);
    
    this.DB.getSignupById(this.signupID).subscribe((data: any)=>{
      this.updateModelObj = data;
      console.log(data);
    })
  }
  updateSignupModel(){
    this.DB.putSignupData(this.updateModelObj).subscribe(data=>{
    });
    this.r.navigate(['/home'])
  }

}
