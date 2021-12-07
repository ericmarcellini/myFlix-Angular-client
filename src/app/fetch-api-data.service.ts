import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflixdb1112.herokuapp.com/';
const token = localStorage.getItem('token');
const user = localStorage.getItem('Username');

@Injectable({
  providedIn: 'root'
})
export class FetchDataApiService { 
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 /**
  * Making the api call for the user registration endpoint 
  * */ 
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'users', userData).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * post request that calls the /login endpoint
   * @param userData is the information being sent to the backend
   * @returns tokens
   */
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

  /**
   * Calls the /movies endpoint
   * @returns a list of all the movies available
   */
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

  /**
   * get request to the /movies endpoint + @param
   * this is to get a specific movie
   * @param title movie title
   * @returns specific movie listed
   */
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

  /**
   * get request to the /genres endpoint + @param
   * this is to get a specific genre
   * @param name which is the name of the genre
   * @returns specific genre 
   */
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

  /**
   * get request that gets a specifics users information
   * @param username 
   * @returns a specific users information
   */
  public getUser(username: any): Observable<any> {
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
  /**
   * get request to the /users endpoint.
   * adds '/favorites' to the end of the url to display a users favorite movie list
   * @param username 
   * @returns 
   */
  public getFavMovies(): Observable<any> {
    return this.http.get(apiUrl + `users/${user}/movies`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * put request. /users endpoint + "username" + /favorites "movieID"
   * @param username Username of the person adding the movie to favorites
   * @param movieId ID of the movie we're adding to favorites
   * @returns 
   */
  public addFav(id: string): Observable<any> {
    return this.http.post(apiUrl + `users/${user}/movies/${id}`, id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * delete request. /users endpoint + "username" + /favorites "movieID"
   * @param username Username of the person removing the movie to favorites
   * @param movieId ID of the movie we're removing to favorites
   * @returns 
   */
   removeFav(id: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${user}/movies/${id}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  /**
   * Delete request to the /users endpoint + "username" + /deregister. 
   * This function deletes your account
   * @param username this refers to the account we wish to delete
   * @returns 
   */
  deleteUser(): Observable<any> {
    return this.http.delete(apiUrl + `users/${user}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * PUT request to /users endpoint + "username"
   * this function updates your user data like username, password & email
   * @param username username we wish to update/edit
   * @param updatedInfo Updated user information that we're going to update
   * @returns 
   */
  updateUser(Username: string, userData: any): Observable<any> {
    return this.http.put(apiUrl + `users/`+ Username, userData, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}

