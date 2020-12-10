import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitteCreateComponent } from './twitte-create.component';

describe('TwitteCreateComponent', () => {
  let component: TwitteCreateComponent;
  let fixture: ComponentFixture<TwitteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitteCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
