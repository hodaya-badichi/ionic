import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapOfTravelComponent } from './map-of-travel.component';

describe('MapOfTravelComponent', () => {
  let component: MapOfTravelComponent;
  let fixture: ComponentFixture<MapOfTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOfTravelComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapOfTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
