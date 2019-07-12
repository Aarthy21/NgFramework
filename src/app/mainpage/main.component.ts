import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResult } from "../datamodel/searchcomp/searchresult";
import { TwocolSearchComponent } from "../genericcomponents/twocolsearchcomp/twocolsearch.component";
import { MultiSearchComponent } from "../genericcomponents/multisearchcomp/multisearch.component";
import { JdlgSearchComponent } from "../genericcomponents/jdlgsearchcomp/jdlgsearch.component";
import { SearchInterface } from '../Interface/searchinterface';
import { DialogInterface } from '../Interface/dialoginterface';
import { SMDialogComponent } from "../genericcomponents/smdialog/smdialog.component";
@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @ViewChild(TwocolSearchComponent) twocolsearchcomponent: TwocolSearchComponent;
  @ViewChild(MultiSearchComponent) multisearchcomponent: MultiSearchComponent;
  @ViewChild(JdlgSearchComponent) jdlgsearchcomponent: JdlgSearchComponent;
  @ViewChild(SMDialogComponent) smdialogcomponent: SMDialogComponent;
  constructor(private router: Router) { }  
  title = 'app';
  public presentsearchchild: SearchInterface;
  public presentdialogchild: DialogInterface;
  invokedialog(dialogmodel) {
    console.log("dashboard>>>>")
    this.smdialogcomponent.invokedialog(dialogmodel);
  }
  invoketwocolsearch(searchid, targetid) {
    console.log(searchid, targetid);
    this.twocolsearchcomponent.getmodaldata(searchid, targetid);
  }
   invokemulticolsearch(searchid, targetid) {
    console.log(searchid, targetid);
    this.multisearchcomponent.getmodaldata(searchid, targetid);
  }
  invokejdlgsearch(searchid, targetid) {
    console.log(searchid, targetid);
    this.jdlgsearchcomponent.getmodaldata(searchid, targetid);
  }
  setsearchChild(presentChild: SearchInterface) {
    this.presentsearchchild = presentChild;
  }
  setdialogChild(presentChild: DialogInterface) {
    this.presentdialogchild = presentChild;
  }
  getdialogvalues(result) {
    console.log(result);
    this.presentdialogchild.getdialogresult(result);
  }
  gettwocolsearchvalues(result) {
    console.log(result);
    this.presentsearchchild.setTwocolSearchresult(result);
  }
  getmulticolsearchvalues(result) {
    console.log(result);
    this.presentsearchchild.setMulticolSearchresult(result);
  }
  getjdlgsearchvalues(result) {
    console.log(result);
    this.presentsearchchild.setJdlgSearchresult(result);
  }
}