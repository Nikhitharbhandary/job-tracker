import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewjobs } from './viewjobs';

describe('Viewjobs', () => {
  let component: Viewjobs;
  let fixture: ComponentFixture<Viewjobs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewjobs],
    }).compileComponents();

    fixture = TestBed.createComponent(Viewjobs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
