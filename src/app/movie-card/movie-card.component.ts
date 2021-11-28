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
  user: any = JSON.parse(localStorage.getItem('user') || '');
  movies: any[] = [];
  favMovies: any[] = [];

  constructor(
    public fetchApiData: FetchDataApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

ngOnInit(): void {
  this.getMovies();
}

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }



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
