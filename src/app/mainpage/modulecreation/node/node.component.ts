import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Service } from '../../../service'

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  constructor(private service: Service) { }
  @Input() item: any;
  @Input() index: any;  
  boolean:'none';   
  public angledownbool=false;anglerightbool=true;
  IsExpanded: boolean = false;
  ngOnInit() {
    console.log(this.item);
  }
  toggle(event,item, index) {   
    this.service.setcompletenode(item,index);
    console.log(item + "index" + this.index);
    this.IsExpanded = !this.IsExpanded;
    if(this.IsExpanded==true){   
      $(event.target).css('color','pink !important');
    }
    console.log(this.IsExpanded + " " + this.item.label);
  }

  getindex(event){
    var values = [];
    console.log($(event.target).parents('li'));
    if (this.IsExpanded == true) {
      var children = $(event.target).parents('li');
      for (var i = 0; i < children.length; i++) {
        if(children[i].getAttribute("data") !=null){
        values.push(children[i].getAttribute("data"));
      }
      }
      values=values.reverse();
     this.service.setcompleteindex(values);   
    }
  }
}

