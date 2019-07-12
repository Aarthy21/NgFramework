import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Service } from '../../service';
import { MainComponent } from "../main.component";
import { SearchInterface } from '../../Interface/searchinterface';
import { DialogInterface } from '../../Interface/dialoginterface';
import { DialogModel } from '../../datamodel/smdialog/dialogmodel';
@Component({
  selector: 'modulecreation',
  templateUrl: './modulecreation.component.html',
  styleUrls: ['./modulecreation.component.css'],
})
export class ModuleCreationComponent implements OnInit,DialogInterface {
  constructor(private service: Service, private maincomponent: MainComponent) { }
  public screenname = "Module Creation";
  public dialogmodel: DialogModel
  public parentid;
  public moduletype;
  public moduletypebefore;
  public moduletypeafter;
  public moduleidempty;
  public moduleid;
  public modulenameempty;
  public pathempty;
  public componentempty;
  public parentempty;
  public compatibilityempty;
  public componentmoduleempty;
  public indexarray;
  public path;
  public mainselect = false;
  public component;
  public compatibility;
  public componentmodule;
  public parent;
  public modulename;
  public editboolean = false;
  public createboolean = false;
  public deleteboolean = false;
  public savebool = true;
  public liheadlist: any = [];
  public lisublist = [];
  public type;
  public sample = [];
  ngOnInit() {
    this.maincomponent.setdialogChild(this);
    $('#navbar-collapse-4 ul li button').prop('disabled', true);
    $('#navbar-collapse-4 ul li button').addClass('opacity');
    $('#button').prop('disabled', true);
    $("#radiooption2").prop('disabled', 'true');
    $("#radiooption3").prop('disabled', 'true');
    this.getdata();
    this.dialog();
  }
  /******dialog********* */
  dialog() {
    this.dialogmodel = new DialogModel();
    this.dialogmodel.dialogtype = "alert";
    this.dialogmodel.screenname = this.screenname;
    this.dialogmodel.value = null;
  }

  getdialogresult(result: any) {

  }

  /******** */
  getdata() {
    this.service.getdata().subscribe
      (response => {
        if (response == null) {
          this.sample = [];
        }
        else {
          this.sample = response;
        }
      },
      err => { console.log(err) });



    var subscription = this.service.getcompletenode()
      .subscribe(item => this.selectedNavItem(item));

    var index = this.service.getcompleteindex()
      .subscribe(index => this.indexid(index))
  }

  setSearchId(result: any) {
    console.log(result);
  }

  selectedNavItem(item: any) {
    console.log(item);
    var item = item[0];
    var index = item[1];
    console.log(item);
    this.moduleid = item.moduleid;
    this.path = item.Path;
    this.component = item.component;
    this.modulename = item.title;
    this.moduletype = item.moduletype;
    this.compatibility = item.compatibility;
    this.componentmodule = item.componentModuleName;
    if (this.moduletype == "head") {
      this.liheadselect(item, index);
    }
    if (this.moduletype == "subhead") {
      this.lisubheadselect(item, index);
    }
    if (this.moduletype == "menu") {
      this.limenuselect(item, index);
    }
  }

  indexid(index) {
    this.indexarray = index;
    console.log(this.indexarray);
  }

  maindropdown(event) {
    this.createboolean = false;
    this.editboolean = false;
    this.deleteboolean = false;
    this.mainselect = true;
    $('.side-menu-container ul li a').css('color', 'unset');
    $("table select").prop('disabled', true);
    $('#navbar-collapse-4 ul li .editbutton').prop('disabled', true);
    $('#navbar-collapse-4 ul li .editbutton').addClass('opacity');
    $('#navbar-collapse-4 ul li .deletebutton').prop('disabled', true);
    $('#navbar-collapse-4 ul li .deletebutton').addClass('opacity');
    $('#navbar-collapse-4 ul li .createbutton').prop('disabled', false);
    $('#navbar-collapse-4 ul li .createbutton').removeClass('opacity');
    $("#radiooption1 input").prop('disabled', false);
    $("#radiooption2 input").prop('disabled', true);
    $("#radiooption3 input").prop('disabled', true);
    this.moduleid = "mnu";
    this.path = "mnu";
    this.component = "menu";
    this.modulename = "menu";
    this.moduletype = "head";
    this.compatibility = "All",
      this.componentmodule = "mainmodule"
  }

