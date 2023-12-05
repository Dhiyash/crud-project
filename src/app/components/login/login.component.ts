import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupModel } from './signup.model';
import { LoginModel } from './signup.model';
import { DBservice } from 'src/app/services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    signupForm! : FormGroup;
    loginForm! : FormGroup;
    type: string = "password";
    isText: boolean = false;
    eyeIcon: string = "fa-eye-slash";
    signupModelObj : SignupModel = new SignupModel();
    loginModelObj : LoginModel = new LoginModel();
    getSignupData! : any;

    constructor(private fb : FormBuilder, private DB : DBservice, private router: Router ) { }
    ngOnInit(): void {
      this.signupForm = this.fb.group({
        firstName: ['', Validators.required],
        userName: ['', Validators.required],
        contact: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        password: ['', Validators.required],
      })
     
      this.loginForm = this.fb.group({
        userName1: ['', Validators.required],
        password1: ['', Validators.required],
        
      })
    }
    postsignupModel(){
      if(this.signupForm.valid){
        console.log(this.signupForm.value)
        this.signupModelObj.firstName = this.signupForm.value.firstName;
        this.signupModelObj.userName = this.signupForm.value.userName;
        this.signupModelObj.contact = this.signupForm.value.contact;
        this.signupModelObj.lastName = this.signupForm.value.lastName;
        this.signupModelObj.gender = this.signupForm.value.gender;
        this.signupModelObj.password = this.signupForm.value.password;

        this.DB.postsignup(this.signupModelObj)
        .subscribe(res=>{
          console.log(res);
          alert("Data added Successfully")
          this.signupForm.reset();
        })
      }
      else{
        this.validateAllFormFileds(this.signupForm);
        alert("your form is invalid")
      }
    }
 
    getsignupModel(){
      this.DB.getsignup(this.signupModelObj)
      .subscribe(res=>{
       this.getSignupData = res;
       const loginCheck = res.find((getSignupData: any)=>{
        return getSignupData.userName ===  this.loginForm.value.userName1
        && getSignupData.password === this.loginForm.value.password1 && getSignupData.identity === this.loginForm.value.identity1
       });
       if(loginCheck){
        alert("Login success");
        this.loginForm.reset()
        this.router.navigate(["home"])
       }else{ alert("user not found") }
      
      }
      ,err=>{ alert("something went wrong") 
    })
    }
  
    hideShowPass(){
      this.isText = !this.isText;
      this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon="fa-eye-slash";
      this.isText ? this.type = "text" : this.type = "password";
    }
  
    private validateAllFormFileds(formGroup:FormGroup){
      Object.keys(formGroup.controls).forEach(field=>{
        const control = formGroup.get(field);
        if(control instanceof FormControl){
          control.markAsDirty({onlySelf:true})
        }else if(control instanceof FormGroup){
          this.validateAllFormFileds(control)
        }
      })
    }
}
//https://www.youtube.com/watch?v=wNWyMsrpbz0