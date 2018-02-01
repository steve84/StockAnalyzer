import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import { JwtHelper, AuthHttp, tokenNotExpired } from 'angular2-jwt';

import { MenuItem } from 'primeng/primeng';

import 'rxjs/add/operator/map';

import { environment } from './../environments/environment';

import { HelperService } from './helper.service';

import { CommonTranslationPipe } from './stock/common_translation.pipe';

@Injectable()
export class UserService {

  username: string;
  roles: string;
  userId: number;
  
  compareIds: number[] = [];
  compareKey: string = 'compare';

  commonTranslationPipe: CommonTranslationPipe = new CommonTranslationPipe('en_US');
  constructor(private http: Http,
              private authHttp: AuthHttp,
              private router: Router,
              private helperService: HelperService,
              @Inject(LOCALE_ID) private locale: string) {
    this.decodeToken();
    if (this.helperService.isKeyInLocalStorage(this.compareKey)) {
      this.compareIds = this.helperService.getLocalStorageItem(this.compareKey);
    }
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
    let params = new URLSearchParams();
    params.set("username", username);
    return this.http.post(environment.apiUrl + "/user/password/reset", null, {search: params});
  }
  
  changePassword(userId: number, oldPassword: string, newPassword: string) {
      let body = {'oldPassword': oldPassword, 'newPassword': newPassword};
      let headers = new Headers({'Content-Type': 'application/json'});
      return this.authHttp.post(environment.apiUrl + "/user/password/change/" + userId.toString() + "/", JSON.stringify(body), {headers: headers});
  }

  checkUsername(username: string) {
    let params = new URLSearchParams();
    params.set("username", username);
    return this.http.get(environment.apiUrl + "/user/search/existsByUsername", {search: params});  
  }
  
  getUserById(userId: number) {
    return this.authHttp.get(environment.apiUrl + "/user/get/" + userId.toString());
  }
  
  saveUser(user: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.authHttp.post(environment.apiUrl + "/user/save", JSON.stringify(user), {headers: headers});
  }
  
  addCard(userId: number, token: string) {
    return this.authHttp.post(environment.apiUrl + "/user/addcard/" + userId.toString(), token);
  }
  
  logout() {
    this.removeToken();
    this.setUsername(null);
    this.setRoles(null);
    this.setUserId(null);
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
  
  getUserId(): number {
    return this.userId;
  }
  
  setUserId(id: number) {
    this.userId = id;
  }
  
  decodeToken() {
    let token = localStorage.getItem('token');
    let jwtHelper = new JwtHelper();
    if (token) {
      let decodedToken = jwtHelper.decodeToken(token);
      this.setUsername(decodedToken.sub);
      this.setRoles(decodedToken.roles);
      this.setUserId(decodedToken.id);
    }
  }
  
  getToken() {
    return localStorage.getItem('token');
  }
  
  removeToken() {
    localStorage.removeItem('token');
  }
  
  isLoggedIn() {
    return this.getUsername() && this.getUsername().length > 0 && tokenNotExpired();
  }

  compare() {
    this.router.navigate(['/compare']);
  }
  
  addCompare(stockId: number) {
    this.compareIds.push(stockId);
    this.helperService.setLocalStorageItem(this.compareKey, this.compareIds);
  }
  
  removeCompare(stockId: number) {
    this.compareIds.splice(this.compareIds.indexOf(stockId), 1);
    this.helperService.setLocalStorageItem(this.compareKey, this.compareIds);
  }
  
  resetCompare() {
    this.compareIds = [];
    this.helperService.setLocalStorageItem(this.compareKey, this.compareIds);
  }
  
  getCompareSize(): number {
    return this.compareIds.length;
  }
  
  getCompareLabel() {
    return this.commonTranslationPipe.transform("Compare selection", this.locale) + " (" + this.getCompareSize() + ")";
  }
  
  getCompareItems(): MenuItem[] {
    if (this.compareIds && this.compareIds.length > 0)
      return [{label: this.commonTranslationPipe.transform("Cancel selection", this.locale), icon: 'fa-ban', command: () => { this.resetCompare(); }}];
  }
  
  isStockInCompare(stockId: number): boolean {
    return this.compareIds.indexOf(stockId) > -1;
  }
}
