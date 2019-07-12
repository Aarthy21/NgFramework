import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Service } from '../../service'

@Component({
  selector: 'usermodulenode',
  templateUrl: './usermodulenode.component.html',
  styleUrls: ['./usermodulenode.component.css']
})
export class UserNodeComponent implements OnInit {
  constructor(private service: Service) { }
  @Input() item: any;
  @Input() index: any;
  boolean: 'none';
  public angledownbool = false; anglerightbool = true;
  public indeterminate=false;
  IsExpanded: boolean = false;
  ngOnInit() {
    console.log(this.item);
  }
  toggle(event, item, index, mainindex) {
    this.service.setusernode(item, index);
    console.log(item + "index" + this.index);
    this.IsExpanded = !this.IsExpanded;

    if (this.IsExpanded == true) {
      $(event.target).css('color', 'pink !important');
    }
    console.log(this.IsExpanded + " " + this.item.label);
  }

   getchildren(event, checked) {
  var checked1= !checked;
    var indexvalues = [];
    console.log($(event.target).parents('li'));
    var parent = $(event.target).parents('li');
    for (var i = 0; i < parent.length; i++) {
      if (parent[i].getAttribute("data") != null) {
        indexvalues.push(parent[i].getAttribute("data"));
      }
    }
    indexvalues = indexvalues.reverse();
    console.log(indexvalues);
    var result = { "indexvalues": indexvalues, "checkboxvalue": checked1 };
    this.service.setuserindex(result);

  }
}



  


