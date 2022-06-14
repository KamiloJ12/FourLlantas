import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

declare var iziToast: any; 

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  public usuario: any = {
    tipo: 1
  };
  
  constructor( private _usuarioService: UsuarioService, private _router: Router ) { }

  ngOnInit(): void {
    if(localStorage.getItem('usuario_id')){
      this._router.navigate(['/historial']); 
    }
  }

  login(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log(this.usuario);
      this._usuarioService.login(this.usuario).subscribe(
        response => {
          if(typeof response == "object"){
            console.log(response);
            localStorage.setItem('usuario_id', response.id);
            localStorage.setItem('usuario_nombre', response.nombres + ' ' + response.apellidos);
            localStorage.setItem('usuario_correo', response.correo);
            localStorage.setItem('usuario_telefono', response.telefono);
            this._router.navigate(['/historial']); 
          }
          else{
            iziToast.show({
              backgroundColor: '#dc3424',
              class: 'text-danger',
              position: 'topRight',
              message: response,
              messageColor: '#FFFFFF',
              progressBarColor: '#FFFFFF'
            });
          }
        },
        error => {
          console.error(error);
          iziToast.show({
            backgroundColor: '#dc3424',
            class: 'text-danger',
            position: 'topRight',
            message: error,
            messageColor: '#FFFFFF',
            progressBarColor: '#FFFFFF'
          });
        }
      );
    }else {
      iziToast.show({
        backgroundColor: '#dc3424',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos',
        messageColor: '#FFFFFF',
        progressBarColor: '#FFFFFF'
      });
    }
 
  }

}
