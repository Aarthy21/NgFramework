import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopNavComponent {
  constructor(private router: Router) { }
 

}