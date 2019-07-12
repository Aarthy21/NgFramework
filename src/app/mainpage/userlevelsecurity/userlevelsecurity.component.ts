import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MainComponent } from '../main.component';
import { Service } from '../../service';
import { DialogModel } from '../../datamodel/smdialog/dialogmodel';
import { SearchInterface } from '../../Interface/searchinterface';
import { DialogInterface } from '../../Interface/dialoginterface';
import { Ivdsservice } from '../../vds/Ivdsservice';
import { GroupMasterdetails } from '../../datamodel/grouplevelsecurity/usergroupmasterdetails';
import { UserGroupMaster } from '../../datamodel/grouplevelsecurity/usergroupmaster';
import { Userdetails } from '../../datamodel/userlevelsecurity/userdetails';
import { UserMapping } from '../../datamodel/userlevelsecurity/usermapping';

@Component({
  selector: 'userlevelsecurity',
  templateUrl: './userlevelsecurity.component.html',
  styleUrls: ['./userlevelsecurity.component.css']
})
export class UserlevelSecurityComponent implements OnInit, SearchInterface, DialogInterface {
  public screenname = "User Level Security";
  public edittype = false;
  public dialogmodel: DialogModel;
  public groupmasterdetails: GroupMasterdetails;
  public usergroupmaster: UserGroupMaster;
  public userdetails: Userdetails;
  public usermapping: UserMapping;
  public new = false; save = true; delete = true; edit = true; search = false; back = true; upload = true; print = true; movetofirst = true; movetoprevious = true; movetolast = true; movetonext = true; autosave = true;
  radio = true; menucheckbox = true; loadbutton = true; accesscheckbox = true; removebutton = false; pushbutton = false;
  public completemodule = [];
  public sample = []; result; headresult = [];
  public indexarray; clstype;
  public usermodule = []; temparray = [];
  public completeicondown = false; usericondown = false; completeiconright = true; usericonright = true;
  public checkboxvalue; username; checked; accesstype; moduleid; accessarray = []; usergroupinfo = []; existprofiletype = false;
  public success = true;
  public grouptype = "T";
  public searchid = 2001;
  public readaccess: any = false; deleteaccess: any = false; writeaccess: any = false; writecheck: any = true; deletecheck: any = true; readcheck: any = true;
  constructor(private service: Service, private maincomponent: MainComponent, private ivdsservice: Ivdsservice, private datepipe: DatePipe) { }
  ngOnInit() {
    this.maincomponent.setsearchChild(this);
    this.maincomponent.setdialogChild(this);
    this.dialog();
    //this.getusergroupmasterdetails();
    this.indexcollection();
  }

  /*******tree component *****/
  getdata() {
    this.ivdsservice.getmodules()
      .subscribe
      (response => {
        this.result = response.rs.modulestructure;
        var response = response.rs.modulestructure.map(x => Object.assign({}, x));
        for (var i = 0; i < response.length; i++) {
          response[i].lisublist = [];
          response[i].checked = false;
          response[i].indeterminate = false;
        }
        this.treeformation(response, "completetree");
      },
      err => { console.log(err) });
  }

  indexcollection() {
    var completeindex = this.service.getcompleteindex()
      .subscribe(index => this.completeindexid(index))

    var userindex = this.service.getuserindex()
      .subscribe(index => this.userindexid(index))
  }


  treeformation(response, type: any) {
    var uniqueindex = [];
    var finaltree = [];

    for (var k = 0; k < response.length; k++) {
      var index = response.findIndex(x => x.moduleid == response[k].parentmodule);
      if (index != -1) {
        response[index].lisublist.push(response[k]);
      }
    }

    for (var m = 0; m < response.length; m++) {
      if (response[m].lisublist.length != 0) {
        var attribute = this.gettreeattribute(response[m].lisublist, "moduleid");
        for (var j = 0; j < attribute.length; j++) {
          var index = response.findIndex(x => x.moduleid == attribute[j]);
          uniqueindex.push(index);
        }
      }
    }

    for (var n = 0; n < response.length; n++) {
      if (uniqueindex.indexOf(n) == -1) {
        finaltree.push(response[n]);
      }
    }

    finaltree.sort((a, b) => {
      return (a.headorder) - (b.headorder);
    });
    this.treecategory(finaltree, type);
  }


