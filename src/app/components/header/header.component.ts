import { Component, Input } from '@angular/core';
import { LoginService } from 'src/app/services/pages/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private loginSvc: LoginService){}

onLogout(): void{
this.loginSvc.logout()
}
public checkToken(): boolean{
  const userToken = localStorage.getItem('ATO');
  if(userToken){
    return true;
  }else{
    return false;
  }
}
}


