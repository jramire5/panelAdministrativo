import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  username = localStorage.getItem('username');
  public checkToken(): boolean{
    const userToken = localStorage.getItem('ATO');
    if(userToken){
      return true;
    }else{
      return false;
    }
  }
}
