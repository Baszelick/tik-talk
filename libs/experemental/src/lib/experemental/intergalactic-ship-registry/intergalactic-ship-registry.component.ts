import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

export interface Engine {
  power?: number
  fuelType?: string
}

enum ShipClass {
  CARGO = 'CARGO',
  FIGHTER = 'FIGHTER',
  RESEARCH = 'RESEARCH',
  PASSENGER = 'PASSENGER',
}

function getEngine(initialValue: Engine = {}) {
  return new FormGroup({
    power: new FormControl<number>(initialValue.power ?? 0, { nonNullable: true }),
    fuelType: new FormControl<string>(initialValue.fuelType ?? ''),
  })
}

@Component({
  selector: 'tt-intergalactic-ship-registry',
  imports: [ReactiveFormsModule],
  templateUrl: './intergalactic-ship-registry.component.html',
  styleUrl: './intergalactic-ship-registry.component.scss'
})
export class IntergalacticShipRegistryComponent {

  ShipClass = ShipClass;

  shipForm = new FormGroup({
    bortName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    bortNumber: new FormControl('', [Validators.required, Validators.pattern((/^[A-Z]{2}-\d{3}-[A-Z]{2}$/))]),
    bortClass: new FormControl<ShipClass>(ShipClass.CARGO),
    bortDate: new FormControl('', [Validators.required]),
    specifications: new FormArray([getEngine()])
  })
}
