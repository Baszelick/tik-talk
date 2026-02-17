import {
  Component,
  DestroyRef,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TtInputComponent } from '../tt-input/tt-input.component';
import { DadataService } from '../../data';
import { debounceTime, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-address-input',
  imports: [TtInputComponent, ReactiveFormsModule, AsyncPipe],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent),
    },
  ],
})
export class AddressInputComponent implements ControlValueAccessor {

  innerSearchControl = new FormControl();

  destroyRef = inject(DestroyRef)
  #dadataService = inject(DadataService);

  isDropdownOpened = signal<boolean>(true)

  suggestion$ = this.innerSearchControl.valueChanges.pipe(
    debounceTime(500),
    switchMap((val) => {
      return this.#dadataService.getSuggestions(val)
        .pipe(
          tap(res => {
            this.isDropdownOpened.set(!!res.length)
          })
        )
    })
  );

  writeValue(city: string | null): void {
    this.innerSearchControl.patchValue(city, {
      emitEvent: false
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  onChange(value: any): void {}

  onTouched(): void {}

  onSuggestionPick(city: string): void {
    this.isDropdownOpened.set(false)
    this.innerSearchControl.patchValue(city, {
      emitEvent: false
    })
    this.onChange(city);
  }

  ngOnInit() {
    this.innerSearchControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.onChange(value);
        this.onTouched()
      })
  }


}

