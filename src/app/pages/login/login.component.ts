import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnyARecord } from 'node:dns';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router:Router){

  }

  name:string=''
  password:string=''


  login(){
    

    console.log(this.name,this.password)
    if (this.name==='fasal'&&this.password==='1234') {

      console.log('login worked')

      let user:any={
        name:this.name,
        password:this.password
      }

      localStorage.setItem('userdetails', JSON.stringify(user));


      this.router.navigate([''])


      
    }
  }

}
