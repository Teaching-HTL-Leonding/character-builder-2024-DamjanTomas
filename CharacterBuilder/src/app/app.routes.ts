import { Routes } from '@angular/router';
import { BuildComponent } from './build/build.component';

export const routes: Routes = [
  {path: 'build', component: BuildComponent},
  {path: '', redirectTo: '/build', pathMatch: 'full'}
];
