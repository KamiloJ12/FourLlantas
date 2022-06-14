import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from './components/front/front.component';
import { HistorialComponent } from './components/historial/historial.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  {path:'', component: FrontComponent},
  {path:'historial', component: HistorialComponent},
  {path:'navbar', component: NavbarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
