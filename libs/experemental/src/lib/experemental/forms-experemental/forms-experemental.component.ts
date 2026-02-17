import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup, FormRecord,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {MockAddressService} from "./mock-address.service";
import {Address, Feature} from "./address.interface";
import {KeyValuePipe} from "@angular/common";
import {IntergalacticShipRegistryComponent} from "../intergalactic-ship-registry/intergalactic-ship-registry.component";

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

function getAddressForm(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null),
  });
}

const validateStartWith: ValidatorFn = (control: AbstractControl) => {
  return control.value.startsWith('я')
    ? { startWith: 'я - последняя буква алфавита' }
    : null;
};

@Component({
  selector: 'app-forms-experemental',
  imports: [ReactiveFormsModule, KeyValuePipe, IntergalacticShipRegistryComponent],
  templateUrl: './forms-experemental.component.html',
  styleUrl: './forms-experemental.component.scss',
})
export class FormsExperimentalComponent {

  addressService = inject(MockAddressService)

  ReceiverType = ReceiverType;

  features: Feature[] = [];

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', Validators.required),
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    addresses: new FormArray([getAddressForm()]),
    feature: new FormRecord({})
  });

  constructor() {
    this.addressService.getAddresses()
        .pipe(takeUntilDestroyed())
        .subscribe(addrs => {
          this.form.controls.addresses.clear();

          for(const  addr of addrs) {
            this.form.controls.addresses.push(getAddressForm(addr))
          }
          // console.log(this.form.controls.addresses.at(0));
        })

    this.addressService.getFeature()
        .pipe(takeUntilDestroyed())
        .subscribe(feature => {
          this.features = feature;

          for(const  feature of this.features) {
            this.form.controls.feature.addControl(
                feature.code,
                new FormControl(feature.value)
            )
          }
        })

    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.form.controls.inn.clearValidators();
        if (value === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]);
        }
      });
  }

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    console.log('this.form.valid', this.form.valid);
    console.log('this.form.getRawValue()', this.form.getRawValue());
  }

  addAddress() {
    this.form.controls.addresses.push(getAddressForm());
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }



}
