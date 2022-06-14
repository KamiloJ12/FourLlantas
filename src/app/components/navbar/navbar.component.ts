import { Component, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { Router } from '@angular/router';

interface SideNavToggle {
  collapsed: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();   
  public navData: Array<any> = navbarData;
  public collapsed = true;
  public searchInput = '';
  public nombreUsuario: any = '';

  constructor(private _router : Router) { }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('usuario_nombre');
  }

  toogleOnClick():void {
    this.collapsed = !this.collapsed; 
    this.onToggleSideNav.emit({collapsed: this.collapsed});
  }

  searchOnClick():void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed});
  }

  switchOnClick():void {
    const body = document.querySelector('body');
    let modeText = document.querySelector(".mode-text");
    body?.classList.toggle("dark");
    
    if(modeText != null){
      if(body?.classList.contains("dark")){
        modeText.textContent = "Modo Claro"; 
      }else{
        modeText.textContent = "Modo Oscuro";   
      }
    }
  
  }

  search(event: any): void{
    if(event.target.value){
      this.navData = navbarData.filter( (element: any) => {
        return element.label.toLowerCase().includes(event.target.value.toLowerCase());
      });
    }else{
      this.navData = navbarData;
    } 
  }

  logout(): void{
    localStorage.clear();
    this._router.navigate(['']);
  }

}