  liheadselect(menu, i) {
    this.createboolean = false;
    this.editboolean = false;
    this.deleteboolean = false;
    this.mainselect = false;
    $('#radiooption1 input').prop('disabled', false);
    $('#radiooption3 input').prop('disabled', true);
    $('#radiooption2 input').prop('disabled', true);
    $('#radiooption3 input').prop('disabled', true);
    $("table select").prop('disabled', true);
    $('#navbar-collapse-4 ul li .editbutton').prop('disabled', false);
    $('#navbar-collapse-4 ul li .editbutton').removeClass('opacity');
    $('#navbar-collapse-4 ul li .createbutton').prop('disabled', false);
    $('#navbar-collapse-4 ul li .createbutton').removeClass('opacity');
    $('#navbar-collapse-4 ul li .deletebutton').prop('disabled', true);
    $('#navbar-collapse-4 ul li .deletebutton').addClass('opacity');
    $("table input").prop('readonly', true)
    $('#button').prop('disabled', true);
    $("#radiooption2").prop('readonly', true);
    $("#radiooption3").prop('readonly', true);
    $('.side-menu-container ul li a').css('color', 'black');
    $(event.target).css('color', 'red');
    this.reset();
    console.log(this.parent)
    this.moduleid = menu.moduleid;
    this.path = menu.Path;
    this.component = menu.component;
    this.modulename = menu.title;
    this.moduletype = menu.moduletype;
    this.compatibility = menu.compatibility;
    this.componentmodule = menu.componentModuleName;
    this.moduletypebefore = this.moduletype;
  }

  lisubheadselect(menu, i) {
    this.createboolean = false;
    this.editboolean = false;
    this.deleteboolean = false;
    $("#radiooption1 input").prop('disabled', true);
    $("#radiooption2 input").prop('disabled', false);
    $("#radiooption3 input").prop('disabled', true);
    $("table select").prop('disabled', true);
    $('#navbar-collapse-4 ul li .editbutton').prop('disabled', false);
    $('#navbar-collapse-4 ul li .editbutton').removeClass('opacity');
    $('#navbar-collapse-4 ul li .createbutton').prop('disabled', false);
    $('#navbar-collapse-4 ul li .createbutton').removeClass('opacity');
    $('#navbar-collapse-4 ul li .deletebutton').prop('disabled', true);
    $('#navbar-collapse-4 ul li .deletebutton').addClass('opacity');
    $("table input").prop('readonly', true)
    $('#button').prop('disabled', true);
    $('.side-menu-container ul li a').css('color', 'black');
    $(event.target).css('color', 'red');
    this.reset();
    this.moduleid = menu.moduleid;
    this.path = menu.Path;
    this.component = menu.component;
    this.modulename = menu.title;
    this.moduletype = menu.moduletype;
    this.parent = menu.parent;
    this.compatibility = menu.compatibility;
    this.componentmodule = menu.componentModuleName;
    this.moduletypebefore = this.moduletype;
  }

