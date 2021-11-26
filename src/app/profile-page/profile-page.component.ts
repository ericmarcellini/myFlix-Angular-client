import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FetchDataApiService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  favMovies: any = {};
  constructor(
    public fetchDataApi: FetchDataApiService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchDataApi.getUser(user.Username).subscribe((res: any) => {
      this.user = res
    });
  }

  
  getFavMovies(): void {
    let movies: any[] = [];
    this.fetchDataApi.getAllMovies().subscribe((res: any) => {
      movies = res;
      movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favMovies.push(movie);
        }
      });
    });
    return this.favMovies;
  }

  // deleteUser(): void {
  //   this.dialog.open(ProfileDeleteComponent, {
  //     width: '280px',
  //   });
  // }

  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '500px',
    });
  }


}
