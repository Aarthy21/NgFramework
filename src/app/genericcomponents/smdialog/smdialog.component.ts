import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DialogResult } from '../../datamodel/dialogcomp/dialogresult';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'smdialog',
  templateUrl: './smdialog.component.html',
  styleUrls: ['./smdialog.component.css'],
})
export class SMDialogComponent implements OnInit {
  public dialogresult:DialogResult;
  @Output() onselect: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {


  }

  invokedialog(dialogmodel) {
    console.log(dialogmodel);
    if(dialogmodel.dialogtype=="alert"){
        this.invokealertdialog(dialogmodel)
    }
     if(dialogmodel.dialogtype=="confirm"){
        this.invokeconfirmdialog(dialogmodel)
    }

  }
  invokealertdialog(dialogmodel) {
    if (dialogmodel.value == null) {
      dialogmodel.value = "";
    }
    $.alert({
      title: dialogmodel.screenname,
      content: dialogmodel.message + "\t" + dialogmodel.value,
      buttons: {
        ok: () => {

        },


      }
    });
  }

  invokeconfirmdialog(dialogmodel) {
    if (dialogmodel.value == null) {
      dialogmodel.value = "";
    }
    $.confirm({
      title: dialogmodel.screenname,
      content: dialogmodel.message + "\t" + dialogmodel.value,
      
      buttons: {
        YES: () => {
          this.dialogresult=new DialogResult();
          this.dialogresult.result="yes";
          this.dialogresult.target=dialogmodel.target;
          this.onselect.emit(this.dialogresult);
        },
        NO:()=> {
      
        },
      }
    });
  }
}