  limenuselect(menu, i) {
    this.createboolean = false;
    this.editboolean = false;
    this.deleteboolean = false;
    $("#radiooption1 input").prop('disabled', true);
    $("#radiooption2 input").prop('disabled', true);
    $("#radiooption3 input").prop('disabled', false);
    $("table select").prop('disabled', true);
    $('#navbar-collapse-4 ul li .editbutton').prop('disabled', false);
    $('#navbar-collapse-4 ul li .editbutton').removeClass('opacity');
    $('#navbar-collapse-4 ul li .deletebutton').prop('disabled', false);
    $('#navbar-collapse-4 ul li .deletebutton').removeClass('opacity');
    $('#navbar-collapse-4 ul li .createbutton').prop('disabled', true);
    $('#navbar-collapse-4 ul li .createbutton').addClass('opacity');
    $("table input").prop('readonly', true)
    $('#button').prop('disabled', true);
    $('.side-menu-container ul li a').css('color', 'black');
    $(event.target).css('color', 'red');
    this.reset();
    this.moduleid = menu.moduleid;
    this.path = menu.Path;
    this.component = menu.component;
    this.modulename = menu.title;
    this.moduletype = menu.moduletype;
    this.parent = menu.parent;
    this.compatibility = menu.compatibility;
    this.componentmodule = menu.componentModuleName;
    this.moduletypebefore = this.moduletype;
  }

  reset() {
    this.moduleid = "";
    this.path = "";
    this.component = "";
    this.modulename = "";
    this.moduletype = "";
    this.parent = "";
    this.compatibility = "";
    this.componentmodule = "";
  }

  clear() {
    $("table input").prop('readonly', false);
    $("table select").prop('disabled', false);
    $('#button').prop('disabled', false);
    this.moduleid = "";
    this.path = "";
    this.component = "";
    this.modulename = "";
    this.parent = "";
    this.compatibility = "";
    this.componentmodule = "";
  }

  create() {
    var content = "Are you sure want to create head?"
    this.createboolean = true;
    console.log(this.moduleid);
    this.parentid = this.moduleid;
    if (this.moduletype == "head" && this.mainselect == true) {
      $("#radiooption1 input").prop('disabled', false);
      $("#radiooption2 input").prop('disabled', true);
      $("#radiooption3 input").prop('disabled', true);
      // this.dialogmodel.message = content;
      // this.maincomponent.invokesearch(this.dialogmodel);

      $.confirm({
        title: 'Module Creation',
        content: 'Are you sure want to create head?',
        buttons: {
          Yes: () => {
            this.clear();
          },
          No: function () {

          },
        }
      });
    }
    if (this.moduletype == "head" && this.mainselect == false) {
      var content = "Are you sure want to create subhead or menu?"
      $("#radiooption1 input").prop('disabled', true);
      $("#radiooption2 input").prop('disabled', false);
      $("#radiooption3 input").prop('disabled', false);
      // this.dialogmodel.message = content;
      // this.maincomponent.invokesearch(this.dialogmodel);
      $.confirm({
        title: 'Module Creation',
        content: 'Are you sure want to create subhead or menu?',
        buttons: {
          Yes: () => {
            this.moduletype = "subhead"
            this.clear();
          },
          No: function () {

          },
        }
      });
    }
    else if (this.moduletype == "subhead") {
      var content = "Are you sure want to create subhead or menu?"
      $("#radiooption1 input").prop('disabled', true);
      $("#radiooption2 input").prop('disabled', false);
      $("#radiooption3 input").prop('disabled', false);
      // this.dialogmodel.message = content;
      // this.maincomponent.invokesearch(this.dialogmodel);
      $.confirm({
        title: 'Module Creation',
        content: 'Are you sure want to create subhead or menu?',
        buttons: {
          Yes: () => {
            this.clear();
          },
          No: function () {
            $.alert('Canceled!');
          },
        }
      });
    }
    else if (this.moduletype == "menu") {
      $("#radiooption1 input").prop('disabled', true);
      $("#radiooption2 input").prop('disabled', true);
      $("#radiooption3 input").prop('disabled', false);
    }
  }

