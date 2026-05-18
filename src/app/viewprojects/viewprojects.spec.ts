import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewprojects } from './viewprojects';

describe('Viewprojects', () => {
  let component: Viewprojects;
  let fixture: ComponentFixture<Viewprojects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewprojects],
    }).compileComponents();

    fixture = TestBed.createComponent(Viewprojects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
