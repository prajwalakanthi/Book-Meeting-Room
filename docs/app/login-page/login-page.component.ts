import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  invalidUser:Boolean = false;

  constructor(private fb: FormBuilder,private router: Router, private commonService:CommonServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.commonService.getUserDetails().subscribe((users:any)=>{
        if(users && users?.length>0){
          const userIdx = users.findIndex((user:any)=>user.username == this.loginForm?.get('username')?.value);
          const passwordIdx = users.findIndex((user:any)=>user.password == this.loginForm?.get('password')?.value);
          if(userIdx>=0 && passwordIdx>=0){
            this.invalidUser = false;
            this.commonService.userName = this.loginForm?.get('username')?.value;
            sessionStorage.setItem('username', this.loginForm?.get('username')?.value);
            this.router.navigateByUrl('bookmeeting');
          } else {
            this.invalidUser = true;
          }
        }
      })
      
    }
  }
}
