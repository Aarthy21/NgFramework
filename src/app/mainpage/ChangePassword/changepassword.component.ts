import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../../service';
import { PasswordModel } from '../../datamodel/pwdset/passwordmodel';
import { CompleteModel } from '../../datamodel/pwdset/completemodel';
import { Ivdsservice } from '../../vds/Ivdsservice';
import { MainComponent } from "../main.component";
import { DatePipe } from '@angular/common';
import { SearchInterface } from '../../Interface/searchinterface';
import { DialogInterface } from '../../Interface/dialoginterface';
import { DialogModel } from '../../datamodel/smdialog/dialogmodel';


@Component({
  selector: 'ChangePassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangePasswordComponent implements OnInit ,SearchInterface,DialogInterface {
  public screenname = "Change Password";
  public dialogmodel: DialogModel;
  password: string;
  confirmpassword: string;
  chg_date:any;
  lastpwdup:any;
  loginname;
  passwordarray = [];
  oldpassword: string;
  pswdencrypt: string;
  useroldpass: string;
  usernewpass: string;
  status: any;
  encnewpswd: any;
  newpass: any;
  passhistory=[];
  pwdcount = [];
  validatearray = [];
  id: any;
  passwordmodel: PasswordModel;
  completemodel: CompleteModel;
  validationconstraints = [];
  passwordmaxlength; passwordminlength; passreqno; passreqspcl; passreqlwrcase; passrequprcase; passreqalpha;
  constructor(private maincomponent: MainComponent,private router:Router, private service: Service, private Ivdsservice: Ivdsservice,private datepipe: DatePipe) { }
  ngOnInit() {
   
    this.maincomponent.setsearchChild(this);
    this.maincomponent.setdialogChild(this);
    if(this.service.retrieveusercredentials()==undefined){
      this.router.navigate(['/login']);
    }
    this.loginname=this.service.retrieveusercredentials().user;
    alert(this.loginname);
    this.getpwddetails();
    this.getconstraints();
    this.dialog();
   
  }
 getconstraints() {
    this.Ivdsservice.getvalidationconstraints()
      .subscribe
      (response => {
        console.log(response);
        this.validationconstraints = response.rs.appsecuritysettings;
        console.log(this.validationconstraints);
        this.passwordmaxlength = this.validationconstraints.filter(function (obj) { return obj.attribute == "usrmaxlen"; })[0].value;
        this.passwordminlength = this.validationconstraints.filter(function (obj) { return obj.attribute == "usrminlen"; })[0].value;
        this.passreqno = this.validationconstraints.filter(function (obj) { return obj.attribute == "pwdreqnumber"; })[0].value;
        this.passreqno=this.passreqno.toUpperCase();
        this.passreqspcl = this.validationconstraints.filter(function (obj) { return obj.attribute == "pwdreqspcl"; })[0].value;
        this.passreqspcl=this.passreqspcl.toUpperCase();
        this.passreqlwrcase = this.validationconstraints.filter(function (obj) { return obj.attribute == "pwdreqlowercase"; })[0].value;
        this.passreqlwrcase=this.passreqlwrcase.toUpperCase();
        this.passrequprcase = this.validationconstraints.filter(function (obj) { return obj.attribute == "pwdrequppercase"; })[0].value;
        this.passrequprcase=this.passrequprcase.toUpperCase();
        this.passreqalpha = this.validationconstraints.filter(function (obj) { return obj.attribute == "pwdreqalpha"; })[0].value;
        this.passreqalpha=this.passreqalpha.toUpperCase();
        console.log(this.passwordmaxlength, this.passwordminlength,
          this.passreqno, this.passreqspcl, this.passreqlwrcase, this.passrequprcase, this.passreqno, this.passreqalpha);
      },
      err => { console.log(err) });
  }
  hasLowerCase(str) {
    if (str.toUpperCase() != str) {
      return true;
    }
    return false;
  }

  hasUpperCase(str) {
    if (str.toLowerCase() != str) {

      return true;
    }
    return false;
  }

  hasalpha(str) {
    if (/[a-zA-Z]/.test(str)) {
      return true;
    }
    return false;
  }

  hasNumber(myString) {
    if (/\d/.test(myString)) {
      return true;
    }
    return false;
  }

  hasspecial(str) {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  savevalidate() {

    if (this.confirmpassword == "") {
      this.confirmpassword = undefined;
    }
    if (this.password == "") {
      this.password = undefined;
    }
    else if ((this.password.length > this.passwordmaxlength)) {
      this.dialogmodel.message = "Password length should not be greater than";
      this.dialogmodel.value = this.passwordmaxlength;
     this.maincomponent.invokedialog(this.dialogmodel);
    }
    else if ((this.password.length < this.passwordminlength)) {
      this.dialogmodel.message = "Password length should not be lesser than";
      this.dialogmodel.value = this.passwordminlength;
     this.maincomponent.invokedialog(this.dialogmodel);
    }
    else if (this.hasLowerCase(this.password) != true && this.passreqlwrcase == "Y") {
      this.dialogmodel.value = null;
      this.dialogmodel.message = "New Password should contain atleast one lowercase letter";
     this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (this.hasUpperCase(this.password) != true && this.passrequprcase == "Y") {
      this.dialogmodel.message = "New sPassword should contain atleast one uppercase letter";
      this.dialogmodel.value = null;
     this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (this.hasalpha(this.password) != true && this.passreqalpha == "Y") {
      this.dialogmodel.message = "New Password should contain atleast one alphabet";
      this.dialogmodel.value = null;
     this.maincomponent.invokedialog(this.dialogmodel);


    }
    else if (this.hasspecial(this.password) != true && this.passreqspcl == "Y") {
      this.dialogmodel.message = "New Password should contain atleast one special character";
      this.dialogmodel.value = null;
     this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (this.hasNumber(this.password) != true && this.passreqno == "Y") {
      this.dialogmodel.message = "New Password should contain atleast one numeric value";
      this.dialogmodel.value = null;
     this.maincomponent.invokedialog(this.dialogmodel);


    }
    else {
      this.oldpasswordvalidation();
    }
  }
  oldpasswordvalidation() {
    this.oldpasswordencrypt(this.oldpassword);
  }

  oldpasswordencrypt(password: any) {
    console.log(password);
    this.passwordmodel = new PasswordModel();
    this.completemodel = new CompleteModel();
    this.passwordmodel.password = password;
    this.completemodel.passwordencryption.push(this.passwordmodel);
    console.log(JSON.stringify(this.completemodel));
    this.service.vdsencryptservice(this.completemodel)
      .subscribe
      (response => {
        console.log(response);
        var encoldpswd = response.FUNRESPONSE.passwordencryption[0].password;
        console.log(encoldpswd);
        this.validateold(encoldpswd);
      },
      err => { console.log(err) });
  }

  validateold(encoldpswd) {
    console.log(encoldpswd);
    console.log(this.useroldpass);
    if (encoldpswd== this.useroldpass) {
      this.getnewpasswordList();
    }
    else {
      this.dialogmodel.message = "Enter the correct old password";
      this.dialogmodel.value = null;
     this.maincomponent.invokedialog(this.dialogmodel);

      this.oldpassword="";
    }
  }

  passwordmatchvalidation() {
    console.log(this.password, this.confirmpassword);
    if (this.password == "" || this.password == undefined) {
      this.dialogmodel.message = "Enter the new password";
      this.dialogmodel.value = null;
     this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (this.password == this.confirmpassword) {
      this.getpwdcount();
    }else{
      this.dialogmodel.message = "New password and Confirm Password Mismatch";
      this.dialogmodel.value = null;
     this.maincomponent.invokedialog(this.dialogmodel);
    
    }
  }
  getpwdcount() {
    this.Ivdsservice.getpwdcount(this.loginname)
      .subscribe
      (response => {
        console.log(response);
         this.pwdcount = response.rs.passwordtable[0]['max(id)'];
         console.log(this.pwdcount);
       this.id = this.pwdcount;
       console.log(this.id);
        this.pwdhistorydetails();
       
 },
      err => { console.log(err) })
  }
  setpwd() {
    console.log(this.encnewpswd);
    var maxcount = +this.id +1;
    var values = {
      "passwordtable": [
        {
          "id": maxcount,
          "password": this.encnewpswd,
          "loginname": this.loginname
        }
      ]
    }
    this.Ivdsservice.setpwd(values)
      .subscribe
      (response => {
        console.log(response);
        if (response.status == 200) {
          this.updatepassword();
           } else {
          this.dialogmodel.message = "New password and Confirm Password Mismatch";
      this.dialogmodel.value = null;
     this.maincomponent.invokedialog(this.dialogmodel);
        }
      },
      err => { console.log(err) });
  }

getpwddetails() {
    this.Ivdsservice.getpwddetails(this.loginname)
      .subscribe
      (response => {
        console.log(response);
        this.useroldpass = response.rs.userdetails_info[0].password;
        console.log(this.useroldpass);
      },
      err => { console.log(err) });
  }
  getnewpasswordList() {
    this.Ivdsservice.getnewpassword(this.loginname)
      .subscribe
      (response => {
        console.log(response);
        this.newpass = response.rs.passwordtable;
        console.log(this.newpass);
        this.newpasswordcollection();
      },
      err => { console.log(err) });
  }

  newpasswordcollection() {
    this.Ivdsservice.gethistorydetails(this.loginname)
      .subscribe
      (response => {
        console.log(response);
         this.passwordarray = response.rs.passwordtable[0].password;
         console.log(this.passwordarray);
         this.newpasswordencryption(this.password);
      },
      err => { console.log(err) });
  }
  newpasswordencryption(password) {
    console.log(password);
    this.passwordmodel = new PasswordModel();
    this.completemodel = new CompleteModel();
    this.passwordmodel.password = password;
    this.completemodel.passwordencryption.push(this.passwordmodel);
    console.log(JSON.stringify(this.completemodel));
    this.service.vdsencryptservice(this.completemodel)
      .subscribe
      (response => {
        console.log(response);
        this.encnewpswd = response.FUNRESPONSE.passwordencryption[0].password;
        console.log(this.encnewpswd);
        this.newpasswordvalidation()

      },
      err => { console.log(err) });
  }

  newpasswordvalidation() {
    if (this.passwordarray == this.encnewpswd) {
      this.dialogmodel.message = "Password existing Choose another New Password";
      this.dialogmodel.value = null;
     this.maincomponent.invokedialog(this.dialogmodel);
     }
    else {
      this.passwordmatchvalidation();
    }
  }

  
  updatepassword(){
    this.chg_date = this.datepipe.transform(new Date(), "yyyy-MM-dd hh:mm:ss");
    this.lastpwdup = this.datepipe.transform(new Date(), "yyyy-MM-dd hh:mm:ss");
    var values={
     
        "userdetails_info": [
          {
            "password": this.encnewpswd,
            "chg_date": this.chg_date,
            "lastpwdup": this.lastpwdup,
            "loginname": this.loginname
          }
        ]
      }
    
    this.Ivdsservice.updatepassword(values)
    .subscribe
    (response => {
      console.log(response);
       if(response.status==200){
        this.dialogmodel.message = "Saved Successfully";
        this.dialogmodel.value = null;
       this.maincomponent.invokedialog(this.dialogmodel);
        this.oldpassword="";
        this.password="";
        this.confirmpassword="";
      }

  },
  err => { console.log(err) });
}
pwdhistorydetails(){
  this.Ivdsservice.pwdhistorydetails(this.loginname)
  .subscribe
  (response => {   
    var flag=0
    console.log(response);
    var array=response.rs.passwordtable;
    for(var i=0;i<array.length;i++){
      console.log(array[i].password);
      console.log(this.encnewpswd);
      if(this.encnewpswd==array[i].password){
        console.log(this.encnewpswd);
        this.dialogmodel.message = "Password existing in history kindly change the password";
        this.dialogmodel.value = null;
       this.maincomponent.invokedialog(this.dialogmodel);
        flag=1;
        break;
      }     
    } 
    
    if(!flag){
      this.setpwd();
    }
  },
  err => { console.log(err) });
}
  cancel() {
    this.dialogmodel.message = "cancelled";
    this.dialogmodel.value = null;
   this.maincomponent.invokedialog(this.dialogmodel);
  }
  
  /*********dialog****************/
  dialog() {
    this.dialogmodel = new DialogModel();
    this.dialogmodel.dialogtype = "alert";
    this.dialogmodel.screenname = this.screenname;
    this.dialogmodel.value = null;
  }

  getdialogresult(result:any){
console.log(result);
  }
/***********search******************/
  setTwocolSearchresult(){}

 setMulticolSearchresult(){}
 setJdlgSearchresult(){

}

  }

