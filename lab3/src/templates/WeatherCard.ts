import { htmlToElement } from "../helper";

interface iconsType {
  [name: string]: string;
}

const icons: iconsType = {
  "01d": "1",
  "01n": "6",
  "02d": "A",
  "02n": "a",
  "03d": "3",
  "03n": "3",
  "04d": "3",
  "04n": "3",
  "09d": "U",
  "09n": "U",
  "10d": "N",
  "10n": "o",
  "11d": "Y",
  "11n": "Y",
  "13d": "I",
  "13n": "I",
  "50d": "Z",
  "50n": "Z",
};

export interface WeatherProps {
  name: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  visibility: number;
  wind: number;
  icon: string;
}

class WeatherCard {
  constructor(props: WeatherProps) {
    this.render(props);
  }
  render({
    name,
    temp,
    temp_max,
    temp_min,
    visibility,
    wind,
    humidity,
    icon,
  }: WeatherProps): ChildNode {
    const date = new Date().toLocaleDateString();
    const windRounded = Math.round(wind);
    const tempRounded = Math.round(temp);
    const tempMinRounded = Math.round(temp_min);
    const tempMaxRounded = Math.round(temp_max);
    const visibilityInKM = visibility / 1000;
    const visibilityRounded =
      visibilityInKM < 1 ? visibility.toFixed(1) : Math.round(visibilityInKM);
    console.log(icon);
    return htmlToElement(`<div class="flex shadow-xl mt-10 max-h-80 flex-col bg-white rounded-lg p-4 px-6 w-64">
    <div class="font-bold text-xl">${name}</div>
    <div class="text-sm text-gray-500">${date}</div>
    <div
      class="mt-4 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-20 w-20"
    >
      <span class="font-icons transform -translate-y-14 text-9xl flex items-start h-20">${icons[icon]}</span>
    </div>
    <div class="flex flex-row items-center justify-center">
      <div class="font-medium text-6xl">${tempRounded}°</div>
      <div class="flex flex-col items-center ml-6">
        <div>Cloudy</div>
        <div class="mt-1">
          <span class="text-sm"
            ><i class="far fa-long-arrow-up"></i
          ></span>
          <span class="text-sm font-light text-gray-500">${tempMaxRounded}°C</span>
        </div>
        <div>
          <span class="text-sm"
            ><i class="far fa-long-arrow-down"></i
          ></span>
          <span class="text-sm font-light text-gray-500">${tempMinRounded}°C</span>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-between mt-6">
      <div class="flex flex-col items-center">
        <div class="font-medium text-xs">Wiatr</div>
        <div class="text-sm text-gray-500">${windRounded} km/h</div>
      </div>
      <div class="flex flex-col items-center">
        <div class="font-medium text-xs">Wilgotność</div>
        <div class="text-sm text-gray-500">${humidity}%</div>
      </div>
      <div class="flex flex-col items-center">
        <div class="font-medium text-xs">Widoczność</div>
        <div class="text-sm text-gray-500">${visibilityRounded} km</div>
      </div>
    </div>
  </div>`);
  }
}

export default WeatherCard;
