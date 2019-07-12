import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html'
})

export class SidebarComponent  {
	isActive = false;
	showMenu: string = '';
}
