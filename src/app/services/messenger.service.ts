import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor() { }

  userdata=new Subject()
  edituser=new Subject()

  chat=new Subject()







  sendUserdata(d:any){
    this.userdata.next(d)
  }

  getUserdata(){
    return this.userdata.asObservable()
  }

  sendEdituserinfo(d:any){
      this.edituser.next(d)
  } 

  getEdituserinfo(){
    return this.edituser.asObservable()
  }


  sendChat(d:any){
      this.chat.next(d)
  }

  getChat(){
    return this.chat.asObservable()
  }



}
