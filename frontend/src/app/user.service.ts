import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { JwtHelper, AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';

import { environment } from './../environments/environment';

@Injectable()
export class UserService {

  username: string;
  roles: string;

  constructor(private http: Http, private authHttp: AuthHttp) {
    this.decodeToken();
  }
  
  login(username: string, password: string) {
    let body = {'username': username, 'password': password};
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(environment.apiUrl + "/login", JSON.stringify(body), {headers: headers});
  }
  
  validateCaptcha(token: string) {
    let params = new URLSearchParams();
    params.set("token", token);
    return this.http.get(environment.apiUrl + "/user/validateCaptcha", {search: params});  
  }
  
  register(body: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(environment.apiUrl + "/user/register", JSON.stringify(body), {headers: headers});
  }
  
  confirm(userId: number, token: string, password: string) {
      let body = {'password': password};
      let headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(environment.apiUrl + "/user/confirm/" + userId.toString() + "/" + token, password);
  }
  
  resetPassword(username: string) {
      let body = {'username': username};
      let headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(environment.apiUrl + "/user/password/reset", JSON.stringify(body), {headers: headers});
  }
  
  changePassword(userId: number, oldPassword: string, newPassword: string) {
      let body = {'oldPassword': oldPassword, 'newPassword': newPassword};
      let headers = new Headers({'Content-Type': 'application/json'});
      return this.authHttp.post(environment.apiUrl + "/user/password/change" + userId.toString() + "/", JSON.stringify(body), {headers: headers});
  }

  checkUsername(username: string) {
    let params = new URLSearchParams();
    params.set("username", username);
    return this.http.get(environment.apiUrl + "/user/search/existsByUsername", {search: params});  
  }
  
  logout() {
    this.removeToken();
    this.setUsername(null);
    this.setRoles(null);
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
