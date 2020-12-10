import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitteGetListComponent } from './twitte-get-list.component';

describe('TwitteGetListComponent', () => {
  let component: TwitteGetListComponent;
  let fixture: ComponentFixture<TwitteGetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitteGetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitteGetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
