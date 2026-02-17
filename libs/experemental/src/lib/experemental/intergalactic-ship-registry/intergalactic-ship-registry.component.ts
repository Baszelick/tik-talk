import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { DateTime } from 'luxon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

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

function futureDateValidator(control: FormControl): {[key: string]: any} | null {
  if (!control.value) return null;

  const selectedDate = DateTime.fromISO(control.value);
  const today = DateTime.now().startOf('day');

  return selectedDate > today ? { 'futureDate': true } : null;
}


function getEngine(initialValue: Engine = {}) {
  return new FormGroup({
    power: new FormControl<number>(initialValue.power ?? 0, { nonNullable: true }),
    fuelType: new FormControl<string>(initialValue.fuelType ?? ''),
  })
}

@Component({
  selector: 'tt-intergalactic-ship-registry',
  imports: [ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './intergalactic-ship-registry.component.html',
  styleUrl: './intergalactic-ship-registry.component.scss'
})
export class IntergalacticShipRegistryComponent {

  ShipClass = ShipClass;

  shipForm = new FormGroup({
    bortClass: new FormControl<ShipClass>(ShipClass.CARGO),
    bortName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    bortNumber: new FormControl('', [Validators.required, Validators.pattern((/^[A-Z]{2}-\d{3}-[A-Z]{2}$/))]),
    bortDate: new FormControl('', [Validators.required, futureDateValidator]),
    specifications: new FormArray([getEngine()]),

    typeSpecificData: new FormGroup({
      capacity: new FormControl<number>(0, [Validators.required]),
      hasSteward: new FormControl<boolean>(false),

      maxWeight: new FormControl<number>(0, [Validators.required]),
      hazardClass: new FormControl<number>(1, [Validators.required, Validators.max(9), Validators.min(1)]),

      weaponsCount: new FormControl<number>(0, [Validators.required, Validators.max(10), Validators.min(0)]),
      shieldEnergy: new FormControl<number>(0, [Validators.required, Validators.min(0), Validators.max(100)]),

      labType: new FormControl<string>('', Validators.required),
      isAIControlled: new FormControl<boolean>(false),



    })
  })


  constructor() {
    this.shipForm.controls.bortClass.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((selectedClass) => {

        const specificGroup = this.shipForm.controls.typeSpecificData;

        Object.values(specificGroup.controls).forEach(control => {
          control.clearValidators();
          control.updateValueAndValidity({ emitEvent: false }); // Чтобы не спамить событиями
        });

        if (selectedClass === ShipClass.CARGO) {
          specificGroup.controls.maxWeight.setValidators([Validators.required, Validators.min(1)]);
          specificGroup.controls.hazardClass.setValidators([Validators.required, Validators.min(1), Validators.max(9)]);
        }
        else if (selectedClass === ShipClass.PASSENGER) {
          specificGroup.controls.capacity.setValidators([Validators.required, Validators.min(1)]);
        }
        else if (selectedClass === ShipClass.FIGHTER) {
          specificGroup.controls.weaponsCount.setValidators([Validators.required, Validators.max(10)]);
          specificGroup.controls.shieldEnergy.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
        }
        else if (selectedClass === ShipClass.RESEARCH) {
          specificGroup.controls.labType.setValidators([Validators.required]);
        }

        Object.values(specificGroup.controls).forEach(control => {
          control.updateValueAndValidity({ emitEvent: false });
        });
      })

    this.shipForm.controls.bortNumber.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        if (!value) return;

        const upper = value.toUpperCase();

        if (value !== upper) {
          this.shipForm.controls.bortNumber.setValue(upper, { emitEvent: false });
        }
      });

  }

  addEngine() {
    this.shipForm.controls.specifications.push(getEngine());
  }

  deleteEngine(index: number) {
    this.shipForm.controls.specifications.removeAt(index, {emitEvent: false});
  }

  onSubmit(event: SubmitEvent) {
    this.shipForm.markAllAsTouched()
    this.shipForm.updateValueAndValidity()
    console.log(this.shipForm.value);

    if(this.shipForm.invalid) return;

    console.log('this.form.valid', this.shipForm.valid);
    console.log('this.form.getRawValue()', this.shipForm.getRawValue());
  }

}
