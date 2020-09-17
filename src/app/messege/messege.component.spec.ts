import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessegeComponent } from './messege.component';

describe('MessegeComponent', () => {
  let component: MessegeComponent;
  let fixture: ComponentFixture<MessegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessegeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
