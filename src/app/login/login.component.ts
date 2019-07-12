import { Component, OnInit } from '@angular/core';
import { Ivdsservice } from '../vds/Ivdsservice';
import { MainComponent } from "../mainpage/main.component";
import { Service } from '../service';
import { PasswordModel } from '../datamodel/pwdset/passwordmodel';
import { CompleteModel } from '../datamodel/pwdset/completemodel';

import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'app';
  pass: string;
  password:string;
  username: string;
  loginname:string;
  passwordmodel: PasswordModel;
  completemodel: CompleteModel;
  encpswd: any;
  invalidusername = false; 
  invalidpassword = false; 
  invalidcredentials = false;
  loginuserdetails;
  constructor(private service: Service, private Ivdsservice: Ivdsservice, private router: Router) { }
  ngOnInit() {
   
  }
  validate() {
    if (this.username == "") {
      this.username = undefined;
    }
    if (this.pass == "") {
      this.pass = undefined;
    }
    if (this.username == "" || this.username == undefined) {
      this.invalidusername = true;
      this.invalidpassword = true;
    }
    console.log(this.pass)
    this.passwordencrypt(this.pass);
  }
  getuserinfo() {
    if (this.username != "" || this.username != undefined) {
      this.invalidusername = false;
    }
  }
  getpassinfo() {
    if (this.pass != "" || this.pass != undefined) {
      this.invalidpassword = false;
     
    }
}
passwordencrypt(password: any) {
  console.log(password);
  this.passwordmodel = new PasswordModel();
  this.completemodel = new CompleteModel();
  this.passwordmodel.password = this.pass;
  console.log(this.passwordmodel.password)
  this.completemodel.passwordencryption.push(this.passwordmodel);
  console.log(JSON.stringify(this.completemodel));
  this.service.vdsencryptservice(this.completemodel)
    .subscribe
    (response => {
      console.log(response);
      var encpswd = response.FUNRESPONSE.passwordencryption[0].password;
      console.log(encpswd);
      this.getlogindetails(encpswd);
    },
    err => { console.log(err) });
}
getlogindetails(encpswd){
 this.Ivdsservice.getlogindetails(this.loginname)
  .subscribe
   (response => {
     console.log(response);
     var arr=response.rs.userdetails_info;
     console.log(arr);
     for(var i=0;i<arr.length;i++){
       console.log(this.username.toLowerCase());
       if(this.username.toLowerCase()==arr[i].loginname.toLowerCase()){
         console.log(arr[i].loginname);
         console.log(arr[i].password);
         if(encpswd==arr[i].password){
          console.log(this.username);
          this.Ivdsservice.getloginusertype(this.username).subscribe(response=>{
            console.log(response);
            this.loginuserdetails=response.rs.userdetails_app[0];
            this.service.saveusercredentials(this.username,this.loginuserdetails);
          });        
         
         
           this.router.navigate(['/main']);
         }else{
        
          this.invalidcredentials = true;
         }
       }else{
        this.invalidcredentials =false;
       }
     }
    },
      err => { console.log(err) });
    }
  }