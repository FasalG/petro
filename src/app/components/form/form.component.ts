import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessengerService } from '../../services/messenger.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent  implements OnInit{

  userForm: FormGroup;
  @Output() userdetails = new EventEmitter<FormGroup>();
  users:any[]=[]
  @Output()  editingIndex = new EventEmitter<any>();


  constructor(private fb: FormBuilder,
              private messenger:MessengerService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      salary: ['', [Validators.required,Validators.min(1)]],
    });


    setInterval(() => {
      if (this.userForm.valid) {
        this.userdetails.emit(this.userForm)
        // this.users.push(this.userForm.value)
      }
      
    }, 1000);
  }


  ngOnInit(): void {
    // messsenger

    this.messenger.getEdituserinfo().subscribe((user:any)=>{

          this.editUser(user.i,user.user)

    })
  }



  

  editUser(index: number,user:any) {
    console.log(user)
    this.editingIndex.emit(index);
    this.userForm.patchValue(user[index]);
  }

}