  treecategory(finaltree, type) {
    if (type == "completetree") {
      this.completemodule = [];
      for (var i = 0; i < finaltree.length; i++) {
        this.completemodule.push(finaltree[i]);
        $('.hide-Progress-overlay').removeClass('is-visible');
      }

      this.loadbutton = true;
      this.completeanglerightclick("right");
    }
    if (type == "profiletree") {
      this.usermodule = [];
      for (var i = 0; i < finaltree.length; i++) {
        this.usermodule.push(finaltree[i]);
        this.useranglerightclick("right");
        $('.hide-Progress-overlay').removeClass('is-visible');
        $('#loadbutton').removeClass('removeopacity');
        $('#add').removeClass('removeopacity');
        $('#remove').removeClass('removeopacity');
        this.edit = false;
      }
    }
  }



  gettreeattribute(arr, key) {
    return arr.reduce((a, b) => {
      let keys = Object.keys(b);
      keys.forEach(v => {
        if (Array.isArray(b[v])) a = a.concat(this.gettreeattribute(b[v], key));
        if (v === key) a = a.concat(b[v]);
      });
      return a;
    }, [])
  }


  gettreerecords(arr, property, value) {
    return arr.reduce((a, b) => {
      let keys = Object.keys(b);
      keys.forEach(v => {
        if (Array.isArray(b[v])) a = a.concat(this.gettreerecords(b[v], property, value));
        if (v === property && b[v] == value) a = a.concat(b);
      });
      return a;
    }, [])
  }

  treetoarray(arr, property) {
    return arr.reduce((a, b) => {
      let keys = Object.keys(b);
      keys.forEach(v => {
        if (Array.isArray(b[v])) a = a.concat(this.treetoarray(b[v], property));
        if (v === property && b[v] != "") a = a.concat(b);
      });
      return a;
    }, [])
  }



  completeindexid(index) {
    this.indexarray = index.indexvalues;
    var indexarray = index.indexvalues;

    var checkboxvalue = index.checkboxvalue;
    var sample = 'this.completemodule[' + indexarray[0] + ']';
    for (var i = 1; i < indexarray.length; i++) {

      sample = sample + '.lisublist[' + indexarray[i] + ']';

    }

    this.checkfunction(eval(sample), checkboxvalue);
    if (indexarray.length > 0) {
      this.completeparentcheckboxvalidation(indexarray);
    }

  }

  userindexid(index) {
    // alert(this.edittype);
    this.readaccess = false;
    this.indexarray = index.indexvalues;
    var indexarray = index.indexvalues;

    var checkboxvalue = index.checkboxvalue;
    var sample = 'this.usermodule[' + indexarray[0] + ']';
    for (var i = 1; i < indexarray.length; i++) {

      sample = sample + '.lisublist[' + indexarray[i] + ']';

    }

    console.log(eval(sample));
    this.clstype = (eval(sample).clstype);
    this.accessrights(eval(sample));
    this.checkfunction(eval(sample), checkboxvalue);
    if (indexarray.length > 0) {
      var clonedindexArray = Object.assign([], indexarray);
      this.userparentcheckboxvalidation(clonedindexArray);
    }
  }

  accessassignment(sample) {

    if (sample.checked == false) {

      if (sample.readrights == "N") {
        this.readaccess = false;
      }
      else {
        this.readaccess = true;
      }
      if (sample.writerights == "N" || sample.writerights == undefined) {
        this.writeaccess = false;
      }
      else {
        this.writeaccess = true;
      }

      if (sample.deleterights == "N" || sample.deleterights == undefined) {
        this.deleteaccess = false;
      }
      else {
        this.deleteaccess = true;
      }

      if (sample.readrights == undefined) {
        this.readaccess = true;
      }
    }
    console.log(this.readaccess, this.writeaccess, this.deleteaccess);
  }


