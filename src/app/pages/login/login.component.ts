import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/pages/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    username:[''],
    password:['']
  })
  constructor(private router: Router ,private loginService: LoginService, private fb:FormBuilder){}
  ngOnInit(): void {

  }
  onLogin(): void{
    const formValue = this.loginForm.value;
      const userData = {
      username: formValue.username as string,
      password: formValue.password as string,
    };
    this.loginService.login(userData).subscribe( (res) =>
    {
    this.router.navigate([''])
  })
  }
}
