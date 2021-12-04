/**
 * UserRegistrationFormComponent allows users to create an account to access the app
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { FetchDataApiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { 
    Username: '', 
    Password: '', 
    Email: '', 
    Birthday: ''
  }

  /**
   * The following items are documented as properties
   * @param fetchApiData 
   * @param dialogRef 
   * @param snackBar 
   */
  constructor(
    public fetchApiData: FetchDataApiService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /** 
   * registerUser is a function that connects to the backend and allows the user to create a new account. 
   * It requires Username, Password, Email & Birthday for the userData to be complete
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result)=> {
      console.log(result)
      this.dialogRef.close();
      this.snackBar.open('User registration successful', 'OK',{
        duration: 2000
      });
    },(result)=>{
      this.snackBar.open('User registration successful', 'OK',{
        duration: 2000
      })
    })
  }
}