  accessrights(sample) {
    if (this.clstype == "M" && sample.checked == false) {
      this.readaccess = true;
      if (this.existprofiletype == true) {
        if (this.edittype == true) {
          this.writecheck = false;
          this.deletecheck = false;
        } else {
          this.writecheck = true;
          this.deletecheck = true;
        }
        this.accessassignment(eval(sample));
      }
      if (this.existprofiletype == false) {
        this.writecheck = false;
        this.deletecheck = false;
        if (this.writeaccess == true) {
          this.writeaccess = false;
        }
        if (this.deleteaccess == true) {
          this.deleteaccess = false;
        }
      }
    }
    else {
      this.readcheck = true;
      this.writecheck = true;
      this.deletecheck = true;
      this.readaccess = false;
      this.writeaccess = false;
      this.deleteaccess = false;
    }
  }


  checkfunction(sample, checkboxvalue) {
    var array = [];
    var samplearray = [];
    array.push(sample);
    array.forEach(function iter(a) {
      console.log(a);
      a.checked = checkboxvalue;
      Array.isArray(a.lisublist) && a.lisublist.forEach(iter);
    });
  }

  completeparentcheckboxvalidation(arr) {

    arr.splice((arr.length - 1), 1);

    var sample = 'this.completemodule[' + arr[0] + ']';
    for (var i = 1; i < arr.length; i++) {

      sample = sample + '.lisublist[' + arr[i] + ']';
    }
    if (eval(sample) != undefined) {

      var array = (eval(sample).lisublist);
      var result = this.gettreeattribute(array, "checked");

      var truecheck = result.some(this.checktrue);
      var falsecheck = result.some(this.checkfalse);
      if (truecheck == true && falsecheck == true) {
        var sample = 'this.completemodule[' + arr[0] + ']';
        eval(sample).indeterminate = true;
        for (var i = 1; i < arr.length; i++) {

          sample = sample + '.lisublist[' + arr[i] + ']';
          eval(sample).indeterminate = true;
        }

      }
      else {
        var sample = 'this.completemodule[' + arr[0] + ']';
        eval(sample).indeterminate = false;
        for (var i = 1; i < arr.length; i++) {

          sample = sample + '.lisublist[' + arr[i] + ']';
          eval(sample).indeterminate = false;
        }
      }
      if (this.check(result)) {
        var sample = 'this.completemodule[' + arr[0] + ']';
        eval(sample).checked = true;
        for (var i = 1; i < arr.length; i++) {
          sample = sample + '.lisublist[' + arr[i] + ']';
          eval(sample).checked = true;
        }
      }
      else if (!this.check(result)) {
        var sample = 'this.completemodule[' + arr[0] + ']';
        eval(sample).checked = false;
        for (var i = 1; i < arr.length; i++) {

          sample = sample + '.lisublist[' + arr[i] + ']';
          eval(sample).checked = false;
        }
      }
    }
  }

  userparentcheckboxvalidation(arr) {

    arr.splice((arr.length - 1), 1);

    var sample = 'this.usermodule[' + arr[0] + ']';
    for (var i = 1; i < arr.length; i++) {

      sample = sample + '.lisublist[' + arr[i] + ']';
    }
    if (eval(sample) != undefined) {
      var array = (eval(sample).lisublist);
      var result = this.gettreeattribute(array, "checked");

      var truecheck = result.some(this.checktrue);
      var falsecheck = result.some(this.checkfalse);
      if (truecheck == true && falsecheck == true) {
        var sample = 'this.usermodule[' + arr[0] + ']';
        eval(sample).indeterminate = true;
        for (var i = 1; i < arr.length; i++) {

          sample = sample + '.lisublist[' + arr[i] + ']';
          eval(sample).indeterminate = true;
        }
      }
      else {
        var sample = 'this.usermodule[' + arr[0] + ']';
        eval(sample).indeterminate = false;
        for (var i = 1; i < arr.length; i++) {

          sample = sample + '.lisublist[' + arr[i] + ']';
          eval(sample).indeterminate = false;
        }
      }
      if (this.check(result)) {
        var sample = 'this.usermodule[' + arr[0] + ']';
        eval(sample).checked = true;
        for (var i = 1; i < arr.length; i++) {

          sample = sample + '.lisublist[' + arr[i] + ']';
          eval(sample).checked = true;
        }
      }
      else if (!this.check(result)) {
        var sample = 'this.usermodule[' + arr[0] + ']';
        eval(sample).checked = false;
        for (var i = 1; i < arr.length; i++) {

          sample = sample + '.lisublist[' + arr[i] + ']';
          eval(sample).checked = false;
        }
      }
    }
  }


