import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaProfissionalComponent } from './experiencia-profissional.component';

describe('ExperienciaProfissionalComponent', () => {
  let component: ExperienciaProfissionalComponent;
  let fixture: ComponentFixture<ExperienciaProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienciaProfissionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciaProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
