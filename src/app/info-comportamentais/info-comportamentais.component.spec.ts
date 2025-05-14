import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoComportamentaisComponent } from './info-comportamentais.component';

describe('InfoComportamentaisComponent', () => {
  let component: InfoComportamentaisComponent;
  let fixture: ComponentFixture<InfoComportamentaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoComportamentaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoComportamentaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
