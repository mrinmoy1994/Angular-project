import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  statusCode: any;

  constructor(private router: Router, private service: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if(localStorage.getItem("token"))
      this.router.navigateByUrl("/home");
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  onSubmit(form) {
    const data = {
      name: form.controls.username.value,
      password: form.controls.password.value
    };
    console.log(data);
    this.service.getLoginToken({
      cred:btoa(data.name+":"+data.password)})
      .subscribe(
        data => {
          
          console.log(data)
          console.log(btoa(data.name+":"+data.password))
          this.statusCode = data.status;
          if(this.statusCode === 200 || this.statusCode === 201)
            {
              localStorage.setItem("token",data.props.token);
              localStorage.setItem("userName",data.name);
              console.log(this.statusCode);
              console.log(localStorage.getItem("token"));
              this.router.navigateByUrl("/home");
            }
          //this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error)
        });
       // debugger
      // if(this.statusCode == 200 || this.statusCode == 201)
      // {
      //   this.router.navigateByUrl("/home");
      // }
  }

}