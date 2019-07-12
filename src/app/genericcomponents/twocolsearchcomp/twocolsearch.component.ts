
import { Service } from '../../service';
import { Component, EventEmitter, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { SearchResult } from '../../datamodel/searchcomp/searchresult';
declare var $: any;
@Component({
  selector: 'twocolsearch',//defined in app.component.html
  templateUrl: './twocolsearch.component.html',
  styleUrls: ['./twocolsearch.component.css']
})
export class TwocolSearchComponent implements OnInit {
  // @Input() searchid: any;
  @Input() id: any;
  @Output() onselect: EventEmitter<SearchResult> = new EventEmitter<SearchResult>();
  @Output() afterselect: EventEmitter<any> = new EventEmitter<any>();
  searchresult: SearchResult;
  public dialogdata = [];dialogarray=[];
  public metadata = [];
  public targetid: String;
  public selectid;
  public searchid;
  public selectsearchid: string;
  public array = []; mainarr = [];
  public targetsearchid;
  public title; resultarr = []; arr = [];
  public indexvalue;
  /** pagination*/
  pages;
  filteredItems;
  items;
  pageSize: number = 10;
  pageNumber: number = 0;
  currentIndex: number = 1;
  pagesIndex: Array<number>;
  pageStart: number = 1;
  /** */

  constructor(private service: Service) {//to call service

  }
  ngOnInit() {
    console.log("inside search component");
    console.log(this.searchid);
    console.log(this.id);
    this.modalfunctions();
  }
  ngAfterViewInit() { }



  getmodaldata(searchid, targetid) {   
    $('#progress').addClass('is-visible');
    this.targetid = targetid;
    this.searchid = searchid;
    console.log(this.targetid);
    console.log(this.targetid, searchid);
    this.service.getTwocolsearch(searchid)
      .subscribe
      (response => {
        console.log(response);
        $('#progress').removeClass('is-visible');
        this.array = response.metadata.Title.split(',');
        this.dialogdata = response.data;
        this.title = response.metadata.WindowTitle;
        console.log(this.title);
        console.log(this.dialogdata);
        this.resultarr = [];
        this.mainarr = [];
        var temparr = [];
        this.arr = this.service.getitemdetails();
        if (this.arr == undefined) {
          for (var i = 0; i < this.dialogdata.length; i++) {
            this.resultarr = [];
            for (var j = 0; j < this.array.length; j++) {
              console.log("dialog" + this.dialogdata[i][j]);
              this.resultarr.push(this.dialogdata[i][j]);
              console.log(this.resultarr);
            }
            this.mainarr.push(this.resultarr);
          }
        }
        else {
          for (var i = 0; i < this.dialogdata.length; i++) {
            this.resultarr = [];
            for (var j = 0; j < this.array.length; j++) {
              console.log("dialog" + this.dialogdata[i][j]);
              this.resultarr.push(this.dialogdata[i][j]);
              console.log(this.resultarr);
            }
            temparr.push({ "code": this.resultarr[0], "name": this.resultarr[1] });
          }
          console.log(temparr, this.arr);
          var filtered = temparr.filter((item) => {
            console.log(this.arr);
            console.log(this.arr.indexOf(item.code) == -1);
            return this.arr.indexOf(item.code) == -1;
          });

          for (var j = 0; j < filtered.length; j++) {
            this.resultarr = [];
            this.resultarr[0] = filtered[j].code;
            this.resultarr[1] = filtered[j].name;
            this.mainarr.push(this.resultarr);
          }
        }
        console.log(this.mainarr);
        this.filteredItems = this.mainarr;
        this.init();

        $('#smsearch').modal('show');
      },
      err => { console.log(err) });
  }


  myFunction(i, data) {   
    $('#fbody tr:nth-child('+(i+1)+')').css('background-color', 'yellow');  
    // if (confirm("Do You Want To Continue?") == true) {
      $('#smsearch').modal('hide');
      this.getindexvalue( data);
    // }
 
  }

  addselectoptions() {

  }



  getindexvalue( data) {    
    console.log(data);  
    for(var i=0;i<this.dialogdata.length;i++){
      if(this.dialogdata[i][0]==data[0]){
      this.indexvalue=i;
      break;
      }
    }    
    this.searchresult = new SearchResult();
    this.searchresult.id = this.targetid;
    console.log(this.selectid);
    this.searchresult.data = this.dialogdata[this.indexvalue];
    this.searchresult.columncount = this.array.length;
    this.searchresult.searchid = this.searchid;
    console.log(this.searchresult);
    this.onselect.emit(this.searchresult);
  }


  searchdialog(event, i) {    
    var input, filter;
    this.filteredItems = [];
    var filterid = event.target.id
    filter = $("#" + filterid).val();

    if (filter != "") {
      this.mainarr.forEach(element => {
        if (element[i] != null) {
          if (element[i].toUpperCase().indexOf(filter.toUpperCase()) >= 0) {
            this.filteredItems.push(element);
          }
        }
      });
    } else {
      this.filteredItems = this.mainarr;
    }
    console.log(this.filteredItems);
    this.init();
  }

  getModal(getsearchid) {
    this.targetsearchid = getsearchid;
    console.log(this.targetsearchid);
  }

  modalfunctions() {
    $(".modal").on('hide.bs.modal', (e) => {
      $('#myTable input').val('');
      //this.afterselect.emit(false);
    });
  }


  /*****pagination */

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
    //this.datastore.console("this.pageNumber :  " + this.pageNumber);
  }

  fillArray(): any {
    var obj = new Array();
    for (var index = this.pageStart; index < this.pageStart + this.pages; index++) {
      obj.push(index);
    }
    return obj;
  }


  refreshItems() {
    this.items = this.filteredItems.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
    this.pagesIndex = this.fillArray();
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


  nextPage() {
    if (this.currentIndex < this.pageNumber) {
      this.currentIndex++;
    }
    if (this.currentIndex >= (this.pageStart + this.pages)) {
      this.pageStart = this.currentIndex - this.pages + 1;
    }
    this.refreshItems();
  }

  setPage(index: number) {
    // this.headcheck=false;
    $('#myTable thead tr:nth-child(2) th:first').find('input:checkbox').prop('checked', false);
    this.currentIndex = index;
    this.refreshItems();
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].ischecked != true) {
        var success = false;
        break;
      }
      var success = true;
    }
    if (success == true) {
      $('#selectall').prop('checked', true);

    }


  }

  refresh(value) {
    this.init();
  }
}




