import { Component, Input, input, OnInit } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { NgFor } from '@angular/common';
import { FormGroup,FormsModule,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor,FormsModule,ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{

  @Input() users: any[] = [];
 


  constructor(
    private messenger:MessengerService
  ){

  }

  
  filteredUsers:any; // Copy of users for filtering
  searchName: string = '';

  filterUsers() {
    
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchName.toLowerCase())
    );

    if (this.filteredUsers.length>0) {
      this.users=this.filteredUsers
      
    }
    else{
      const data = localStorage.getItem('users')
      let userDetails :any=null
      if(data){
          userDetails= JSON.parse(data);
          console.log(userDetails)
          this.users=userDetails
      }
      
    }




    
  }



  ngOnInit(): void {
    



    // messengers
    // this.messenger.getUserdata().subscribe((data:any)=>{
    //     this.users=data

    //     })
    
  }



  // Edit user
  editUser(index: number) {
    let user={
        i:index,
        user:this.users
    }
    this.messenger.sendEdituserinfo(user)
    
  }

  // Delete user
  deleteUser(index: number) {
    this.users.splice(index, 1);
  }




}