  edit() {
    $("table select").prop('disabled', false);
    var content = "Are you sure want to Edit?";
    this.editboolean = true;
    if (this.moduletype == "head") {
      $("#radiooption1 input").prop('disabled', false);
      $("#radiooption2 input").prop('disabled', true);
      $("#radiooption3 input").prop('disabled', true);
      // this.dialogmodel.message = content;
      // this.maincomponent.invokesearch(this.dialogmodel);

      $.confirm({
        title: 'Module Creation',
        content: 'Are you sure want to Edit?',
        buttons: {
          Yes: function () {
            $("table input").prop('readonly', false);
            $("table .moduleid").prop('readonly', true);
            $('#button').prop('disabled', false);
          },
          No: function () {
            $.alert('Canceled!');
          },
        }
      });
    }
    if (this.moduletype == "subhead") {
      var content = "Are you sure want to Edit?";
      $("#radiooption1 input").prop('disabled', true);
      $("#radiooption2 input").prop('disabled', false);
      $("#radiooption3 input").prop('disabled', true);
      // this.dialogmodel.message = content;
      // this.maincomponent.invokesearch(this.dialogmodel);
      $.confirm({
        title: 'Module Creation',
        content: 'Are you sure want to Edit?',
        buttons: {
          Yes: function () {
            $("table input").prop('readonly', false);
            $("table .moduleid").prop('readonly', true);
            $('#button').prop('disabled', false);
          },
          No: function () {
            $.alert('Canceled!');
          },

        }
      });
    }
    if (this.moduletype == "menu") {
      var content = "Are you sure want to Edit?";
      $("#radiooption1 input").prop('disabled', true);
      $("#radiooption2 input").prop('disabled', true);
      $("#radiooption3 input").prop('disabled', false);
      // this.dialogmodel.message = content;
      // this.maincomponent.invokesearch(this.dialogmodel);
      $.confirm({
        title: 'Module Creation',
        content: 'Are you sure want to Edit?',
        buttons: {
          Yes: function () {
            $("table input").prop('readonly', false);
            $("table .moduleid").prop('readonly', true);
            $('#button').prop('disabled', false);
          },
          No: function () {
            $.alert('Canceled!');
          },
        }
      });
    }
  }

  savevalidations() {
    if (this.moduleid == "") {
      this.moduleidempty = true;
    }
    if (this.path == "") {
      this.pathempty = true;
    }
    if (this.component == "") {
      this.componentempty = true;
    }
    if (this.modulename == "") {
      this.modulenameempty = true;
    }
    if (this.parent == "") {
      this.parentempty = true;
    }
    if (this.compatibility == "") {
      this.compatibilityempty = true;
    }
    if (this.componentmodule == "") {
      this.componentmoduleempty = true;
    }
    if (this.moduleid != "") {
      this.moduleidempty = false;
    }
    if (this.path != "") {
      this.pathempty = false;
    }
    if (this.component != "") {
      this.componentempty = false;
    }
    if (this.modulename != "") {
      this.modulenameempty = false;
    }
    if (this.parent != "") {
      this.parentempty = false;
    }
    if (this.compatibility != "") {
      this.compatibilityempty = false;
    }
    if (this.componentmodule != "") {
      this.componentmoduleempty = false;
    }
  }

  getKeyValues(arr, key) {
    return arr.reduce((a, b) => {
      let keys = Object.keys(b);
      keys.forEach(v => {
        if (Array.isArray(b[v])) a = a.concat(this.getKeyValues(b[v], key));
        if (v === key) a = a.concat(b[v]);
      });
      return a;
    }, [])
  }


  duplicatemenuidvalidation() {
    var array = [];
    this.savebool = true;
    console.log(this.sample);
    if (this.sample.length != 0) {
      array = (this.getKeyValues(this.sample, 'moduleid'));
    }
    for (var i = 0; i < array.length; i++) {
      if (array[i] == this.moduleid) {
        alert("Moduleid already exists");
        this.savebool = false;
        break;
      }

    }
  }

