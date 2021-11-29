/**
 * LoginFormComponent is for users to log into the app
 */
import { Component,Input ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchDataApiService } from '../fetch-api-data.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  @Input() userData = { Username:'', Password:''}
  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchDataApiService, //
  ) { }

  ngOnInit(): void {
  }

  /**
   * loginUser function logs in the user by sending a request to the backend with the userData (username & password).
   * Then it redirects the user to the /movies tab
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close();
      localStorage.setItem('username', result.user.username);
      localStorage.setItem('token', result.token);
      
      console.log(result);
      this.snackBar.open('Login successful', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      })
    })
  }

}
