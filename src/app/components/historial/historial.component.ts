import { Component, OnInit } from '@angular/core';

import { UsuarioService } from 'src/app/services/usuario.service';

interface SideNavToggle {
  collapsed: boolean;
}

declare var iziToast: any;

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  public isSideNavCollapsed = true;
  public servicios: any = [];
  public usuarioId: any = '';

  constructor(private _usuarioService: UsuarioService) {
    this.usuarioId = localStorage.getItem('usuario_id');
  }

  ngOnInit(): void {
    this._usuarioService.getHistorialByCliente(this.usuarioId).subscribe(
      response => {
        this.servicios = response;
        console.log(this.servicios);
      },
      error => {
        iziToast.show({
          backgroundColor: '#dc3424',
          class: 'text-danger',
          position: 'topRight',
          message: 'Ocurrio un error en el servidor',
          messageColor: '#FFFFFF',
          progressBarColor: '#FFFFFF'
        });
      }
    );
  }

  onToggleSideNav(data: SideNavToggle): void{
    this.isSideNavCollapsed = data.collapsed;
  }

  convertirFecha(fecha:string): string{
    return fecha.substring(0, 10);
  }

  toUpperCase(str: string): string{
    return str.toUpperCase();
  }
  
  parseMoney(str: string): string{
    let money = Number(str);
    return money.toLocaleString("es-CO");
  }
}
