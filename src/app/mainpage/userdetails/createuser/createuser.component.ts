import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MainComponent } from "../../main.component";
import { userdetails_info } from '../../../datamodel/userdetails/userdetailmodel'
import { CompleteModel } from '../../../datamodel/userdetails/completemodel'
import { Ivdsservice } from '../../../vds/Ivdsservice';
import { Service } from "../../../service";
import { SearchInterface } from '../../../Interface/searchinterface';
import { DialogInterface} from '../../../Interface/dialoginterface';
import { DialogModel } from '../../../datamodel/smdialog/dialogmodel';

@Component({
  selector: 'createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateUserComponent implements OnInit,SearchInterface,DialogInterface {
  public dialogmodel: DialogModel;
  public screenname = "User Management";
  public savebool = true; updatebool = false; backbool = false;
  public userid; useridmaxlength; useridminlength; usereqspecial; usereqalpha;
  public country;
  public preferredlanguage;
  public dateformat;
  public password; passwordvisible = true;
  public firstname;
  public address;
  public postalzipcode;
  public emailid;
  public confirmpassword; confirmpasswordvisible = true; passwordmatch; passwordminlength; passwordmaxlength; passreqspcl; passreqalpha; passreqno; passrequprcase; passreqlwrcase;
  public city; cityvisible;
  public lastname;
  public faxnumber;
  public mobilenumber;
  public telephonenumber;
  public tenant = "SVM";
  public i = 0;
  public countrydetails = [];
  public validationconstraints = [];
  public userdetails: userdetails_info;
  public userinfo = [];
  public userdetailsobject: CompleteModel;
  options = [];
  constructor(private maincomponent: MainComponent, private router: Router, private service: Service, private datepipe: DatePipe, private Ivdsservice: Ivdsservice) { }


  ngOnInit() {
    this.maincomponent.setsearchChild(this);
    this.maincomponent.setdialogChild(this);
    this.getcountrydetails();
    this.getconstraints();
    this.getuserdetails();
    this.dialog();
  }

  getconstraints() {
    this.Ivdsservice.getvalidationconstraints()
      .subscribe
      (response => {
        console.log(response);
        this.validationconstraints = response.rs.appsecuritysettings;
        console.log(this.validationconstraints);
        this.useridmaxlength = this.validationconstraints.filter(function (obj) { return obj.attribute == "usrmaxlen"; })[0].value;
        this.useridminlength = this.validationconstraints.filter(function (obj) { return obj.attribute == "usrminlen"; })[0].value;
        this.passwordmaxlength = this.validationconstraints.filter(function (obj) { return obj.attribute == "usrmaxlen"; })[0].value;
        this.passwordminlength = this.validationconstraints.filter(function (obj) { return obj.attribute == "usrminlen"; })[0].value;
        this.usereqalpha = this.validationconstraints.filter(function (obj) { return obj.attribute == "usrreqalpha"; })[0].value;
        this.usereqspecial = this.validationconstraints.filter(function (obj) { return obj.attribute == "usrreqspcl"; })[0].value;
        this.passreqno = this.validationconstraints.filter(function (obj) { return obj.attribute == "pwdreqnumber"; })[0].value;
        this.passreqspcl = this.validationconstraints.filter(function (obj) { return obj.attribute == "pwdreqspcl"; })[0].value;
        this.passreqlwrcase = this.validationconstraints.filter(function (obj) { return obj.attribute == "pwdreqlowercase"; })[0].value;
        this.passrequprcase = this.validationconstraints.filter(function (obj) { return obj.attribute == "pwdrequppercase"; })[0].value;
        this.passreqalpha = this.validationconstraints.filter(function (obj) { return obj.attribute == "pwdreqalpha"; })[0].value;
        console.log(this.useridmaxlength, this.useridminlength, this.passwordmaxlength, this.passwordminlength, this.usereqalpha, this.usereqspecial,
          this.passreqno, this.passreqspcl, this.passreqlwrcase, this.passrequprcase, this.passreqno, this.passreqalpha);
      },
      err => { console.log(err) });

  }
  getuserdetails() {
    var details = this.service.retrieveuserdetails();
    if (details == undefined) {
      this.router.navigate(['/main/userdetails/viewuser']);
    }
    var userdetails = (details[0].user);
    var processtype = details[0].type;
    this.service.storeuserdetails(undefined);
    if (processtype == "view") {
      $("input").attr("disabled", true);
      $('select').prop('disabled', true);
      $('textarea').prop('disabled', true);
      this.savebool = false;
      this.backbool = true;

    }
    if (processtype == "edit") {
      $("#userid input").attr("disabled", true);
      this.savebool = false;
      this.backbool = false;
      this.updatebool = true;

    }
    if (userdetails != undefined) {
      console.log(userdetails);
      this.passwordvisible = false;
      this.confirmpasswordvisible = false;
      this.userid = userdetails.loginname;
      this.country = userdetails.countrycode;
      this.preferredlanguage = userdetails.preferredlanguage;
      this.dateformat = userdetails.dateformat;
      this.city = userdetails.locationcode;
      this.address = userdetails.address;
      this.emailid = userdetails.email;
      this.faxnumber = userdetails.faxno;
      this.telephonenumber = userdetails.telphno;
      this.postalzipcode = userdetails.postalcode;
      this.firstname = userdetails.firstname;
      this.lastname = userdetails.lastname;
      this.mobilenumber = userdetails.mobileno;
      this.getcity(this.country);
    }
  }

  getcountrydetails() {
    this.Ivdsservice.getcountry()
      .subscribe
      (response => {
        console.log(response);
        this.countrydetails = response.rs['country details'];
        console.log(this.countrydetails[0]['countrydetails.countrycode']);
        console.log(this.countrydetails);
      },
      err => { console.log(err) });

  }

  getuserdetailsinfo() {
    this.Ivdsservice.getuserdetails()
      .subscribe
      (response => {
        console.log(response);
        if ((response.rs.userdetails_info).length != 0) {
          for (var i = 0; i < (response.rs.userdetails_info).length; i++) {
            this.userinfo[i] = response.rs.userdetails_info[i].loginname;
          }
          this.checkuseroccurance(this.userinfo);

        }

      },
      err => { console.log(err) });
  }

  getcity(value) {
    $('.autocomplete input').val("");
    this.options = [];
    var values = [
      {
        "field": "countryname",
        "value": value
      }
    ]
    if (this.country != undefined && this.country != "") {
      console.log(values);
      this.Ivdsservice.getcity(value)
        .subscribe
        (response => {
          console.log(response);
          var city = (response.rs.city);
          console.log(city);
          for (var i = 0; i < city.length; i++) {
            this.options.push({ "citydescription": city[i].citydescription, "cityname": city[i].cityname });
          }
          console.log(this.options[0].citydescription);
        },
        err => { console.log(err) });
    }
  }

  countryfieldcheck() {
    if (this.country == undefined || this.country == "") {
      this.dialogmodel.message = "Kindly choose country";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);
    }
  }

  checkuseroccurance(userinfo) {
    var userarray = userinfo;
    for (var i = 0; i < userarray.length; i++) {
      if (userarray[i] == this.userid) {
        console.log("same");
        this.userid = "";
        this.dialogmodel.message = "UserId already Exists";
        this.dialogmodel.value = null;
        this.maincomponent.invokedialog(this.dialogmodel);
        break;
      }
    }
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

  update() {
    var dbtype = "update";
    this.savevalidations(dbtype);
  }


  save() {
    var dbtype = "save";
    this.savevalidations(dbtype);
  }

  savevalidations(dbtype) {
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (this.userid == "") {
      this.userid = undefined;
    }
    if (this.address == "") {
      this.address = undefined;
    }
    if (this.city == "") {
      this.city = undefined;
    }
    if (this.confirmpassword == "") {
      this.confirmpassword = undefined;
    }
    if (this.password == "") {
      this.password = undefined;
    }
    if (this.firstname == "") {
      this.firstname = undefined;
    }
    if (this.lastname == "") {
      this.lastname = undefined;
    }
    if (this.country == "") {
      this.country = undefined;
    }
    if (this.emailid == "") {
      this.emailid = undefined;
    }
    if (this.telephonenumber == "") {
      this.telephonenumber = undefined;
    }
    if (this.mobilenumber == "") {
      this.mobilenumber = undefined;
    }
    if (this.faxnumber == "") {
      this.faxnumber = undefined;
    }
    if (this.postalzipcode == "") {
      this.postalzipcode = undefined;
    }
    if (this.preferredlanguage == "") {
      this.preferredlanguage = undefined;
    }
    if (this.userid == "" || this.userid == undefined) {
      this.dialogmodel.message = "Kindly Enter UserID";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);
    }
    else if (this.userid.length > this.useridmaxlength) {
      this.dialogmodel.message = "UserID length should not be greater than";

      this.dialogmodel.value = this.useridmaxlength;
      this.maincomponent.invokedialog(this.dialogmodel);
    }
    else if ((this.userid.length) < this.useridminlength) {
      this.dialogmodel.message = "UserID length should not be lesser than";

      this.dialogmodel.value = this.useridminlength
      this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (this.hasalpha(this.userid) != true && this.usereqalpha == "Y") {
      this.dialogmodel.message = "UserID should contain atleast one alphabet";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (this.hasspecial(this.userid) != true && this.passreqspcl == "Y") {
      this.dialogmodel.message = "UserID should contain atleast one special character";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (this.emailid == "" || this.emailid == undefined) {
      this.dialogmodel.message = "Kindly Enter EmailID";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if ((this.emailid != undefined && this.emailid != "") && (!this.emailid.match(pattern))) {
      this.dialogmodel.message = "Kindly Enter valid Email ID";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);


    }
    else if ((this.password == "" || this.password == undefined) && (dbtype != "update")) {
      this.dialogmodel.message = "Kindly Enter Password";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if ((dbtype != "update") && (this.password.length > this.passwordmaxlength)) {
      this.dialogmodel.message = "Password length should not be greater than";
      this.dialogmodel.value = this.passwordmaxlength;

      this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if ((dbtype != "update") && ((this.password.length) < this.passwordminlength)) {
      this.dialogmodel.message = "Password length should not be lesser than";
      this.dialogmodel.value = this.passwordminlength;
      this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (dbtype != "update" && (this.hasLowerCase(this.password) != true && this.passreqlwrcase == "Y")) {
      this.dialogmodel.value = null;
      this.dialogmodel.message = "Password should contain atleast one lowercase letter";
      this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (dbtype != "update" && (this.hasUpperCase(this.password) != true && this.passrequprcase == "Y")) {
      this.dialogmodel.message = "Password should contain atleast one uppercase letter";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);


    }
    else if (dbtype != "update" && (this.hasalpha(this.password) != true && this.passreqalpha == "Y")) {
      this.dialogmodel.message = "Password should contain atleast one alphabet";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);
    }
    else if (dbtype != "update" && (this.hasspecial(this.password) != true && this.passreqspcl == "Y")) {
      this.dialogmodel.message = "Password should contain atleast one special character";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);
    }
    else if (dbtype != "update" && (this.hasNumber(this.password) != true && this.passreqno == "Y")) {
      this.dialogmodel.message = "Password should contain atleast one numeric value";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);


    }
    else if ((dbtype != "update") && (this.confirmpassword == "" || this.confirmpassword == undefined)) {
      this.dialogmodel.message = "Kindly Enter ConfirmPassword";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);


    }
    else if ((dbtype != "update") && (this.password != this.confirmpassword)) {
      this.dialogmodel.message = "Password Does not Match";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);


    }
    else if (this.firstname == "" || this.firstname == undefined) {
      this.dialogmodel.message = "Kindly Enter FirstName";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (this.lastname == "" || this.lastname == undefined) {
      this.dialogmodel.message = "Kindly Enter LastName";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (this.country == "" || this.country == undefined) {
      this.dialogmodel.message = "Kindly Choose Country";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);


    }
    else if (this.city == "" || this.city == undefined) {
      this.dialogmodel.message = "Kindly Enter City";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (this.address == "" || this.address == undefined) {
      this.dialogmodel.message = "Kindly Enter Address";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (this.telephonenumber == null || this.telephonenumber == undefined) {
      this.dialogmodel.message = "Kindly Enter TelephoneNumber";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (this.postalzipcode == null || this.postalzipcode == undefined) {
      this.dialogmodel.message = "Kindly Enter Postalzipcode";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);


    }
    else if (this.mobilenumber == null || this.mobilenumber == undefined) {
      this.dialogmodel.message = "Kindly Enter MobileNumber";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);


    }

    else if (this.dateformat == "" || this.dateformat == undefined) {
      this.dialogmodel.message = "Kindly Choose DateFormat";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);


    }

    else if (this.faxnumber == null || this.faxnumber == undefined) {
      this.dialogmodel.message = "Kindly Enter FaxNumber";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);


    }
    else if (this.preferredlanguage == "" || this.preferredlanguage == undefined) {
      this.dialogmodel.message = "Kindly Choose Language";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);

    }
    else if (dbtype != "update") {
      if (this.userid != undefined && this.firstname != undefined && this.lastname != undefined && this.password != undefined && this.confirmpassword != undefined && this.country != undefined && this.city != undefined && this.emailid != undefined && this.telephonenumber != undefined && this.mobilenumber != undefined && this.faxnumber != undefined && this.preferredlanguage != undefined) {
        this.passwordencryption();
      }
    }
    else {
      if (this.userid != undefined && this.firstname != undefined && this.lastname != undefined && this.country != undefined && this.city != undefined && this.emailid != undefined && this.telephonenumber != undefined && this.mobilenumber != undefined && this.faxnumber != undefined && this.preferredlanguage != undefined) {
        this.updateuserdetails();
      }
    }
  }

  passwordencryption() {
    alert("password encryption");
    var object = { "passwordencryption": [{ "password": this.password }] }
    this.service.vdsencryptservice(object)
      .subscribe
      (response => {
        console.log(response);
        var encpass = (response.FUNRESPONSE.passwordencryption[0].password);
        this.saveuserdetails(encpass)
      },
      err => { console.log(err) });
  }


  saveuserdetails(encpass) {
    alert("inside save");
    this.userdetails = new userdetails_info();
    this.userdetailsobject = new CompleteModel();
    this.userdetails.loginname = this.userid;
    this.userdetails.password = encpass;
    this.userdetails.firstname = this.firstname;
    this.userdetails.lastname = this.lastname;
    this.userdetails.address = this.address;
    this.userdetails.countrycode = this.country;
    this.userdetails.dateformat = this.dateformat;
    this.userdetails.email = this.emailid;
    this.userdetails.faxno = this.faxnumber.toString();
    this.userdetails.mobileno = this.mobilenumber.toString();
    this.userdetails.postalcode = this.postalzipcode;
    this.userdetails.telphno = this.telephonenumber.toString();
    this.userdetails.locationcode = this.city.toString();
    this.userdetails.preferredlanguage = this.preferredlanguage;
    this.userdetails.authmode = "I";
    this.userdetails.authprofile = "";
    this.userdetails.cr_user = "System";
    this.userdetails.cr_date = this.datepipe.transform(new Date(), "yyyy-MM-dd hh:mm:ss")
    this.userdetails.chg_user = "System";
    this.userdetails.chg_date = this.datepipe.transform(new Date(), "yyyy-MM-dd hh:mm:ss");
    this.userdetails.lastpwdup = this.datepipe.transform(new Date(), "yyyy-MM-dd hh:mm:ss");
    console.log(JSON.stringify(this.userdetails));
    this.userdetailsobject.userdetails_info.push(this.userdetails);
    console.log(JSON.stringify(this.userdetailsobject));
    var values = this.userdetailsobject;
    console.log(values);
    console.log(JSON.stringify(values));
    this.Ivdsservice.setuserdetails(this.userdetailsobject)
      .subscribe
      (response => {
        console.log(response);
        if (response.status == 200) {
          this.dialogmodel.message = "saved sucessfully";
          this.dialogmodel.value = null;
          this.maincomponent.invokedialog(this.dialogmodel);

          this.router.navigate(['/dashboard/userdetails/viewuser']);
        }
      },
      err => { console.log(err) });

  }

  updateuserdetails() {
    this.userdetails = new userdetails_info();
    this.userdetailsobject = new CompleteModel();
    this.userdetails.firstname = this.firstname;
    this.userdetails.address = this.address;
    this.userdetails.loginname = this.userid;
    this.userdetails.telphno = this.telephonenumber.toString();
    this.userdetails.countrycode = this.country;
    this.userdetails.mobileno = this.mobilenumber.toString();
    this.userdetails.lastname = this.lastname;
    this.userdetails.locationcode = this.city.toString();
    this.userdetails.faxno = this.faxnumber.toString();
    this.userdetails.postalcode = this.postalzipcode;
    this.userdetails.preferredlanguage = this.preferredlanguage;
    this.userdetails.email = this.emailid;
    this.userdetails.dateformat = this.dateformat;
    console.log(JSON.stringify(this.userdetails));
    this.userdetailsobject.userdetails_info.push(this.userdetails);
    console.log(JSON.stringify(this.userdetailsobject));
    var values = this.userdetailsobject;
    console.log(values);
    console.log(JSON.stringify(values));
    this.Ivdsservice.updateuserdetails(this.userdetailsobject)
      .subscribe
      (response => {
        console.log(response);
        if (response.status == 200) {
          this.dialogmodel.message = "updated sucessfully";
          this.dialogmodel.value = null;
          this.maincomponent.invokedialog(this.dialogmodel);

          this.router.navigate(['/dashboard/userdetails/viewuser']);
        }
      },
      err => { console.log(err) });
      }

  back() {
    this.router.navigate(['/main/userdetails/viewuser']);
  }

  /**********dialog***************** */
  dialog() {
    this.dialogmodel = new DialogModel();
    this.dialogmodel.dialogtype = "alert";
    this.dialogmodel.screenname = this.screenname;
    this.dialogmodel.value = null;
  }

  getdialogresult(result) {

  }
  /*************************** */

  /******************search************ */
  setTwocolSearchresult(result){}
  setMulticolSearchresult(result){}
  setJdlgSearchresult(result){

  }

  /************************/

}
