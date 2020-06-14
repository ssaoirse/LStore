import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRatingPage } from './add-rating.page';

describe('AddRatingPage', () => {
  let component: AddRatingPage;
  let fixture: ComponentFixture<AddRatingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRatingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
