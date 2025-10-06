import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  authService = inject(AuthService)
  router = inject(Router)
  isPasswordViseble = signal<boolean>(false)

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  onSubmit() {
    if (this.form.valid) {
      this.authService.login((this.form.value as {username: string, password: string}))
        .subscribe(res =>{
          this.router.navigate(['']);
        })

    }
  }
}
