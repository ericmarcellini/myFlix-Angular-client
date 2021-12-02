/**
 * MovieCardComponent displays the movie card UI, movie title, image, director, genre and synopsis, as well as the buttons
 */
import { Component, OnInit } from '@angular/core';
import { FetchDataApiService } from '../fetch-api-data.service';
import { MatIconModule } from '@angular/material/icon';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DescriptionCardComponent } from '../description-card/description-card.component';
import { NavbarCardComponent } from '../navbar-card/navbar-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favMovies: any[] = [];

  /**
   * The following items are documented as properties
   * @param fetchApiData 
   * @param dialog 
   * @param snackBar 
   */
  constructor(
    public fetchApiData: FetchDataApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,

    ) { }

ngOnInit(): void {
  this.getMovies();
}

  /**
  * gets movies
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }


  /**
   * Opens dialog with director information
   * @param Name 
   * @param Bio 
   * @param birthDate 
   */
  openDirectorDialog(
    Name: string,
    Bio: string,
  ): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name,
        Bio
      },
      width: '280px'
    })
  }  

  /**
   * Opens dialog with genre information
   * @param name 
   * @param description 
   */
  openGenreDialog(
    name: string,
    description: string
  ): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        name, 
        description
      },
      width: '280px'
    })
  }

  /**
   * opens dialog with synopsis information
   * @param title is the movie title
   * @param description is the description of such movie
   * @param releaseDate is the release date of such movie
   */
  openSynopsisDialog(
    title: string,
    description: string,
    releaseDate: any,
  ): void {
    this.dialog.open(DescriptionCardComponent,{
      data: {
        title,
        description,
        releaseDate,
      },
      width:'280px'
    })
  }

  getFavMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.favMovies = res.FavoriteMovies;
      return this.favMovies;
    });
  }

  addFav(id: string, Title: string): void {
    this.fetchApiData.addFav(id).subscribe((res: any) => {
      this.snackBar.open('Movie has been added to favorites', 'Nice', {
        duration: 2000,
      });
      return this.getFavMovies();
    });
  }

  removeFav(id: string, Title: string): void {
    this.fetchApiData.removeFav(id).subscribe((res: any) => {
      this.snackBar.open('Movie has been removed from favorites`', 'Nice', {
        duration: 2000,
      });
      window.location.reload();
      return this.getFavMovies();
    });
  }


  // setFavStatus(id: any): any {
  //   if (this.favMovies.includes(id)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
////////////////////////////
}


