import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
interface WeatherResponse {
  main: {};
  name:{};
  weather:string[];



}
const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weatherTemp:any;
  todayDate =new Date();
  cityName:any = "";
  weatherIcon:any;
  weatherDetails:any;
  name:any ="";
  Loading = true;



  constructor(public httpClient:HttpClient) {

  }


  // loadData(){
  //   this.httpClient.get(`${API_URL}/weather?q=${"Pune"}&appid=${API_KEY}`).subscribe(results =>{
  //     console.log(results);
  //     this.weatherTemp = results['main']
  //     console.log(this.weatherTemp);
  //   })
  // }
  loadData() {
    // Check if cityName is empty
    if (this.cityName.trim() === '') {
      // Reset data and set Loading to true
      this.weatherTemp = null;
      this.weatherIcon = null;
      this.weatherDetails = null;
      this.name = null;
      this.Loading = true;
      return;  // Exit the function if cityName is empty
    }

    // Make API request only if cityName is not empty
    this.httpClient.get<WeatherResponse>(`${API_URL}/weather?q=${this.cityName}&appid=${API_KEY}`).subscribe(results => {
      console.log(results);
      this.weatherTemp = results;
      this.name = results['name'];
      console.log(this.weatherTemp.main);
      this.weatherDetails = results.weather[0];
      console.log(this.weatherDetails);
      this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`;
      this.Loading = false;
    });
  }

}
