import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from './login-form/login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

constructor(public dialog: MatDialog) { }
openUserRegistrationDialog(): void {
  this.dialog.open(UserRegistrationFormComponent, {
    width: '480px'
  })
}

openUserLoginDialog(): void {
  this.dialog.open(LoginFormComponent, {
    width: '480px'
  })
}
}