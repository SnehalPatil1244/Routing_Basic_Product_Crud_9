import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin, ISingIn } from '../../model/Auth';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isAllReadyHasAccount: boolean = false
  LoginForm !: FormGroup
  SignUpForm !: FormGroup
  constructor(private authservice: AuthService,
    private snackbar: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm()
    this.createSignUpForm()
  }

  createLoginForm() {
    this.LoginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  createSignUpForm() {
    this.SignUpForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      userRole: new FormControl(null, Validators.required)
    })
  }
  get l() {
    return this.LoginForm.controls

  }

  get s() {
    return this.SignUpForm.controls
  }

  onlogin() {
    if (this.LoginForm.invalid) {
      this.LoginForm.markAllAsTouched()
    } else {
      let userDetails: ILogin = {
        ...this.LoginForm.value
      }
      this.authservice.login(userDetails).subscribe({
        next: res => {
          this.snackbar.opensanckbar(res.message)
          this.authservice.saveToken(res.token)
          this.authservice.saveuserRole(res.userRole)
          this.authservice.isloginSub$.next(res.userRole)
          this.router.navigate(['/home'])
        },
        error: err => {
          this.snackbar.opensanckbar(err.error.message)
        }

      })

    }

  }
  onsignup() {
    if (this.SignUpForm.invalid) {
      this.SignUpForm.markAllAsTouched()
    } else {
      let userDetails: ISingIn = {
        ...this.SignUpForm.value
      }
      this.authservice.SignIn(userDetails).subscribe({
        next: res => {
          this.snackbar.opensanckbar(res.message)
          this.isAllReadyHasAccount = true
        },
        error: err => {
          this.snackbar.opensanckbar(err.error.message)
          this.isAllReadyHasAccount = true
        },

      })
    }

  }


}
