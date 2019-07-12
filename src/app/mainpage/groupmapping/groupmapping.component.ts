import { Component, OnInit } from '@angular/core';
import { MainComponent } from "../../mainpage/main.component";
import { Service } from '../../service';
import { Router } from '@angular/router';
import { DialogModel } from '../../datamodel/smdialog/dialogmodel';
import { SearchInterface } from '../../Interface/searchinterface';
import { DialogInterface } from '../../Interface/dialoginterface';
import { Ivdsservice } from '../../vds/Ivdsservice';
import { UserGroupDetailarray } from '../../datamodel/groupmapping/usergroupdetailarray';
import { UserGroupdetails } from '../../datamodel/groupmapping/usergroupdetails';
import { DatePipe } from '@angular/common';
import { MultiSearchResult } from '../../datamodel/multisearchcomp/multisearchresult';
declare var $: any;

@Component({
  selector: 'groupmapping',
  templateUrl: './groupmapping.component.html',
  styleUrls: ['./groupmapping.component.css'],
})
export class GroupmappingComponent implements OnInit, SearchInterface, DialogInterface {
  public screenname = "Group Mapping";
  public i;
  public dialogmodel: DialogModel;
  public usergroupdetails: UserGroupdetails;
  public usergroupdetailarray: UserGroupDetailarray;
  public global1 = false; agency1 = false; region1 = false; user1 = true;
  public global2 = false; agency2 = false; region2 = false; user2 = true;
  public addbutton = true; removebutton = true;
  public new1 = true; save = true; delete = true; edit = true; search = false; refresh = true; upload = true; print = true; movetofirst = true; movetoprevious = true; movetolast = true; movetonext = true; autosave = true; addDisabled = true; removeDisabled = true;
  public grouptype; usergroupinfo = [];
  public searchid = 2002;
  public addid;
  public groupcode: any;
  public code;
  public name;
  public usertype=[]; public agencytype=[];public regiontype=[];public globaltype=[];
  public modalData: any;
  public groupname: any;
  public id; result;
  public direction: number;
  public isDesc: boolean = false;
  public column: string;
  public colsearch;
  public selectedRow: any;
  public setClickedRow: Function;
  public arr;
  constructor(private service: Service, private maincomponent: MainComponent, private Ivdsservice: Ivdsservice, private datepipe: DatePipe) { }
  ngOnInit() {
    this.maincomponent.setdialogChild(this);
    this.maincomponent.setsearchChild(this);
    this.dialog();
    $('#globalbutton').removeClass('rmvopacity');
    $('#regionbutton').removeClass('rmvopacity');
    $('#agencybutton').removeClass('rmvopacity');
    $('#userbutton').removeClass('rmvopacity');
    this.setClickedRow = function (index) {
      this.selectedRow = index;
      $('#add,#remove').addClass('subgroup');
    }
  }
  deleteitems() {
    this.dialogmodel.dialogtype = "confirm";
    this.dialogmodel.message = "Are you sure you want to remove selected Row(s) ?";
    this.dialogmodel.target = "deleteitems";
    this.maincomponent.invokedialog(this.dialogmodel);

  }
  // searchbtn(event) {
  //   this.addbutton=false;
  //   this.removebutton=false;
  //   this.usertype=[];
  //   this.edit = false;
  //   var targetid = event.target.id;
  //   this.maincomponent.invoketwocolsearch(this.searchid, targetid);
  //   console.log(event.target.id);
  //   $('#addbutton').removeClass('rmvopacity');
  //   $('#removebutton').removeClass('rmvopacity');
  // }
  searchbtn(event) {
      this.addbutton=false;
      this.removebutton=false;
      this.usertype=[];
      this.edit = false;
      var targetid = event.target.id;
      this.maincomponent.invokejdlgsearch(this.searchid, targetid);
      console.log(event.target.id);
      $('#addbutton').removeClass('rmvopacity');
      $('#removebutton').removeClass('rmvopacity');
    }
  editbtn() {
    this.addbutton=true;
    this.removebutton=true;
    this.search = true;
    this.edit = true;
    this.save = false;
    this.refresh = false;
    $('#addbutton').prop('disabled', false);
    $('#removebutton').prop('disabled', false);
    $('#addbutton').addClass('rmvopacity');
    $('#removebutton').addClass('rmvopacity');
  }
  cancelbtn() {
    //alert("cancel");
    this.groupcode='';
    this.groupname='';
    this.usertype=[];
    this.search = false;
    this.edit = true;
    this.save = true;
    this.refresh = true;
    $('#addbutton').removeClass('rmvopacity');
    $('#removebutton').removeClass('rmvopacity');

  }
  addbtn(event) {
    console.log(this.usertype);
    this.arr = [];
    if (this.usertype.length != 0) {
      this.usertype.forEach((item) => {
        this.arr.push(item.code);
      });
    }
    this.service.setitemdetails(this.arr);
    var targetid = event.target.id;
    console.log(event.target.id);
    console.log(this.grouptype);
    if (this.grouptype == "T") {
      this.addid = 1001;
      console.log(this.addid);
    } else if (this.grouptype == "U") {
      this.addid = 1000;

      console.log(this.addid);
    } else if (this.grouptype == "A") {
      this.addid = 1002;
      console.log(this.addid);
    }
    else if (this.grouptype == "R") {
      this.addid = 1003;
      console.log(this.addid);
    }
    var targetid = event.target.id;
    this.maincomponent.invokemulticolsearch(this.addid, targetid);
    console.log(event.target.id);
  }

