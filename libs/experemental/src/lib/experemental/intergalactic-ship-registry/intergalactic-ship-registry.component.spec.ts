import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntergalacticShipRegistryComponent } from './intergalactic-ship-registry.component';

describe('IntergalacticShipRegistryComponent', () => {
  let component: IntergalacticShipRegistryComponent;
  let fixture: ComponentFixture<IntergalacticShipRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntergalacticShipRegistryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntergalacticShipRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