  save(menutype, index) {
    console.log("inside save", this.parentid);
    this.type = "save";
    if (index != undefined) {
      var sample = 'this.sample[' + index[0] + ']';
    }
    this.savevalidations();
    if ((this.moduleid != "" || this.moduleid != undefined) && (this.path != "" || this.path != undefined) && (this.component != "" || this.component != undefined) && (this.modulename != "" || this.modulename != undefined) && (this.parent != "" || this.parent != undefined) && (this.compatibility != "" || this.compatibility != undefined) && (this.componentmodule != "" || this.componentmodule != undefined)) {
      if (this.createboolean == true) {
        this.duplicatemenuidvalidation();
      }
      if (this.savebool == true) {
        console.log("inside savebool");
        if (this.moduletype == "head" && this.createboolean == true) {
          console.log("inside");
          this.sample.push({ "checked": false, "moduleid": this.moduleid, "Path": this.path, "component": this.component, "title": this.modulename, "moduletype": this.moduletype, "compatibility": this.compatibility, "componentModuleName": this.componentmodule, "lisublist": [] });
          this.savejson(this.sample, this.type);
        }

        if (this.moduletypebefore == "subhead" && this.moduletype == "subhead" && this.createboolean == true) {
          for (var i = 1; i <= index.length; i++) {
            if (i == index.length) {
              sample = sample + ".lisublist";
            }
            else {
              sample = sample + '.lisublist[' + index[i] + ']';
            }
          }
          console.log(sample);
          eval(sample).push({ "checked": false, "moduleid": this.moduleid, "Path": this.path, "component": this.component, "title": this.modulename, "moduletype": this.moduletype, "compatibility": this.compatibility, "componentModuleName": this.componentmodule, "parent": this.parentid, "lisublist": [] });
          this.savejson(this.sample, this.type);
        }

        if (this.moduletypebefore == "subhead" && this.moduletype == "menu" && this.createboolean == true) {
          for (var i = 1; i <= index.length; i++) {
            if (i == index.length) {
              sample = sample + ".lisublist";
            }
            else {
              sample = sample + '.lisublist[' + index[i] + ']';
            }
          }
          console.log(sample);
          eval(sample).push({ "checked": false, "moduleid": this.moduleid, "Path": this.path, "component": this.component, "title": this.modulename, "moduletype": this.moduletype, "compatibility": this.compatibility, "componentModuleName": this.componentmodule, "parent": this.parentid, "lisublist": [] });
          this.savejson(this.sample, this.type);
        }

        if (this.moduletypebefore == "head" && this.moduletype == "subhead" && this.createboolean == true) {
          alert(this.parentid);
          for (var i = 1; i <= index.length; i++) {
            if (i == index.length) {
              sample = sample + ".lisublist";
            }
            else {
              sample = sample + '.lisublist[' + index[i] + ']';
            }
          }
          console.log(sample);
          eval(sample).push({ "checked": false, "moduleid": this.moduleid, "Path": this.path, "component": this.component, "title": this.modulename, "moduletype": this.moduletype, "compatibility": this.compatibility, "componentModuleName": this.componentmodule, "parent": this.parentid, "lisublist": [] });
          this.savejson(this.sample, this.type);
        }

        if (this.moduletypebefore == "head" && this.moduletype == "menu" && this.createboolean == true) {

          for (var i = 1; i <= index.length; i++) {
            if (i == index.length) {
              sample = sample + ".lisublist";
            }
            else {
              sample = sample + '.lisublist[' + index[i] + ']';
            }
          }
          console.log(sample);
          eval(sample).push({ "moduleid": this.moduleid, "Path": this.path, "component": this.component, "title": this.modulename, "moduletype": this.moduletype, "compatibility": this.compatibility, "componentModuleName": this.componentmodule, "parent": this.parentid, "lisublist": [] });
          this.savejson(this.sample, this.type);
        }

        if (this.moduletype == "head" && this.editboolean == true) {
          for (var i = 1; i < index.length; i++) {
            sample = sample + '.lisublist[' + index[i] + ']';
          }
          eval(sample).moduleid = this.moduleid;
          eval(sample).title = this.modulename;
          eval(sample).Path = this.path;
          eval(sample).moduletype = this.moduletype;
          eval(sample).component = this.component;
          eval(sample).parent = this.parent;
          eval(sample).compatibility = this.compatibility;
          eval(sample).componentModuleName = this.componentmodule;
          console.log(this.sample);
          this.savejson(this.sample, this.type);
        }

        if (this.moduletype == "subhead" && this.editboolean == true) {
          for (var i = 1; i < index.length; i++) {
            sample = sample + '.lisublist[' + index[i] + ']';
          }
          eval(sample).moduleid = this.moduleid;
          eval(sample).title = this.modulename;
          eval(sample).Path = this.path;
          eval(sample).moduletype = this.moduletype;
          eval(sample).component = this.component;
          eval(sample).parent = this.parent;
          eval(sample).compatibility = this.compatibility;
          eval(sample).componentModuleName = this.componentmodule;
          console.log(this.sample);
          this.savejson(this.sample, this.type);
        }

        if (this.moduletype == "menu" && this.editboolean == true) {
          for (var i = 1; i < index.length; i++) {
            sample = sample + '.lisublist[' + index[i] + ']';
          }
          eval(sample).moduleid = this.moduleid;
          eval(sample).title = this.modulename;
          eval(sample).Path = this.path;
          eval(sample).moduletype = this.moduletype;
          eval(sample).component = this.component;
          eval(sample).parent = this.parent;
          eval(sample).compatibility = this.compatibility;
          eval(sample).componentModuleName = this.componentmodule;
          this.savejson(this.sample, this.type);
        }
      }


    }
  }

