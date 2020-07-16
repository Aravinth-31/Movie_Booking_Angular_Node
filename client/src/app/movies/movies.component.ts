import { Component, OnInit } from '@angular/core';
import { Reserve } from './Reserve';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  location: string = "";
  date: string = '';
  showtime: string = '';
  name: string = '';

  logged:boolean=false;
  userEmail:string;

  flag:boolean=false;
  movies: any = [];
  theatres: any;
  noOfSeats: number = 0;
  price: number = 250;
  seats: string[] = [];
  movie: any;
  locations: any;

  constructor(private router: Router, private http: HttpClient) {
    this.getMovies();
    http.get("http://localhost:3000/locations")
      .subscribe(data => {
        this.locations = data;
      });
    this.logged=JSON.parse(sessionStorage.getItem('logged'))||false;
    this.userEmail=sessionStorage.getItem("userEmail")
    // var today = new Date();
    // this.date=today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  }
  dateChange(e) {
    this.date = e.value;
    this.getMovies();
  }
  getMovies() {
    this.http.post("http://localhost:3000/movie", { name: this.name, location: this.location, date: this.date, showtime: this.showtime })
      .subscribe(data => {
        var list = data;
        this.movies = [];
        for(let i in list){
            for(let j in list[i].Movies){
              var f=1;
              this.movies.forEach(element => {
                if(element.name===list[i].Movies[j].name)
                  f=0;
              });
              if(f)
                this.movies.push(list[i].Movies[j]);
            }
        }
        console.log(this.movies);
        this.flag=true;
      })
  }
  timeChange(e) {
    this.showtime = e.value;
    this.getMovies();
  }
  changeLocation(e) {
    this.location = e.value;
    this.name='';
    this.http.post("http://localhost:3000/theatres", { location: this.location })
      .subscribe(data => {
        this.theatres = data
      })
    this.getMovies();
  }
  setTheatre(e) {
    this.name = e.value;
    this.getMovies();
  }
  top(e) {
    if(this.logged){
      this.movie=e;
      var modal = document.getElementById("modal");
      modal.style.top = Math.round(window.pageYOffset) + "px";
      modal.style.display = "flex";
      var table = document.createElement("table");
      table.setAttribute("id", "table");
      table.setAttribute("Style", "border-spacing:10px;justify-content:center;display:flex;");
      for (var i = 0; i < e.row; i++) {
        var row = table.insertRow(i);
        for (var j = 0; j < e.col; j++) {
          var cell1 = row.insertCell(j);
          var element1 = document.createElement("div");
          if (e.booked.includes((i + 1) + '-' + (j + 1))) {
            element1.setAttribute("style", "height: 25px;width: 25px;background-color: brown;margin: 10px;border-radius:20%;");
            element1.setAttribute("id", (i + 1) + "-" + (j + 1));
          }
          else {
            element1.setAttribute("style", "height: 25px;width: 25px;background-color: yellowgreen;margin: 10px;border-radius:20%;cursor:pointer");
            element1.setAttribute("id", (i + 1) + "-" + (j + 1));
            element1.addEventListener("click", (e) => { this.toggleSeat(e); });
          }
          cell1.appendChild(element1);
        }
      }
      var form = document.getElementById("form");
      form.insertBefore(table, form.children[0]);
    }
    else  
      alert("Log In first");
  }
  toggleSeat(e) {
    if (e.target.style.background === "green") {
      e.target.style.background = "yellowgreen";
      this.noOfSeats -= 1;
      var temp = [];
      this.seats.forEach(seat => {
        if (seat != e.target.id)
          temp.push(seat);
      });
      this.seats = temp;
    }
    else {
      e.target.style.background = "green";
      this.noOfSeats += 1;
      this.seats.push(e.target.id);
    }
  }
  close() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
    document.getElementById("table").remove();
    this.seats = [];
    this.noOfSeats = 0;
  }
  Reserve() {
    this.http.post("http://localhost:3000/addTicket",{movieName:this.movie.name,movieInfo:this.movie.info,movieDesc:this.movie.desc,movieImg:this.movie.image,TheatreId:this.movie.TheatreId,showTime:this.movie.showtime,date:this.movie.Date,noOfTickets:this.noOfSeats,price:this.price,email:this.userEmail})
    .subscribe(data=>console.log(data));
    this.movie.booked = [...this.movie.booked, ...this.seats];
    this.http.post("http://localhost:3000/updateBooking", { id:this.movie.id,booked:this.movie.booked })
    .subscribe(data=>console.log(data));
    this.seats = [];
    this.noOfSeats = 0;
    window.location.replace("http://localhost:4200/account");
  }
  ngOnInit(): void {
    }
}
