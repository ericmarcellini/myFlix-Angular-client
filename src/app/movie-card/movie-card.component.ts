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

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  //user: any = JSON.parse(localStorage.getItem('user') || '');
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
    birthDate: any,
  ): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name,
        Bio,
        birthDate
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
    description: string,
  ): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        name, 
        description,
      },
      width: '280px'
    })
  }

}
