import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegistrationPayload } from 'src/app/dto/registration-payload';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registrationForm: FormGroup;
  registrationPayload: RegistrationPayload;
  errorMessage :string = "";
  @ViewChild('registration_alert') registration_alert: { nativeElement: any; };

  constructor(private formBuilder:FormBuilder, private authService : AuthService, private router:Router, private renderer: Renderer2)
  {

    this.registrationForm = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
    });

    this.registrationPayload = {
      username: '',
      email: '',
      password: '',
    };

  }

  ngOnInit(): void {
  }

  onSubmit()
  {

    this.registrationPayload.username = this.registrationForm.get('username').value;
    this.registrationPayload.email = this.registrationForm.get('email').value;
    this.registrationPayload.password = this.registrationForm.get('password').value;

    this.authService.register(this.registrationPayload).subscribe(data => {
      this.router.navigateByUrl('');
    }, error => {
      this.errorMessage = error.error.message;
      this.renderer.removeClass(this.registration_alert.nativeElement,'d-none')
    });
  }



}
