import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'completemoduletree',
  templateUrl: './completemoduletree.component.html',
  styleUrls: ['./completemoduletree.component.css']
})
export class CompleteTreeComponent implements OnInit {
  	@Input() data: any[];
     
      ngOnInit(){
          console.log(this.data);
      }
  
}