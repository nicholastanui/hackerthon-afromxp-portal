import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfroMxpComponent } from './afro-mxp.component';

describe('AfroMxpComponent', () => {
  let component: AfroMxpComponent;
  let fixture: ComponentFixture<AfroMxpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfroMxpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfroMxpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
