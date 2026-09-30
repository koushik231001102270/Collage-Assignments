export interface City {
    id: number;
    name: string;
    country: string;
}

export interface CurrentWeatherData {
    city: string;
    country: string;
    temperature: number;
    condition: string;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    sunrise: string;
    sunset: string;
}

export interface ForecastItem {
    id: string;
    date: string;
    condition: string;
    icon: string;
    high: number;
    low: number;
}

export interface WeatherDashboard {
    current: CurrentWeatherData;
    forecast: ForecastItem[];
}

export const cities: City[] = [
    { id: 1, name: "Kolkata", country: "IN" },
    { id: 2, name: "Mumbai", country: "IN" },
    { id: 3, name: "Delhi", country: "IN" },
    { id: 4, name: "Bengaluru", country: "IN" },
    { id: 5, name: "Chennai", country: "IN" },
    { id: 6, name: "Hyderabad", country: "IN" },
    { id: 7, name: "London", country: "GB" },
    { id: 8, name: "Tokyo", country: "JP" },
];

interface GeocodingResponse {
    name: string;
    lat: number;
    lon: number;
    country: string;
}

interface CurrentWeatherResponse {
    name: string;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    main: {
        temp: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
}

interface ForecastResponse {
    list: {
        dt: number;
        main: {
            temp: number;
        };
        weather: {
            main: string;
            icon: string;
        }[];
    }[];
}

const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
const API_BASE = "https://api.openweathermap.org";

async function requestJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    let data: unknown = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const message =
            typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof data.message === "string"
                ? data.message
                : "OpenWeather request failed.";

        if (response.status === 401) {
            throw new Error(
                "OpenWeather API key is invalid. Check VITE_OPENWEATHER_API_KEY."
            );
        }

        if (response.status === 429) {
            throw new Error(
                "OpenWeather API limit reached. Please try again later."
            );
        }

        throw new Error(message);
    }

    return data as T;
}

function formatTime(timestamp: number, timezone: number) {
    return new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
    }).format(new Date((timestamp + timezone) * 1000));
}

function getLocalDateKey(timestamp: number, timezone: number) {
    const localDate = new Date((timestamp + timezone) * 1000);

    const year = localDate.getUTCFullYear();
    const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(localDate.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function formatDay(dateKey: string) {
    return new Intl.DateTimeFormat("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    }).format(new Date(`${dateKey}T12:00:00Z`));
}

function buildForecast(
    forecast: ForecastResponse,
    timezone: number
): ForecastItem[] {
    const grouped = new Map<string, ForecastResponse["list"]>();

    for (const item of forecast.list) {
        const dateKey = getLocalDateKey(item.dt, timezone);
        const items = grouped.get(dateKey) ?? [];

        items.push(item);
        grouped.set(dateKey, items);
    }

    return [...grouped.entries()]
        .slice(0, 5)
        .map(([dateKey, items]) => {
            const bestMatch = [...items].sort((a, b) => {
                const aHour = new Date(
                    (a.dt + timezone) * 1000
                ).getUTCHours();

                const bHour = new Date(
                    (b.dt + timezone) * 1000
                ).getUTCHours();

                return (
                    Math.abs(aHour - 12) -
                    Math.abs(bHour - 12)
                );
            })[0];

            return {
                id: dateKey,
                date: formatDay(dateKey),
                condition: bestMatch.weather[0]?.main ?? "Unknown",
                icon: bestMatch.weather[0]?.icon ?? "01d",
                high: Math.max(
                    ...items.map((item) => item.main.temp)
                ),
                low: Math.min(
                    ...items.map((item) => item.main.temp)
                ),
            };
        });
}

export async function fetchWeather(
    city: string
): Promise<WeatherDashboard> {
    if (!API_KEY) {
        throw new Error(
            "Missing API key. Add VITE_OPENWEATHER_API_KEY to your .env file."
        );
    }

    const geoUrl =
        `${API_BASE}/geo/1.0/direct` +
        `?q=${encodeURIComponent(city)}` +
        `&limit=1` +
        `&appid=${API_KEY}`;

    const locations =
        await requestJson<GeocodingResponse[]>(geoUrl);

    if (locations.length === 0) {
        throw new Error(
            `City "${city}" was not found. Try another city name.`
        );
    }

    const location = locations[0];

    const currentUrl =
        `${API_BASE}/data/2.5/weather` +
        `?lat=${location.lat}` +
        `&lon=${location.lon}` +
        `&units=metric` +
        `&appid=${API_KEY}`;

    const forecastUrl =
        `${API_BASE}/data/2.5/forecast` +
        `?lat=${location.lat}` +
        `&lon=${location.lon}` +
        `&units=metric` +
        `&appid=${API_KEY}`;

    const [current, forecast] = await Promise.all([
        requestJson<CurrentWeatherResponse>(currentUrl),
        requestJson<ForecastResponse>(forecastUrl),
    ]);

    const primaryWeather = current.weather[0] ?? {
        main: "Unknown",
        description: "weather data unavailable",
        icon: "01d",
    };

    return {
        current: {
            city: current.name,
            country: current.sys.country,
            temperature: current.main.temp,
            condition: primaryWeather.main,
            description: primaryWeather.description,
            icon: primaryWeather.icon,
            humidity: current.main.humidity,
            windSpeed: current.wind.speed,
            sunrise: formatTime(
                current.sys.sunrise,
                current.timezone
            ),
            sunset: formatTime(
                current.sys.sunset,
                current.timezone
            ),
        },
        forecast: buildForecast(
            forecast,
            current.timezone
        ),
    };
}