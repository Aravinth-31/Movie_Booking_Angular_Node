import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  islogged:boolean=false;
  constructor(private router:Router){
    this.islogged=JSON.parse(sessionStorage.getItem('logged'))||false;
    // window.location.reload();
  }

  redirect() {
    console.log("movies");
    this.router.navigate(['./movies']);
  }
  redirectLogin() {
    console.log("login");
    this.router.navigate(['./login']);
  }
  redirectAccount(){
    console.log("account");
    this.router.navigate(['./account']);
  }
  logOut(){
    sessionStorage.setItem("logged",JSON.stringify(false));
    sessionStorage.setItem("userEmail",JSON.stringify(""));
    window.location.replace("http://localhost:4200/movies");
  }
}
