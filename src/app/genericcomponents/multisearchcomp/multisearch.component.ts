import { Service } from '../../service';
import { Component, EventEmitter, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { MultiSearchResult } from '../../datamodel/multisearchcomp/multisearchresult';
declare var $: any;
@Component({
  selector: 'multisearch',//defined in app.component.html
  templateUrl: './multisearch.component.html',
  styleUrls: ['./multisearch.component.css']
})
export class MultiSearchComponent implements OnInit {
  // @Input() searchid: any;
  @Input() id: any;
  @Output() onselect: EventEmitter<MultiSearchResult> = new EventEmitter<MultiSearchResult>();
  @Output() afterselect: EventEmitter<any> = new EventEmitter<any>();
  multisearchresult: MultiSearchResult;
  showresult: boolean = false;
  public selectarray=[]; 
  public dialogdata = [];
  public metadata = [];
  public targetid: String;
  public selectid;
  public searchid;
  public arr = []; resultarr = [];multisearcharr=[];
  public selectsearchid: string;
  public array = [];
  public targetsearchid; mainarr = [];
  public keyvaluearray = [];
  public title;
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
constructor(private service: Service) {

  }
  ngOnInit() {
    console.log("inside search component");
  
    console.log(this.id);
    this.modalfunctions();
    console.log(this.service.getitemdetails());
  }
  
  getmodaldata(searchid, targetid) {
    $('#progress').addClass('is-visible');
    this.targetid = targetid;
    this.searchid=searchid;
    this.service.getMulticolsearch(searchid)
      .subscribe
      (response => {
        $('#progress').removeClass('is-visible');
        this.array = response.metadata.Title.split(',');
        this.dialogdata = response.data;
        this.title = response.metadata.WindowTitle;
        this.resultarr = [];
        this.mainarr = [];
        var temparr = [];
        this.arr = this.service.getitemdetails();
        if (this.arr == undefined) {
          for (var i = 0; i < this.dialogdata.length; i++) {
            this.resultarr = [];
            for (var j = 0; j < this.array.length; j++) {
              this.resultarr.push(this.dialogdata[i][j]);
            }
            this.mainarr.push(this.resultarr);
          }
        
        }
        else {
          for (var i = 0; i < this.dialogdata.length; i++) {
            this.resultarr = [];
            for (var j = 0; j < this.array.length; j++) {
            
              this.resultarr.push(this.dialogdata[i][j]);
        
            }
            temparr.push({ "code": this.resultarr[0], "name": this.resultarr[1] });            
          }
    
            var filtered = temparr.filter((item) =>{
              return this.arr.indexOf(item.code) == -1;
            });
                     
            for(var j=0;j<filtered.length;j++){
              this.resultarr=[];
              this.resultarr[0]=filtered[j].code;
              this.resultarr[1]=filtered[j].name;  
              this.resultarr['ischecked']=false;         
              this.mainarr.push(this.resultarr);            
            }
            
          
          
        }
        this.filteredItems = this.mainarr;
        this.init();
        $('#multisearch').modal('show');
      },
      err => { console.log(err) });
 }

 
  
  
  tdclick(event, i, item) {    
    var index;
    if (item.ischecked) {
      item.ischecked = false;
      // this.datastore.console(this.keyvaluearray);
      for (var j = 0; j < this.keyvaluearray.length; j++) {
        if (this.keyvaluearray[j] == item[0]) {
          index = j;
        }
      }
      // this.datastore.console(index);
      if (index > -1) {
        this.keyvaluearray.splice(index, 1);
      }
    }
    else {
      item.ischecked = true;
      this.keyvaluearray.push(item[0])
    } 
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
  
    this.init();
  }

  

  modalfunctions() {
    $(".modal").on('show.bs.modal', (e) => {
      $("#myTable thead tr th").find('i').css("color", "white");
      $('#selectall').click(function (e) {
        $(this).closest('table').find('td input:checkbox').prop('checked', $(this).prop('checked'));
      });
    });
   $(".modal").on('hide.bs.modal', (e) => {
        this.mainarr= [];
        this.keyvaluearray = [];
        $('#selectall').prop('checked', false);
        $('#myTable input').val('');
      });
  }


  selectall(event) {
    var index;
    $(event.target).find('input:checkbox').trigger('click');
     var boolean=($('#selectall').prop('checked'));
     console.log(this.items);
      for (var i = 0; i < this.items.length; i++) {      
      if (boolean) {
        this.items[i].ischecked = true;
        this.keyvaluearray.push(this.items[i][0]);
      }
      else {
        this.items[i].ischecked = false;
        for (var j = 0; j < this.keyvaluearray.length; j++) {
          if (this.keyvaluearray[j] == this.items[i][0]) {
            index = j;
          }
        }
        console.log(index);
        if (index > -1) {
          this.keyvaluearray.splice(index, 1);
        }
      }
    }      
  }

  removeselectoptions(){
    
  }


   addselectoptions() {
    this.selectarray = [];
    this.keyvaluearray = this.keyvaluearray.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });
    
    for (var j = 0; j < this.keyvaluearray.length; j++) {
      var index = this.mainarr.findIndex(x => x[0] == (this.keyvaluearray[j]));
      console.log(index);
      this.selectarray.push(this.mainarr[index]);
    }
    this.keyvaluearray = [];
    console.log(this.selectarray);
    this.multisearchresult = new MultiSearchResult();
    this.multisearchresult.id = this.selectsearchid
    this.multisearchresult.searchid = this.searchid;
    this.multisearchresult.data=this.selectarray;
    this.multisearchresult.columncount=this.array.length;   
    this.onselect.emit(this.multisearchresult);
  }
/***********pagination******/
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


