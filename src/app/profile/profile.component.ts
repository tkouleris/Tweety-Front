import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../services/user.service";
import {UserPayload} from "../dto/user-payload";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  new_password = new FormControl('');
  confirm_password = new FormControl('');
  userPayload:UserPayload;

  constructor(private userService:UserService) {
    this.profileForm = new FormGroup({
      new_password: this.new_password,
      confirm_password: this.confirm_password
    });

    this.userPayload = {
      password: '',
    }
  }

  ngOnInit(): void {
  }

  changePassword() {
    let new_password = this.profileForm.get('new_password').value;
    let confirm_password = this.profileForm.get('confirm_password').value;
    if(new_password != confirm_password)
    {
      alert("Password mismatch");
    }
    this.userPayload.password = new_password;

    this.userService.changePassword(this.userPayload).subscribe( (response:any) =>{
      alert("Password Change successfully")
    },(err:any)=>{
      alert(err.error.message);
    });
  }
}
