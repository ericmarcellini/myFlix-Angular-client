/**
 * EditProfileComponent allows users to update their profile info
 */
import { Component, Inject, OnInit, Input } from '@angular/core';
import { FetchDataApiService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})


export class EditProfileComponent implements OnInit {
  // loads user data from local storage
  user: any = JSON.parse(localStorage.getItem('user') || '');

  /**
   * connects the form values with the userData
   */
  @Input() userData = {
    Username: this.user.Username,
    Password: '',
    Email: this.user.Email,
    BirthDate: this.user.BirthDate,
  };
  /**
   * all items are set as properties
   * @param data 
   * @param fetchApiData 
   * @param dialogRef 
   * @param snackBar 
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { onSuccess: () => void },
    public fetchApiData: FetchDataApiService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
  ) { }

  // dont delete
  ngOnInit(): void {
  }
  /**
   * this is the updateUser function, it updates the users data and sends it to the backend MOVIEAPI
   */
  updateUser(): void {
    this.fetchApiData.updateUser(this.user.Username, this.userData).subscribe((res) =>{
      this.dialogRef.close();
      localStorage.setItem('user', JSON.stringify(res));
      this.snackBar.open('Profile updated!','Nice ', {
        duration: 2000,
      })
      setTimeout(()=> {
        window.location.reload();
      })
    })
  }
}