  getusertype() {
    this.usertype=[];
    this.Ivdsservice.getusertype(this.groupcode, "A","U")
      .subscribe
      (response => {
        this.arr = [];
        console.log(response);
        this.usertype = response.rs.usergroupdetail;
        console.log(this.usertype);
        this.usertype.forEach((item) => {
          this.arr.push(item.code);
        });
        this.service.setitemdetails(this.arr);


      },
      err => { console.log(err) });
  }
  getagencytype() {
    this.usertype=[];
    this.Ivdsservice.getagencytype(this.groupcode, "A","A")
      .subscribe
      (response => {
        this.arr = [];
        console.log(response);
        this.usertype = response.rs.usergroupdetail;
        console.log(this.usertype);
        this.usertype.forEach((item) => {
          this.arr.push(item.code);
        });
        this.service.setitemdetails(this.arr);
      },
      err => { console.log(err) });
  }
  getregiontype() {
    this.usertype=this.groupcode;
    this.Ivdsservice.getregiontype(this.groupcode, "A","R")
      .subscribe
      (response => {
        this.arr = [];
        console.log(response);
        this.usertype = response.rs.usergroupdetail;
        console.log(this.usertype);
        this.usertype.forEach((item) => {
          this.arr.push(item.code);
        });
        this.service.setitemdetails(this.arr);
      },
      err => { console.log(err) });
  }
  
  getglobaltype() {
    this.usertype=[];
    this.Ivdsservice.getglobaltype(this.groupcode, "A","T")
      .subscribe
      (response => {
        this.arr = [];
        console.log(response);
        this.usertype = response.rs.usergroupdetail;
        console.log(this.usertype);
        this.usertype.forEach((item) => {
          this.arr.push(item.code);
        });
        this.service.setitemdetails(this.arr);
      },
      err => { console.log(err) });
  }

