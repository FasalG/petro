import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from '../../components/form/form.component';
import { TableComponent } from '../../components/table/table.component';
import { MessengerService } from '../../services/messenger.service';

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule,FormComponent,TableComponent,FormsModule, NgFor],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.scss'
})
export class AdminhomeComponent implements OnInit{

 

  registerform:boolean=true
  chat:boolean=false
  userForm: any;
  users: any[]=[];
  editingIndex: number | null = null;
  usersDuplicate: any[]=[];

  // cahtconsole
  chatinput:any
  chatlist:any[]=[]

  constructor(private messenger:MessengerService){

  }
  

  updateUserDetails(e:any){
    console.log(e)
  }




  ngOnInit(): void {

    this.messenger.getChat().subscribe((d:any)=>{
        this.chatlist.push(d)
    })


    this.messenger.getUserdata().subscribe((d:any)=>{
          console.log(d)
    })


    this.loadChat(); 

   
    window.addEventListener('storage', (event) => {
      if (event.key === 'chatMessages') {
        this.loadChat(); 
      }
    });
    
  }

  userdataemitted(e:FormGroup){
    console.log(e)
    this.userForm=e
   
  }

  editingindexvalueEmitted(e:any){
    this.editingIndex=e
  }


   // Add or update user
   saveUser() {
    if (this.userForm.valid) {
      if (this.editingIndex === null) {
        console.log(this.userForm.value)
        // this.users=this.usersDuplicate
        // Add new user
        const newUser = {
          id: this.users.length + 1,
          ...this.userForm.value
        };
        this.users.push(newUser);

        localStorage.setItem('users',JSON.stringify(this.users))
        // this.userdetails.emit(this.users);
        // this.messenger.sendUserdata(this.users)
      } else {
        // Update existing user
        this.users[this.editingIndex] = { id: this.users[this.editingIndex].id, ...this.userForm.value };
        this.editingIndex = null;
      }
      this.userForm.reset();
    }
  }


  navclick(name:string){
      if(name=='register'){
          this.registerform=true
          this.chat=false
      }
      else{
          this.chat=true
          this.registerform=false
      }
  }

  onUserReceived(event:any){
    console.log(event)

  }



  chatsend(){
   
    if (!this.chatinput.trim()) return;

    
    this.chatlist.push(this.chatinput);
    localStorage.setItem('chatMessages', JSON.stringify(this.chatlist));
    this.chatinput = ''; 
  }

  loadChat() {
    const storedChat = localStorage.getItem('chatMessages');
    this.chatlist = storedChat ? JSON.parse(storedChat) : [];
  }

  

}
