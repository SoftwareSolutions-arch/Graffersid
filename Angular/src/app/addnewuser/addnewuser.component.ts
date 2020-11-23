import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ViewUserComponent} from '../view-user/view-user.component'

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./addnewuser.component.css']
})
export class AddnewuserComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];

  allMemberData: any = [];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  userData: any = ''

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _router: Router, public dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  addNewUser() {
    console.log('addNewUser')
    this._router.navigate(['/addNewUser']);
  }

  getUser() {


    let header = new HttpHeaders({
      'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWRtaW4iOnRydWUsImlhdCI6MTYwNTg1ODEyNX0.4ajAFBVFV6796GnQnNzbY_hIiD7FXli8s-P6rKJXmac'
    })

    this.userService.getAllUser({ headers: header }).subscribe(res => {
      let response: any = res;
      console.log('response', response);
      this.allMemberData = response.memberships
    }, error => {
      // this.util.presentToast(error.message);
      console.error(error);
    })
  }

  viewDetails(listItems) {
    // console.log('listItems',listItems.membership_id);
    localStorage.setItem('userId', listItems.membership_id)
    let header = new HttpHeaders({
      'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWRtaW4iOnRydWUsImlhdCI6MTYwNTg1ODEyNX0.4ajAFBVFV6796GnQnNzbY_hIiD7FXli8s-P6rKJXmac'
    })

    this.userService.getSingleUser({ headers: header }).subscribe(res => {
      console.log('getSingleUser', res)
      let response: any = res;
      this.userData = response
      console.log('response', response);
      this.dialog.open(ViewUserComponent, {
        height: '450px',
        width: '700px',
        data: response  
      });
    }, error => {
      console.error(error);
    })
  }
}