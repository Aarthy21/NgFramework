import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'usermoduletree',
  templateUrl: './usermoduletree.component.html',
  styleUrls: ['./usermoduletree.component.css']
})
export class UserTreeComponent implements OnInit {
  	@Input() data: any[];
     
      ngOnInit(){
          console.log(this.data);
      }
  
}