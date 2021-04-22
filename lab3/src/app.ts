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

  async getCityInfo(city: string): Promise<WeatherProps> {
    const weather: any = await this.getWeather(city);
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
    const reqUrl: string = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}&units=metric`;
    const res: any = await fetch(reqUrl);
    const weatherData: any = await res.json();
    return weatherData;
  }

  async handleSubmit(): Promise<void> {
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

  generateCards(): void {
    this.cities.forEach(async (city) => {
      const data = await this.getCityInfo(city);
      this.createCard(data);
    });
  }

  loadFromStorage(): void {
    const cities: string = localStorage.getItem("cities");
    if (cities) {
      this.cities = JSON.parse(cities);
      this.generateCards();
    }
  }

  saveInStorage(): void {
    localStorage.setItem("cities", JSON.stringify(this.cities));
  }

  setError(message: string): void {
    this.input.classList.add("text-red-600", "border-red-600");
    this.errorSpan.innerText = message;
  }

  clearError(): void {
    this.input.classList.remove("text-red-600", "border-red-600");
    this.errorSpan.innerText = "";
  }

  addControlsListeners(): void {
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

  saveData(data: any): void {
    localStorage.setItem("weatherData", JSON.stringify(data));
  }

  createCard(data: WeatherProps): void {
    const w1: WeatherCard = new WeatherCard(data);
    this.cardsWrapper.appendChild(w1.render());
  }
}
