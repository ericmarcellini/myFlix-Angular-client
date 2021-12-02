/**
 * ProfilePageComponent allows user to access their profile, check their information as well as favorite movies
 */
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FetchDataApiService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  favMovies: any = {};
  /**
   * The following items are documented as properties
   * @param fetchDataApi 
   * @param snackBar 
   * @param dialog 
   * @param router 
   */
  constructor(
    public fetchDataApi: FetchDataApiService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Retrieves users information from the backend
   */
  getUserInfo(): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchDataApi.getUser(user.Username).subscribe((res: any) => {
      this.user = res
    });
  }

  /**
   * gets your list of favorite movies from the backend
   * @returns users favMovies list
   */
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

  /**
   * Opens the DeleteProfileComponent which is used to delete your profile from the apps backend
   */
  openDeleteProfileDialog(): void {
    this.dialog.open(DeleteProfileComponent, {
      width: '280px',
    });
  }

  /**
   * Opens the EditProfileComponent which is used to update your profile
   */
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '500px',
    });
  }

  addFav(id: string, Title: string): void {
    this.fetchDataApi.addFav(id).subscribe((res: any) => {
      this.snackBar.open('Movie has been added to favorites', 'Nice', {
        duration: 2000,
      });
      return this.getFavMovies();
    });
  }

  removeFav(id: string, Title: string): void {
    this.fetchDataApi.removeFav(id).subscribe((res: any) => {
      this.snackBar.open('Movie has been removed from favorites`', 'Nice', {
        duration: 2000,
      });
      window.location.reload();
      return this.getFavMovies();
    });
  }


}
