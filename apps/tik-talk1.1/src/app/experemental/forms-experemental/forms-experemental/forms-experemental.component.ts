import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

function getAddressForm() {
  return new FormGroup({
    city: new FormControl<string>(''),
    street: new FormControl<string>(''),
    building: new FormControl<number | null>(null),
    apartment: new FormControl<number | null>(null),
  });
}

const validateStartWith: ValidatorFn = (control: AbstractControl) => {
  return control.value.startsWith('я')
    ? { startWith: 'я - последняя буква алфавита' }
    : null;
};

@Component({
  selector: 'app-forms-experemental',
  imports: [ReactiveFormsModule],
  templateUrl: './forms-experemental.component.html',
  styleUrl: './forms-experemental.component.scss',
})
export class FormsExperementalComponent {
  ReceiverType = ReceiverType;

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', Validators.required),
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    addresses: new FormArray([getAddressForm()]),
  });

  constructor() {
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
