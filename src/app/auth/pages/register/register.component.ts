import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from "sweetalert2";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  miFormulario: FormGroup = this.fb.group({
    name: ['test 1', [ Validators.required ]],
    email: ['test1@test.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
  });

  constructor( private fb: FormBuilder,
                private router: Router,
                private aS: AuthService ) { }

  register() {
    console.log(this.miFormulario.value);
    // this.router.navigateByUrl('/dashboard');

    const { name, email, password } = this.miFormulario.value;

    this.aS.register( name, email, password )
      .subscribe( ok => {
        // console.log( ok );
        if( ok === true ) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', ok, 'error');
        }
      });

  }
}
