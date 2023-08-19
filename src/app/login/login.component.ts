import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from '../core/services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup = {} as FormGroup;
  errorMessage = '';
  isSubmitClicked = false;
  loader = false;

  constructor(private fb: FormBuilder, private ms: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.isSubmitClicked = true;
    if (this.loginForm.valid) {
      this.loader = true;
      this.ms.login(this.loginForm.getRawValue()).subscribe((res: any) => {
        this.loader = false;
        console.log('login', res);
        if (res && res.is_success) {
          localStorage.setItem('user-info', JSON.stringify(res.data));
          this.router.navigate(['movies-list']);
        }
      }, (error) => {
        this.loader = false;
        if (error && error.error && error.error.is_success == false) {
          this.errorMessage = error?.error?.error?.message;
        }
      });
    }
  }

}
