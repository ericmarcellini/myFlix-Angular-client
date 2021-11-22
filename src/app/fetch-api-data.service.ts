import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflixdb1112.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  public userLogin(userCredentials: any): Observable<any> {
     console.log(userCredentials);
    return this.http.post(apiUrl + 'login', userCredentials).pipe(
      catchError(this.handleError)
    );
  }
private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }

  public getAllMovies(): Observable<any>{
    return this.http.get(apiUrl + 'movies').pipe(
      catchError(this.handleError)
    )
  }

  public getMovie(Title: string): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(
      catchError(this.handleError)
    )
  }

  public getAllDirectors(): Observable<any> {
    return this.http.get(apiUrl + 'directors').pipe(
      catchError(this.handleError)
    )
  }

  public getDirector(Name: string): Observable<any> {
    return this.http.get(apiUrl + 'directors/' + Name).pipe(
      catchError(this.handleError)
    )
  }

  public getAllGenres(): Observable<any> {
    return this.http.get(apiUrl + 'genres').pipe(
      catchError(this.handleError)
    )
  }

  public getGenre(Name: string): Observable<any> {
    return this.http.get(apiUrl + 'genres/' + Name).pipe
    (catchError(this.handleError))
  }

  public getUser(username: string): Observable<any> {
    return this.http.get(apiUrl + 'users/' + username).pipe
    (catchError(this.handleError))
  }

  public getFavMovies(username: string): Observable<any>{
    return this.http.get(apiUrl + 'users/' + username +'favorites').pipe
    (catchError(this.handleError))
  }

  //Why does my Code Editor highlight this one as wrong?
  // public addFav(username: string, movieId: string): Observable<any>{
  //   return this.http.post(apiUrl + 'users/' + username +'favorites' + movieId).pipe
  //   (catchError(this.handleError))
  // }

  public removeFav(username: string, movieId: string): Observable<any>{
    return this.http.delete(apiUrl + 'users/' + username + 'favorites' + movieId).pipe(
      catchError(this.handleError)
    )
  }
  
  public deleteUser (username: string): Observable<any>{
    return this.http.delete(apiUrl + 'users/' + username).pipe(
      catchError(this.handleError)
    )
  }

  public updateUser(username: string, userData: object): Observable<any>{
    return this.http.put(apiUrl + 'users/' + username, userData).pipe(
      catchError(this.handleError)
    )
  }
}

