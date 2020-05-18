import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AppConfig } from 'src/app/config/app-config';
import { LoginPayload } from 'src/app/dto/login-payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;

  constructor(private authService:AuthService)
  {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });

    this.loginPayload = {
      username: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;
    this.authService.login(this.loginPayload).subscribe( data=>{
      if(data)
        console.log(data);
      else
        console.log('login failed');
    });
  }

}
