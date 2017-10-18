import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  username: string;
  password: string;
  passwordR: string;
  
  registerform: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registerform = this.fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'passwordR': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

}
