import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetersComponent } from './tweeters.component';

describe('TweetersComponent', () => {
  let component: TweetersComponent;
  let fixture: ComponentFixture<TweetersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
