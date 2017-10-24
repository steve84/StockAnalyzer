import { Injectable } from '@angular/core';
import { Headers. URLSearchParams } from '@angular/http';

import { AuthHttp, JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  username: string;
  roles: string;

  constructor(private http: AuthHttp) {
    this.decodeToken();
  }
  
  login(username: string, password: string) {
    let body = {'username': username, 'password': password};
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('http://localhost:8080/login', JSON.stringify(body), {headers: headers});
  }
  
  validateCaptcha(token: string) {
    let params = new URLSearchParams();
    params.set("token", page.toString());
    return this.http.get('http://localhost:8080/user/validateCaptcha', {search: params});  
  }
  
  register(body: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8080/user/register', JSON.stringify(body), {headers: headers});
  }
  
  logout() {
    this.removeToken();
    this.setUsername('');
    this.setRoles('');
  }
  
  getUsername(): string {
    return this.username;
  }
  
  setUsername(username: string) {
    this.username = username;
  }
  
  getRoles(): string {
    return this.roles;
  }
  
  setRoles(roles: string) {
    this.roles = roles;
  }
  
  decodeToken() {
    let token = localStorage.getItem('token');
    let jwtHelper = new JwtHelper();
    if (token) {
      let decodedToken = jwtHelper.decodeToken(token);
      this.setUsername(decodedToken.sub);
      this.setRoles(decodedToken.roles);
    }
  }
  
  removeToken() {
    localStorage.removeItem('token');
  }

}
