import { Component, OnInit } from '@angular/core';
import { FetchDataApiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss']
})
export class DeleteProfileComponent implements OnInit {
user: any = localStorage.getItem('Username')
  constructor(
    public fetchDataApi: FetchDataApiService,
    public snackBar: MatSnackBar,
    public router: Router,

  ) { }

  ngOnInit(): void {
  }

  deleteUser(): void {
    if (confirm('Are you sure ?')) {
      this.fetchDataApi.deleteUser(this.user).subscribe(() => { localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Account has been deleted!', 'Nice', {
          duration: 2000
        });
      });
    }
  }







}