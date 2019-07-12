import { Component } from '@angular/core';
import { Service } from '../../service';
import { Router } from '@angular/router';


@Component({
  selector: 'userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css'],
})
export class UserDetailsComponent {
  constructor(private service: Service, private router: Router) { }
  public disabled = false; uldisabled = false;
  ngOnInit() {

  }
  create() {
    this.uldisabled = false;
    var type = "create";
    var userprocess = [{ "user": undefined, "type": type }];
    this.service.storeuserdetails(userprocess);
  }

  change() {

  }







}