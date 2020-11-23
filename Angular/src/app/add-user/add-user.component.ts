import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUser: FormGroup;
  error_messages: any = '';
  constructor(public formBuilder: FormBuilder, private userService: UserService) {
    this.setupLoginFormData();
  }

  ngOnInit() {
  }

  setupLoginFormData() {
    this.error_messages = {
      name: [
        { type: "required", message: "Name is required." },
      ],
      mobile: [
        { type: "required", message: "Mobile Number is required." },
      ],
      email: [
        { type: "required", message: "Email is required." },
      ],
      address: [
        { type: "required", message: "Address is required." },
      ],
      city: [
        { type: "required", message: "City is required." },
      ],
      country: [
        { type: "required", message: "Country is required." },
      ],
      zipcode: [
        { type: "required", message: "ZipCode is required." },
      ]
    };
    this.addUser = this.formBuilder.group(
      {
        name: new FormControl("",
          Validators.compose([
            Validators.required
          ])),
        mobile: new FormControl("",
          Validators.compose([
            Validators.required
          ])),
        email: new FormControl("",
          Validators.compose([
            Validators.required
          ])),
        address: new FormControl("",
          Validators.compose([
            Validators.required
          ])),
        city: new FormControl("",
          Validators.compose([
            Validators.required
          ])),
        country: new FormControl("",
          Validators.compose([
            Validators.required
          ])),
        zipcode: new FormControl("",
          Validators.compose([
            Validators.required
          ]))
      })
  }

  addNewUser() {

    let formData = {
      "name": this.addUser.value.name,
      "mobile": this.addUser.value.mobile,
      "email": this.addUser.value.email,
      "address": this.addUser.value.address,
      "city": this.addUser.value.city,
      "country": this.addUser.value.country,
      "zipcode": this.addUser.value.zipcode
    }

    console.log('formdata',formData);

    this.userService.createUser(formData).subscribe(res => {
      console.log('res', res);
      let response: any = res;
      console.log('response', response);
    }, error => {
      // this.util.presentToast(error.message);
      console.error(error);
    })
  }
}
