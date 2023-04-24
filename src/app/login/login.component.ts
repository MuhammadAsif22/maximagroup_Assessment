import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/service/service.service';
import { ServiceModel } from '../model/service-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private service: Service,
    private router: Router,
    private fb: FormBuilder
  ) {}
  Model = {} as ServiceModel;
  form!: FormGroup;
  ngOnInit(): void {
    this.buildform();
  }

  buildform() {
    this.form = this.fb.group({
      Email: [this.Model.Email || '', Validators.required],
      Password: [this.Model.Password || '', Validators.required],
    });
    console.log('form', this.form);
  }

  login() {
    console.log('login', this.form);
    this.service.Login(this.form.value).subscribe((data) => {
      console.log('Response Data', data);
      if (data.data != null) {
        const tokenString: string = JSON.stringify(data.data);
        localStorage.setItem('token', tokenString);
      }
      localStorage.setItem('role', JSON.stringify(data.role[0]));
      this.router.navigateByUrl('/dashboard');
    });
  }
}
