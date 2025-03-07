import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
// import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';


export const routes: Routes = [

    {path:'',component:AdminhomeComponent, canActivate:[AuthGuard]},
    {path:'login',component:LoginComponent}
];
