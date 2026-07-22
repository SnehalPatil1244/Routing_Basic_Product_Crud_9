import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin, ISingIn } from '../model/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Auth_Base_Url: string = environment.AuthBaseUrl
  isloginSub$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }
  login(userDetails: ILogin): Observable<any> {
    let Login_Url = `${this.Auth_Base_Url}/api/auth/login`
    return this.http.post<any>(Login_Url, userDetails)
  }

  SignIn(userDetails: ISingIn): Observable<any> {
    let SingUp_Url = `${this.Auth_Base_Url}/api/auth/register`
    return this.http.post<any>(SingUp_Url, userDetails)
  }
  saveToken(token: string) {
    localStorage.setItem('token', token)
  }
  saveuserRole(userRole: string) {
    localStorage.setItem('userRole', userRole)
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }
  getuserRole(): string | null {
    return localStorage.getItem('userRole')
  }
  LogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
  }
}
