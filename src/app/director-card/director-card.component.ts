import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public Director: {
      name: string;
      bio: string;
      birthDate: any;
      deathDate: any;
    }
  ) {}

  ngOnInit(): void {
  }

}
