import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {Service} from '../../../service';
import { DatePipe } from '@angular/common';
import {UserDetailsComponent } from '../userdetails.component';
import { MainComponent } from "../../main.component";
import { Ivdsservice } from '../../../vds/Ivdsservice';


@Component({
  selector: 'viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewUserComponent implements OnInit {
  /***pagination */
 
  filteredItems;
  pages; 
  pageSize: number = 10; 
  pageNumber: number = 0; 
  currentIndex: number = 1;  
  paginationtype; 
  items; items1;
  pagesIndex: Array<number>; 
  pageStart: number = 1;
  public userdetailsinfo;
  public type;
  constructor( private userdetailscomponent:UserDetailsComponent,private maincomponent: MainComponent, private datepipe: DatePipe, private Ivdsservice: Ivdsservice,private service:Service,private router:Router) {

  }
  ngOnInit() {
   this.getuserdetailsinfo();
  }

  getuserdetailsinfo(){
  this.Ivdsservice.getuserdetails()
      .subscribe
      (response => {
        console.log(response);
        this.userdetailsinfo=response.rs.userdetails_info;      
        if(this.userdetailsinfo.length==0){
          this.userdetailscomponent.disabled=false;
        }
        else{
           this.userdetailscomponent.disabled=true;
        }
         this.filteredItems = this.userdetailsinfo;
        this.init();    
      },
      err => { console.log(err) });
  }

  view_user(item){
   this.type="view";
   var userprocess=[{"user":item,"type":this.type}];
   this.service.storeuserdetails(userprocess);
   this.router.navigate(['/main/userdetails/createuser']); 
   this.userdetailscomponent.uldisabled=true;
  }

   edit_user(item){
   this.type="edit";
   var userprocess=[{"user":item,"type":this.type}];
   this.service.storeuserdetails(userprocess);
   this.router.navigate(['/main/userdetails/createuser']);
   this.userdetailscomponent.uldisabled=true;
  }
  create_user(){  
    this.type="create";
  var userprocess=[{"user":undefined,"type":this.type}];
   this.service.storeuserdetails(userprocess);
    this.router.navigate(['/main/userdetails/createuser']);
  
  }
  Password_reset(){
    this.router.navigate(['/main/ChangePassword']);
  } 


   refresh(value) {
    this.init();
  }

   setPage(index: number) {
    this.currentIndex = index;
    this.refreshItems();
  }

  nextPage() {
    if (this.currentIndex < this.pageNumber) {
      this.currentIndex++;
    }
    if (this.currentIndex >= (this.pageStart + this.pages)) {
      this.pageStart = this.currentIndex - this.pages + 1;
    }
    this.refreshItems();
  }

   prevPage() {
    if (this.currentIndex > 1) {
      this.currentIndex--;
    }
    if (this.currentIndex < this.pageStart) {
      this.pageStart = this.currentIndex;
    }
    this.refreshItems();
  }

   refreshItems() {
    this.items = this.filteredItems.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
    this.pagesIndex = this.fillArray();
  }
   fillArray(): any {
    var obj = new Array();
    for (var index = this.pageStart; index < this.pageStart + this.pages; index++) {
      obj.push(index);
    }
    return obj;
  }

 init() {
    this.currentIndex = 1;
    this.pageStart = 1;
    this.pages = 5;
    this.pageNumber = parseInt("" + (this.filteredItems.length / this.pageSize));
    if (this.filteredItems.length % this.pageSize != 0) {
      this.pageNumber++;
    }
    if (this.pageNumber < this.pages) {
      this.pages = this.pageNumber;
    }
    this.refreshItems(); 
  }


}