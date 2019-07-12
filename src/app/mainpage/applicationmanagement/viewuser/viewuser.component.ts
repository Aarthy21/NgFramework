import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {Service} from '../../../service';
import { DatePipe } from '@angular/common';
import {ApplicationComponent } from '../application.component';
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
  public userdetailsappinfo;
  public type;
  constructor( private applicationcomponent:ApplicationComponent,private maincomponent: MainComponent, private datepipe: DatePipe, private Ivdsservice: Ivdsservice,private service:Service,private router:Router) {

  }
  ngOnInit() {
   this.getuserdetailsappinfo();
  }

  getuserdetailsappinfo(){
  this.Ivdsservice.getuserdetailsappinfo()
      .subscribe
      (response => {
        console.log(response);
        this.userdetailsappinfo=response.rs.userdetails_app;      
        if(this.userdetailsappinfo.length==0){
          this.applicationcomponent.disabled=false;
        }
        else{
           this.applicationcomponent.disabled=true;         
        }
        this.filteredItems = this.userdetailsappinfo;
        this.init();           
      },
      err => { console.log(err) });
  }

  view_user(item){
   this.type="view";
   var systemprocess=[{"system":item,"type":this.type}];
   this.service.storesystemdetails(systemprocess);
   this.router.navigate(['/main/applicationmng/systemdetails']); 
   this.applicationcomponent.uldisabled=true;
  }

   edit_user(item){
   this.type="edit";
   var systemprocess=[{"user":item,"type":this.type}];
   this.service.storesystemdetails(systemprocess);
   this.router.navigate(['/main/applicationmng/systemdetails']);
   this.applicationcomponent.uldisabled=true;
  }
  create_user(){  
    this.type="create";
  var systemprocess=[{"user":undefined,"type":this.type}];
   this.service.storesystemdetails(systemprocess);
    this.router.navigate(['/main/applicationmng/systemdetails']);
  
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