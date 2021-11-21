import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AngularFireAuthGuard} from '@angular/fire/compat/auth-guard';
import {MsalGuard} from "@azure/msal-angular";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [MsalGuard]
})
export class AppRoutingModule { }