  savejson(sample, type) {
    var content = 'Successfully Deleted';
    this.service.postjson(sample)
      .subscribe
      (response => {
        $('#progress').removeClass('is-visible');
        console.log(response);
        if (response.code == 204 && type == 'delete') {
          // this.dialogmodel.message = content;
          // this.maincomponent.invokesearch(this.dialogmodel);
          $.confirm({
            title: 'Module Creation',
            content: 'Successfully Deleted'
          });
          this.clear();
          $("table input").prop('readonly', true);
          $("table select").prop('disabled', true);
          $('#button').prop('disabled', true);
        }

        if (response.code == 204 && type == "save") {
          if (this.createboolean == true) {
            var message = "Successfully Created";
          }
          else {
            var message = "Successfully Edited";
          }
          // this.dialogmodel.message = content;
          // this.maincomponent.invokesearch(this.dialogmodel);
          $.confirm({
            title: 'Module Creation',
            content: message
          });
          $("table input").prop('readonly', true);
          $("table select").prop('disabled', true);
          $('#button').prop('disabled', true);
        }
      },
      err => { console.log(err) });
  }


  delete(indexarray) {
    this.deleteboolean = true;
    this.type = "delete"
    if (indexarray != undefined) {
      var sample = 'this.sample[' + indexarray[0] + ']';
    }
    console.log(indexarray);
    if (this.moduletype == "head" && this.moduleid == "mnu" && this.deleteboolean == true) {
      this.sample = [];
      this.savejson(this.sample, this.type);
    }


    if (this.moduletype == "subhead" || this.moduletype == "menu" && this.deleteboolean == true) {
      for (var i = 1; i < indexarray.length; i++) {
        if (i == indexarray.length - 1) {
          sample = sample + ".lisublist";
        }
        else {
          sample = sample + '.lisublist[' + indexarray[i] + ']';
        }
      }
      console.log(sample);
      eval(sample).splice(indexarray[indexarray.length - 1], 1);
      this.savejson(this.sample, this.type);
    }

    if (this.moduletype == "head" && this.moduleid != "mnu" && this.deleteboolean == true) {
      this.sample.splice(indexarray[0], 1);
      this.savejson(this.sample, this.type);
    }

  }

}
