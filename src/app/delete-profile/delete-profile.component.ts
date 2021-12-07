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
    this.fetchDataApi.deleteUser(this.user.Username).subscribe(
      () => {
        this.snackBar.open(
          `Your Account has been deleted`,
          'Nice',
          {
            duration: 2000,
          }
        );
        localStorage.clear();
      },
      (result) => {
        this.snackBar.open('uh Oh it doesnt work', 'Ok', {
          duration: 2000,
        });
        this.router.navigate(['/welcome']).then(() => {
          window.location.reload();
        });
      }
    );
  }








}