import WeatherCard from "./templates/WeatherCard";
import { WeatherProps } from "./templates/WeatherCard";

export class App {
  cardsWrapper: HTMLDivElement = document.querySelector("#cardsWrapper");
  opwApiKey: string = "50d53005c0fd5f556bb4ef15224c4209";
  inputValue: string = "";
  input: HTMLInputElement = document.querySelector("#phrase");
  submitButton: HTMLButtonElement = document.querySelector("#searchSubmit");
  errorSpan: HTMLSpanElement = document.querySelector("#error");
  cities: string[] = [];

  constructor() {
    this.addControlsListeners();
    this.loadFromStorage();
  }

  async getCityInfo(city: string) {
    const weather = await this.getWeather(city);
    if (!weather.name) {
      return null;
    }
    const {
      name,
      main: { humidity, temp, temp_min, temp_max },
      visibility,
      wind: { speed: wind },
    }: any = weather;
    const icon = weather.weather[0].icon;
    const cardData: WeatherProps = {
      name,
      temp,
      temp_min,
      temp_max,
      humidity,
      visibility,
      wind,
      icon,
    };
    return cardData;
  }
  async getWeather(city: string): Promise<any> {
    const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}&units=metric`;
    const weatherResponse = await fetch(openWeatherUrl);
    const weatherData = await weatherResponse.json();
    return weatherData;
  }

  async handleSubmit() {
    const cardData: WeatherProps = await this.getCityInfo(this.inputValue);
    if (!cardData) {
      this.setError("Nie znaleziono miejscowości. Spróbuj ponownie.");
      return;
    }
    if (this.cities.includes(cardData.name)) {
      this.setError("Miejscowość została już dodana. Spróbuj ponownie.");
      return;
    }
    this.cities.push(cardData.name);
    this.saveInStorage();
    this.createCard(cardData);
  }

  generateCards() {
    this.cities.forEach(async (city) => {
      const data = await this.getCityInfo(city);
      this.createCard(data);
    });
  }

  loadFromStorage() {
    const cities = localStorage.getItem("cities");
    if (cities) {
      this.cities = JSON.parse(cities);
      this.generateCards();
    }
  }

  saveInStorage() {
    localStorage.setItem("cities", JSON.stringify(this.cities));
  }

  setError(message: string) {
    console.log(this.input.classList);
    this.input.classList.add("text-red-600", "border-red-600");
    this.errorSpan.innerText = message;
  }

  clearError() {
    this.input.classList.remove("text-red-600", "border-red-600");
    this.errorSpan.innerText = "";
  }

  addControlsListeners() {
    this.input.addEventListener("input", (e) => {
      this.inputValue = (<HTMLInputElement>e.target).value;
      this.clearError();
      if (this.inputValue.length) {
        this.submitButton.disabled = false;
      } else {
        this.submitButton.disabled = true;
      }
    });
    this.submitButton.addEventListener("click", () => this.handleSubmit());
  }

  saveData(data: any) {
    localStorage.setItem("weatherData", JSON.stringify(data));
  }

  getData() {
    const data = localStorage.getItem("weatherData");
    if (data) {
      return JSON.parse(data);
    } else {
      return {};
    }
  }

  createCard(data: WeatherProps) {
    const w1: WeatherCard = new WeatherCard(data);
    this.cardsWrapper.appendChild(w1.render(data));
  }
}
