/**
 * NavbarCardComponent allows us to display a navbar
 */
 import { Component } from '@angular/core';
 import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
 import { Observable } from 'rxjs';
 import { map, shareReplay } from 'rxjs/operators';
 import { Router } from '@angular/router';
 import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar-card',
  templateUrl: './navbar-card.component.html',
  styleUrls: ['./navbar-card.component.scss']
})
export class NavbarCardComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  /**
   * All constructor items are documented as properties
   * @ignore
   */
  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

}