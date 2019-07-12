import { Component } from '@angular/core';
import { Service } from '../../service';
import { Router } from '@angular/router';


@Component({
  selector: 'application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
})
export class ApplicationComponent {
  public new =true; save = true; delete = true; edit = true; search =true; back = true; upload = true; print = true; movetofirst = true; movetoprevious = true; movetolast = true; movetonext = true; autosave = true;
  
  constructor(private service: Service, private router: Router) { }
  public disabled = false; uldisabled = false;
  ngOnInit() {

  }
  systemdetails() {
    this.uldisabled = false;
    var type = "create";
    var userprocess = [{ "user": undefined, "type": type }];
    this.service.storeuserdetails(userprocess);
  }

}