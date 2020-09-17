import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListDriverComponent } from './list-driver.component';

describe('ListDriverComponent', () => {
  let component: ListDriverComponent;
  let fixture: ComponentFixture<ListDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDriverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
