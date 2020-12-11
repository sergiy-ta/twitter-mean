import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetGetListComponent } from './tweet-get-list.component';

describe('TweetGetListComponent', () => {
  let component: TweetGetListComponent;
  let fixture: ComponentFixture<TweetGetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetGetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetGetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
