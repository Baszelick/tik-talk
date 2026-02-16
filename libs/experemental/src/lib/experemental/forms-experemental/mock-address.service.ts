
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Address, Feature} from "./address.interface";


@Injectable({
    providedIn: 'root'
})
export class MockAddressService {

    // Тестовые данные, соответствующие вашей форме
    private mockAddresses: Address[] = [
        {
            city: 'Москва',
            street: 'Тверская',
            building: 15,
            apartment: 45
        },
        {
            city: 'Санкт-Петербург',
            street: 'Невский проспект',
            building: 28,
            apartment: 12
        },
        {
            city: 'Казань',
            street: 'Баумана',
            building: 7,
            apartment: 5
        },
        {
            city: 'Екатеринбург',
            street: 'Ленина',
            building: 50,
            apartment: null
        },
    ];


    getAddresses(): Observable<Address[]> {
        return of(this.mockAddresses);
    }


    getAddressesByCity(city: string): Observable<Address[]> {
        if (!city) {
            return of(this.mockAddresses);
        }

        const filtered: Address[] = this.mockAddresses.filter((a: Address) => {
            // ВАЖНО: Проверяем, что a.city существует перед вызовом toLowerCase()
            if (a.city) {
                return a.city.toLowerCase().includes(city.toLowerCase());
            }
            return false; // если city отсутствует, не включаем в результат
        });

        return of(filtered);
    }
        getFeature(): Observable<Feature[]> {
            return of([
                {
                    code: 'lift',
                    label: 'подъем на этаж',
                    value: true
                },
                {
                    code: 'strong-package',
                    label: 'усиленная упаковка',
                    value: true
                },
                {
                    code: 'fast',
                    label: 'ускоренная доставка',
                    value: false
                },
            ])
        }
    }





