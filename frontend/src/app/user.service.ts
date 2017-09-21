import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class UserService {

  username: string;

  constructor(private http: Http) {
    this.decodeToken();
  }
  
  login(username: string, password: string) {
    let body = {'username': username, 'password': password};
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post('http://localhost:8080/login', JSON.stringify(body), {headers: headers});
  }
  
  logout() {
    this.removeToken();
    this.setUsername('');
  }
  
  getUsername(): string {
    return this.username;
  }
  
  setUsername(username: string) {
    this.username = username;
  }
  
  decodeToken() {
    let token = localStorage.getItem('token');
    let jwtHelper = new JwtHelper();
    if (token) {
      let decodedToken = jwtHelper.decodeToken(token);
      this.setUsername(decodedToken.sub);
    }
  }
  
  removeToken() {
    localStorage.removeItem('token');
  }

}
