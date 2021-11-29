import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCardComponent } from './navbar-card.component';

describe('NavbarCardComponent', () => {
  let component: NavbarCardComponent;
  let fixture: ComponentFixture<NavbarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