  sort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
    this.usertype.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });

  }

  searchdialog(event) {
    var id = event.target.id;
    if (id == "code") {
      var j = 0;
    }
    else if (id == "name") {
      j = 1;
    }
    else if (id = "userupdated") {
      j = 2
    }
    else if (id = "updated") {
      j = 3
    }
    var filter = $('#' + id).val();
    console.log("filter" + filter)
    var table = document.getElementById("grouptable");
    var tr = table.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
      var td = tr[i].getElementsByTagName("td")[j];
      console.log(td);
      if (td) {

        if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  savemethod() {
    $('#addbutton').removeClass('rmvopacity');
    $('#removebutton').removeClass('rmvopacity');
    this.update();
  }
  update() {
    this.search = false;
    this.edit = false;
    this.save = true;
    this.refresh = true;
    var obj = {
      "usergroupdetail": [
        {
          "grpcode": this.groupcode,
        
        }
      ]
    }
    this.usergroupdetailarray = new UserGroupDetailarray();
    for (var j = 0; j < this.usertype.length; j++) {
      this.usergroupdetails = new UserGroupdetails();
      this.usergroupdetails.grpcode = this.usertype[j].grpcode;
      this.usergroupdetails.code = this.usertype[j].code;
      this.usergroupdetails.grptype =  this.usertype[j].grptype;
      console.log(  this.usertype[j].grptype);
      this.usergroupdetails.datecr = this.datepipe.transform(new Date(), "yyyy-MM-dd hh:mm:ss");
      this.usergroupdetails.dateup = this.datepipe.transform(new Date(), "yyyy-MM-dd hh:mm:ss");
      this.usergroupdetails.usercr = "Superuser";
      this.usergroupdetails.userup = "superuser";
      this.usergroupdetails.status = "A";
      this.usergroupdetails.adminby = this.usertype[j].adminby;
      console.log(JSON.stringify(this.usergroupdetailarray));
      console.log(this.usergroupdetails);
      this.usergroupdetailarray.usergroupdetail.push(this.usergroupdetails);
    }
    console.log(this.usergroupdetailarray);
    this.Ivdsservice.getusergroupdetailinfo(this.usergroupdetailarray)
      .subscribe
      (response => {
        console.log(response);
        if (response.status == 200) {
          this.dialogmodel.dialogtype = "alert";
          this.dialogmodel.message = "Group Mapping updated";
          this.dialogmodel.value = null;
          this.maincomponent.invokedialog(this.dialogmodel);
        }
      },
      err => { console.log(err) });
  }
 
/******dialog **********/
  dialog() {
    this.dialogmodel = new DialogModel();
    this.dialogmodel.dialogtype = "alert";
    this.dialogmodel.screenname = this.screenname;
    this.dialogmodel.value = null;
  }
  getdialogresult(result) {
    if (result.result == "yes" && result.target == "deleteitems") {
      console.log(this.selectedRow);
      this.usertype.splice(this.selectedRow, 1);
      
    }
  }

 /*****search**************/

  setMulticolSearchresult(result: any) {
    console.log(result);
    var data = result.data;
    console.log(data);
    console.log(result.id);
    var grpcode = this.groupcode;
    var grptype=this.grouptype;
    var usercr="-";
    var datecr="-";
    for (var i = 0; i < data.length; i++) {
      this.usertype.push({ grpcode,grptype,"code": data[i][0], "name": data[i][1], usercr,datecr,"adminby": "dxbadmin"})
    }
    console.log(this.usertype);
  }
  setTwocolSearchresult(result: any) {
    console.log(result);
    var data = result.data;
    console.log(data);
    console.log(result.id);
    if (result.searchid == 2002) {
      this.groupcode = (data[0]);
      console.log(this.groupcode);
      this.groupname = (data[1]);
      console.log(this.groupname);
      if (data[2] == "U") {
        this.addbutton=true;
        this.removebutton=true;
        this.edit = false;
        this.grouptype = "U";
        this.usertype = [];
        $('#userbutton').addClass('addcolor');
        $('#agencybutton').removeClass('addcolor');
        $('#regionbutton').removeClass('addcolor');
        $('#globalbutton').removeClass('addcolor');
        this.user1 = true;
        this.user2 = true;
        this.agency1 = false;
        this.agency2 = false;
        this.region1 = false;
        this.region2 = false;
        this.global1 = false;
        this.global2 = false;
        this.getusertype();
      } else if (data[2] == "A") {
        this.addbutton=true;
        this.removebutton=true;
        this.grouptype = "A";
        this.agencytype = [];
        $('#agencybutton').addClass('addcolor')
        $('#userbutton').removeClass('addcolor');
        $('#regionbutton').removeClass('addcolor');
        $('#globalbutton').removeClass('addcolor');
        this.agency1 = true;
        this.agency2 = true;
        this.region1 = false;
        this.region2 = false;
        this.global1 = false;
        this.global2 = false;
        this.user1 = false;
        this.user2 = false;
        this.getagencytype();
      } else if (data[2] == "R") {
        this.addbutton=true;
        this.removebutton=true;
        this.grouptype = "R";
        this.usertype = [];
        $('#regionbutton').addClass('addcolor');
        $('#userbutton').removeClass('addcolor');
        $('#agencybutton').removeClass('addcolor');
        $('#globalbutton').removeClass('addcolor');
        this.region1 = true;
        this.region2 = true;
        this.agency1 = false;
        this.agency2 = false;
        this.global1 = false;
        this.global2 = false;
        this.user1 = false;
        this.user2 = false;
        this.getregiontype();
      } else if (data[2] == "T") {
        this.addbutton=true;
        this.removebutton=true;
        this.grouptype = "T";
        this.usertype = [];
        $('#globalbutton').addClass('addcolor');
        $('#userbutton').removeClass('addcolor');
        $('#agencybutton').removeClass('addcolor');
        $('#regionbutton').removeClass('addcolor');
        this.global1 = true;
        this.global2 = true;
        this.region1 = false;
        this.region2 = false;
        this.user1 = false;
        this.user2 = false;
        this.agency1 = false;
        this.agency2 = false;
        this.getglobaltype();
      }
    }
  }
  setJdlgSearchresult(data:any){
    
  }

}