import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginPayload } from 'src/app/dto/login-payload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  spinner = false;
  loginForm: FormGroup;
  loginPayload: LoginPayload;

  constructor(private authService:AuthService, private router: Router )
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
    this.spinner = true;

    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;
    this.authService.login(this.loginPayload).subscribe( data=>{
      if(data)
      {
        this.router.navigateByUrl('/tweets');
      }
      else{
        this.authService.logout();
      }

    },(err:any)=>{
      this.spinner = false;
      var error_message:string = "Unknown Error";
      if(err.status == 400)
      {
        error_message = "Wrong username or password";
      }
      alert(error_message)
    });
  }

  spinnerIsVisible()
  {
    return this.spinner;
  }



}
