import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './post/create/create.component';
import { EditComponent } from './post/edit/edit.component';
import { IndexComponent } from './post/index/index.component';
import { ViewComponent } from './post/view/view.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full',redirectTo:"" },
  { path: 'login', component: LoginComponent },
  { path: 'post/view', component: ViewComponent },
  { path: 'post/create', component: CreateComponent },
  { path: 'post/edit', component: EditComponent }


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