  loadmodule() {
    $('.hide-Progress-overlay').addClass('is-visible');
    this.getdata();
  }


  checktrue(element, index, array) {
    return element == true;
  }

  checkfalse(element, index, array) {
    return element == false;
  }


  check(arr) {
    var flag = 0;
    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] !== true) {
        flag = 1;
        break;
      }
    }
    if (flag) {
      return false;
    } else {
      return true;
    }
  }


  completeanglerightclick(value) {
    if (value == "right") {
      this.completeicondown = true;
      this.completeiconright = false;
    }
    else {
      this.completeicondown = false;
      this.completeiconright = true;
    }
    $('#completeangleright').click();
  }


  useranglerightclick(value) {
    if (value == "right") {
      this.usericondown = true;
      this.usericonright = false;
    }
    else {
      this.usericondown = false;
      this.usericonright = true;
    }
    $('#userangleright').click();

  }


  removemodule() {
    for (var i = 0; i < this.usermodule.length; i++) {

      if (this.usermodule[i].checked == true) {
        this.usermodule.splice(i, 1);
        i--;
      }
      else {
        var element = this.usermodule[i].lisublist;
        var result = this.gettreerecords(element, "checked", true);

        if (result.length != 0) {
          for (var k = 0; k < result.length; k++) {
            var name = result[k].moduleid;

            var result1 = (this.removeFromTree(this.usermodule[i], name));

          }

          this.usermodule[i] = result1;
          if (this.usermodule[i].indeterminate == true) {
            var checkarray = this.gettreeattribute(this.usermodule[i].lisublist, "checked");

            var truecheck = checkarray.some(this.checktrue);
            var falsecheck = checkarray.some(this.checkfalse);
            if (truecheck == true && falsecheck == true) {
              this.usermodule[i].indeterminate = true;
            }
            else {
              this.usermodule[i].indeterminate = false;
            }
            if (this.check(result)) {
              this.usermodule[i].checked = true;
            }
            else if (!this.check(result)) {
              this.usermodule[i].checked = false;
            }

          }
          var indeterminatearray = (this.gettreerecords(this.usermodule[i].lisublist, "indeterminate", true));

          for (i = 0; i < indeterminatearray.length; i++) {
            var checkarray = this.gettreeattribute(indeterminatearray[i].lisublist, "checked");

            var truecheck = checkarray.some(this.checktrue);
            var falsecheck = checkarray.some(this.checkfalse);
            if (truecheck == true && falsecheck == true) {
              indeterminatearray[i].indeterminate = true;
            }
            else {
              indeterminatearray[i].indeterminate = false;
            }
            if (this.check(result)) {
              indeterminatearray[i].checked = true;
            }
            else if (!this.check(result)) {
              indeterminatearray[i].checked = false;
            }

          }
        }
      }
    }
  }

  removeFromTree(parent, childNameToRemove) {

    parent.lisublist = parent.lisublist
      .filter((child) => {
        return child.moduleid !== childNameToRemove
      }
      )
      .map((child) => { return this.removeFromTree(child, childNameToRemove) });
    return parent;
  }

  searchTree(element, matchingTitle) {
    var resultarray = [];
    if (element.checked == matchingTitle) {
      return element;
    } else if (element.lisublist != null) {
      var i;
      var result = null;
      for (i = 0; result == null && i < element.lisublist.length; i++) {
        result = this.searchTree(element.lisublist[i], true);

      }
      return result;
    }
    return null;
  }

  headcheck(userarray, cloned, i) {

    if (this.mainduplicatevalidation(userarray, cloned)) {
      var elementPos = this.usermodule.map(function (x) { return x.moduleid; }).indexOf(cloned.moduleid);
      console.log(elementPos);
      if (elementPos != -1) {
        this.usermodule.splice(elementPos, 1);
      }
      var array = this.completemodule[i].lisublist.map(x => Object.assign({}, x));
      array.forEach(function iter(a) {
        a.checked = false;
        if (Array.isArray(a.lisublist)) {
          a.lisublist = a.lisublist.map(x => Object.assign({}, x));
        }
        Array.isArray(a.lisublist) && a.lisublist.forEach(iter);
      });
      cloned.checked = false;
      cloned.indeterminate = false;
      cloned.lisublist = [];
      cloned.lisublist = array;
      console.log(cloned);
      this.usermodule.push(cloned);
    }
    console.log(this.usermodule);
  }

  sublistcheck(cloned, i, userarray) {
    var final = [];
    var mainsample = [];
    var element = cloned.lisublist;

    var result = this.gettreerecords(element, "checked", true);

    for (var k = 0; k < result.length; k++) {
      if (result[k].lisublist.length != 0) {
        for (var j = 0; j < result[k].lisublist.length; j++) {
          var index = result.findIndex(x => x.moduleid == result[k].lisublist[j].moduleid);
          mainsample.push(index);
        }
      }
    }
    console.log(mainsample);
    for (var m = 0; m < result.length; m++) {
      if (mainsample.indexOf(m) == -1) {
        final.push(result[m]);
      }
    }
    this.sublistfinal(final, userarray, cloned, i);
  }



  sublistheadavail(final) {
    var sample = [];
    var index = [];
    var arrayobject = Object.assign({}, final);
    arrayobject.checked = false;
    arrayobject.indeterminate = false;
    var array1 = final.lisublist.map(x => Object.assign({}, x));
    array1.forEach(function iter(a) {
      a.checked = false;
      Array.isArray(a.lisublist) && a.lisublist.forEach(iter);
    });
    var sampleobj = { checked: arrayobject.checked, indeterminate: arrayobject.indeterminate, moduleid: arrayobject.moduleid, menuname: arrayobject.menuname, parentmodule: arrayobject.parentmodule, clstype: arrayobject.clstype, lisublist: [] };
    sampleobj.lisublist = array1;
    sample.push(sampleobj);
    this.usermodule.forEach(function iter(a) {
      if (a.moduleid == final.parentmodule) {
        a.lisublist.push(sample[0]);
      }
      Array.isArray(a.lisublist) && a.lisublist.forEach(iter);
    });
  }

  sublistnohead(cloned, final) {
    var flag = 0;
    var sample = [];
    this.headresult = [];

    var record = this.headidentification(final.parentmodule, cloned);
    var arrayobject = Object.assign({}, final);
    arrayobject.checked = false;
    arrayobject.indeterminate = false;
    var array1 = final.lisublist.map(x => Object.assign({}, x));
    array1.forEach(function iter(a) {
      a.checked = false;
      Array.isArray(a.lisublist) && a.lisublist.forEach(iter);
    });
    var obj = { checked: arrayobject.checked, indeterminate: arrayobject.indeterminate, moduleid: arrayobject.moduleid, menuname: arrayobject.menuname, parentmodule: arrayobject.parentmodule, clstype: arrayobject.clstype, lisublist: [] };
    obj.lisublist = array1;
    sample.push(obj);

    for (var i = 0; i < record.length; i++) {
      record[i].checked = false;
      record[i].indeterminate = false;
      record[i].lisublist = [];
      record[i].lisublist = sample;
      var element = this.gettreeattribute(this.usermodule, "moduleid");
      var elementPos = element.findIndex(x => x == record[i].parentmodule);
      if (elementPos != -1) {
        this.sublistheadavail(record[i]);
        flag = 1;
        break;
      }
      sample = [];
      sample.push(record[i]);
    }
    if (flag != 1) {
      if (sample[0].moduleid != cloned.moduleid) {
        cloned.checked = false;
        cloned.indeterminate = false;
        cloned.lisublist = [];
        cloned.lisublist = (sample);
        this.usermodule.push(cloned);
      }
      else {
        this.usermodule.push(sample[0]);
      }
    }
  }

  headidentification(parent, cloned) {
    var head = [];
    head = this.gettreerecords(this.result, "moduleid", parent);
    this.headresult.push(head[0]);
    if (head.length != 0 && head[0].parentmodule != cloned.moduleid && head[0].parentmodule != "MNU") {
      this.headidentification(head[0].parentmodule, cloned);
    }
    return this.headresult;

  }


  sublistfinal(final, userarray, cloned, i) {
    if (final.length != 0) {
      if (this.subduplicatevalidation(userarray, final)) {
        for (var j = 0; j < final.length; j++) {

          var element = this.gettreeattribute(this.usermodule, "moduleid");
          var elementPos = element.findIndex(x => x == final[j].moduleid);
          if (elementPos != -1) {
            for (var k = 0; k < this.usermodule.length; k++) {
              (this.removeFromTree(this.usermodule[k], final[j].moduleid));
            }
          }
          var parentPos = element.findIndex(x => x == final[j].parentmodule);
          if (parentPos != -1) {
            this.sublistheadavail(final[j]);
          }
          else {
            this.sublistnohead(cloned, final[j]);
          }
          console.log(this.usermodule);
        }
      }
    }
  }




  addmodule() {
    var flag = 0
    var userarray = [];
    userarray = this.gettreeattribute(this.usermodule, "moduleid");
    var cloned = this.completemodule.map(x => Object.assign({}, x));
    for (var i = 0; i < cloned.length; i++) {

      if (cloned[i].checked == true) {
        this.headcheck(userarray, cloned[i], i);
      }
      else {
        this.sublistcheck(cloned[i], i, userarray);
      }
    }
    this.useranglerightclick("right");

  }


  subduplicatevalidation(userarray, result) {
    var resultarray = [];

    for (var i = 0; i < result.length; i++) {
      var modulearray = this.gettreeattribute(result[i].lisublist, "moduleid");
      modulearray.push(result[0].moduleid);
      for (var k = 0; k < modulearray.length; k++) {
        resultarray.push(modulearray[k]);
      }
    }
    var flag = 0;
    for (var i = 0; i < resultarray.length; i++) {
      if (userarray.indexOf(resultarray[i]) == -1) {
        flag = 1;
        break;
      }
    }

    if (!flag) {
      return false;
    }
    else {
      return true;
    }
  }


  mainduplicatevalidation(userarray, result) {
    var flag = 0;
    var array = [];
    array = result.lisublist;

    var result1 = this.gettreeattribute(array, "moduleid");
    result1.push(result.moduleid);

    for (var i = 0; i < result1.length; i++) {
      if (userarray.indexOf(result1[i]) == -1)
        flag = 1;
      break;
    }
    if (!flag) {
      return false;
    }
    else {
      return true;
    }
  }
  /*******************screen functionality*************************/
  newuserlevelsecurity() {

    this.dialogmodel.message = "Do you want to create a new User Level Security?";
    this.dialogmodel.target = "newuserlevelsecurity";
    this.dialogmodel.dialogtype = "confirm";
    this.maincomponent.invokedialog(this.dialogmodel);
  }

  savevalidations() {

    var array = (this.gettreerecords(this.usermodule, "checked", true));
    array.forEach((a) => {
      this.accessarray.push(a.moduleid);
    })
    if (this.username == '' || this.username == undefined) {
      this.dialogmodel.message = "Select the User Name";
      this.dialogmodel.dialogtype = "alert";
      this.dialogmodel.value = null;
      this.maincomponent.invokedialog(this.dialogmodel);
    }
    else if (this.username != undefined && this.username != "" && this.edittype != false) {
      this.savemoduledetails("update");
    }
    else if (this.username != undefined && this.username != "" && this.edittype != true) {
      this.savemoduledetails("save");
    }
  }


  updateusermappingdetails(data) {
    $('.hide-Progress-overlay').addClass('is-visible');
    this.ivdsservice.updateusermappingdetails(data)
      .subscribe
      (response => {
        console.log(response);
        if (response.FUNRESPONSE == undefined) {
          $('.hide-Progress-overlay').removeClass('is-visible');
          this.dialogmodel.message = "Unable to Update";
          this.dialogmodel.dialogtype = "alert";
          this.dialogmodel.target = "savemoduledetails"
          this.dialogmodel.value = null;
          this.maincomponent.invokedialog(this.dialogmodel);
        }
        else if (response.FUNRESPONSE.success == 200 || response.FUNRESPONSE.status == 200) {
          this.save = true;
          this.back = true;
          this.search = false;
          this.new = false;
          this.readcheck = true;
          this.writecheck = true;
          this.deletecheck = true;
          $('.hide-Progress-overlay').removeClass('is-visible');
          $('#add').prop('disabled', true);
          $('#remove').prop('disabled', true);
          $('#loadbutton').removeClass('removeopacity');
          $('#add').removeClass('removeopacity');
          $('#remove').removeClass('removeopacity');
          $('input').prop('readonly', true);
          this.loadbutton = true;
          this.radio = true;
          this.edit = false;
          this.completemodule.forEach(function iter(a) {
            a.checked = false;
            a.indeterminate = false;
            Array.isArray(a.lisublist) && a.lisublist.forEach(iter);
          });

          this.usermodule.forEach(function iter(a) {
            a.checked = false;
            a.indeterminate = false;
            Array.isArray(a.lisublist) && a.lisublist.forEach(iter);
          });
          this.dialogmodel.message = "User Level Security Updated";
          this.dialogmodel.dialogtype = "alert";
          this.dialogmodel.value = null;
          this.maincomponent.invokedialog(this.dialogmodel);

        }


      },

      err => {
        console.log(err);
        $('.hide-Progress-overlay').removeClass('is-visible');
      });
  }

  savemoduledetails(type) {

    this.usermapping = new UserMapping();

    if (this.readaccess == true) {
      this.readaccess = "Y";
    }
    else {
      this.readaccess = "N";
    }
    if (this.writeaccess == true) {
      this.writeaccess = "Y";
    }
    else {
      this.writeaccess = "N";
    }
    if (this.deleteaccess == true) {
      this.deleteaccess = "Y"
    }
    else {
      this.deleteaccess = "N";
    }
    console.log(this.usermodule);
    var array = this.usermodule.map(x => Object.assign({}, x));
    array.forEach(function iter(a) {
      if (Array.isArray(a.lisublist)) {
        a.lisublist = a.lisublist.map(x => Object.assign({}, x));
      }
      Array.isArray(a.lisublist) && a.lisublist.forEach(iter);
    });
    var modulerecords = this.treetoarray(array, "moduleid");

    for (var j = 0; j < modulerecords.length; j++) {
      this.userdetails = new Userdetails();
      this.userdetails.loginname = this.username;
      this.userdetails.moduleid = modulerecords[j].moduleid;
      this.userdetails.parentmodule = modulerecords[j].parentmodule;
      this.userdetails.rights = "";
      this.userdetails.type = modulerecords[j].clstype;
      this.userdetails.datecr = this.datepipe.transform(new Date(), "yyyy-MM-dd hh:mm:ss");
      this.userdetails.usercr = "Superuser";

      if (this.accessarray.indexOf(modulerecords[j].moduleid) > -1 && modulerecords[j].clstype == "M") {
        this.userdetails.readrights = this.readaccess;
        this.userdetails.writerights = this.writeaccess;
        this.userdetails.deleterights = this.deleteaccess;
      }
      else if (this.accessarray.indexOf(modulerecords[j].moduleid) == -1 && modulerecords[j].clstype == "M") {
        this.userdetails.readrights = "Y";
        this.userdetails.writerights = "N";
        this.userdetails.deleterights = "N";
      }
      else {
        this.userdetails.readrights = "N";
        this.userdetails.writerights = "N";
        this.userdetails.deleterights = "N";
      }


      this.usermapping.usermapping.push(this.userdetails);

    }

    this.readaccess = false; this.writeaccess = false; this.deleteaccess = false;
    if (this.usermapping.usermapping.length == 0) {
      this.usermapping.mode = true;
      this.usermapping.loginname = this.username;
    }
    else {
      this.usermapping.mode = false;
      this.usermapping.loginname = this.username;
    }
    if (type == "update") {
      this.updateusermappingdetails(this.usermapping);
    }
    //   if(type=="save"){
    //   this.ivdsservice.setusermappingdetails(this.usermapping)
    //     .subscribe
    //     (response => {
    //       console.log(response);
    //       if (response.status == 200) {
    //         this.readcheck = true;
    //         this.writecheck = true;
    //         this.deletecheck = true;
    //         this.save = true;
    //         this.new = false;
    //         this.edit = false;
    //         this.search = false;
    //         $('input').prop('disabled', true);
    //         $('#loadbutton').removeClass('removeopacity');
    //         $('#add').prop('disabled', true);
    //         $('#remove').prop('disabled', true);
    //         this.loadbutton = true;
    //         this.completemodule.forEach(function iter(a) {
    //           a.checked = false;
    //           a.indeterminate = false;
    //           Array.isArray(a.lisublist) && a.lisublist.forEach(iter);
    //         });

    //         this.usermodule.forEach(function iter(a) {
    //           a.checked = false;
    //           a.indeterminate = false;
    //           Array.isArray(a.lisublist) && a.lisublist.forEach(iter);
    //         });
    //       }
    //     },
    //     err => { console.log(err) });
    // }
  }

  editmethod() {
    this.edittype = true;
    this.usermodule.forEach(function iter(a) {
      a.checked = false;
      a.indeterminate = false;
      Array.isArray(a.lisublist) && a.lisublist.forEach(iter);
    });
    $('#loadbutton').addClass('removeopacity');
    $('#add').addClass('removeopacity');
    $('#remove').addClass('removeopacity');
    $('#add').prop('disabled', false);
    $('#remove').prop('disabled', false);
    $('input').prop("readonly", false);
    this.loadbutton = false;
    this.new = true;
    this.save = false;
    this.search = true;
    this.radio = false;
    this.edit = true;
    this.back = false;
    this.deletecheck = true;
    this.writecheck = true;
  }

  backmethod() {
    $('#loadbutton').removeClass('removeopacity');
    $('#add').removeClass('removeopacity');
    $('#remove').removeClass('removeopacity');
    $('#add').prop('disabled', true);
    $('#remove').prop('disabled', true);
    //$('input').prop('disabled', true);
    this.loadbutton = true;
    this.new = false;
    this.save = true;
    this.search = false;
    this.radio = true;
    this.back = true;
    this.username = "";
    this.completemodule = [];
    this.usermodule = [];
  }

  /*********dialog********** */
  dialog() {
    this.dialogmodel = new DialogModel();
    this.dialogmodel.dialogtype = "confirm";
    this.dialogmodel.screenname = this.screenname;
    this.dialogmodel.value = null;
  }

  getdialogresult(result) {
    if (result.result == "yes" && result.target == "newuserlevelsecurity") {
      this.username = "";
      this.usermodule = [];
      this.completemodule = [];
      $('#loadbutton').addClass('removeopacity');
      $('#add').addClass('removeopacity');
      $('#remove').addClass('removeopacity');
      $('#add').prop('disabled', false);
      $('#remove').prop('disabled', false);
      // $('input').prop('disabled', false);
      this.loadbutton = false;
      this.new = true;
      this.save = false;
      this.search = true;
      this.radio = false;
      this.back = false;
      this.existprofiletype = false;
      this.edittype = false;
    }
   }
  /*********search************/
  searchbtn(event) {
    $('input').prop('disabled', false);
    var targetid = event.target.id;
    this.maincomponent.invoketwocolsearch(this.searchid, targetid);
  }
  searchbtn1(event) {
    $('input').prop('disabled', false);
    var targetid = event.target.id;
    this.maincomponent.invokejdlgsearch(this.searchid, targetid);
  }

  setTwocolSearchresult(result: any) {
    this.new = false;
    this.search = false;
    this.edit = false;
    this.save = true;
    this.back = true;
    var data = result.data;
    if (result.id == "searchicon") {
      this.username = data[0];
      // $('input').prop('disabled', true);
      this.edit = false;
      this.existprofiletype = true;
      this.ivdsservice.getusermodules(this.username).subscribe
        (response => {
          console.log(response);
          if (response.rs.usermapping.length != 0) {
            $('.hide-Progress-overlay').addClass('is-visible');
            var response = response.rs.usermapping.map(x => Object.assign({}, x));
            for (var i = 0; i < response.length; i++) {
              response[i].lisublist = [];
              response[i].checked = false;
              response[i].indeterminate = false;
            }
            console.log(response);
            this.treeformation(response, "profiletree");
          }
          else {
            this.usermodule = [];
          }
        },
        err => { console.log(err) });
    }
  }

  setMulticolSearchresult(data: any) {

  }
  setJdlgSearchresult(result:any){
    console.log(result);
    var data = result.data;
    console.log(data);
    console.log(result.id);
  }
}
