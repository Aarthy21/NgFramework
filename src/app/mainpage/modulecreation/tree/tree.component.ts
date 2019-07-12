import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  	@Input() data: any[];
     
      ngOnInit(){
          console.log(this.data);
      }
  
}