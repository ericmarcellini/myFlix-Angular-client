import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflixdb1112.herokuapp.com/';
const token = localStorage.getItem('token');
const headers ={
    headers: new HttpHeaders({
      Authorization: 'Bearer' + token,
})};

@Injectable({
  providedIn: 'root'
})
export class FetchDataApiService { 
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'users', userData).pipe(
    catchError(this.handleError)
    );
  }

  public userLogin(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const { Username, Password } = userData
     console.log(userData);
    return this.http.post(apiUrl + 
      'login?Username=' + 
      Username + '&Password=' + 
      Password, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError));
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
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'genres/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getFavMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'users/' + username + '/favorites',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public addFav(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.post(apiUrl + 'users/' + username + '/favorites/' + movieId,
        {},{
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
          responseType: 'text',
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));

    return response;
  }

  public removeFav(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.delete(apiUrl + 'users/' + username + '/favorites/' + movieId,{
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      }
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.delete(apiUrl + 'users/' + username + '/deregister',{
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
    return response.pipe(catchError(this.handleError));
  }

  public updateUser(username: string, updatedInfo: object): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.put(apiUrl + 'users/' + username, updatedInfo, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}

