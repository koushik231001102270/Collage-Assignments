import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { Section } from "../components/Section";
import { Title } from "../components/Title";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { SearchBar } from "./components/SearchBar";
import { CurrentWeather } from "./components/CurrentWeather";
import { ForecastList } from "./components/ForecastList";
import { cities } from "./weather";
import { fetchWeather, type WeatherDashboard } from "./weather";

function App_04() {
    const [city, setCity] = useState(cities[0].name);
    const [weather, setWeather] = useState<WeatherDashboard | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchCity = async (nextCity: string) => {
        const trimmedCity = nextCity.trim();

        if (!trimmedCity) {
            setError("Enter a city name to search.");
            return;
        }

        setCity(trimmedCity);
        setLoading(true);
        setError(null);

        try {
            const result = await fetchWeather(trimmedCity);
            setWeather(result);
        } catch (requestError) {
            setWeather(null);
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "Unable to load weather data."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void searchCity(cities[0].name);
    }, []);

    return (
        <Container>
            <Header
                title="Weather Dashboard"
                subtitle="Search for a city to view current weather and a five-day forecast."
                backHref="../../index.html"
            />

            <Section style={{ gap: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <Title>Search by city</Title>

                    <SearchBar
                        value={city}
                        loading={loading}
                        onSearch={searchCity}
                    />

                    {error ? (
                        <p
                            style={{
                                color: "#ffb4ab",
                                fontSize: "12px",
                                lineHeight: "16px",
                            }}
                        >
                            {error}
                        </p>
                    ) : null}
                </div>

                {loading ? (
                    <div
                        style={{
                            background: "var(--secondary)",
                            borderRadius: "20px",
                            padding: "14px 18px",
                            color: "var(--subdued)",
                            fontSize: "16px",
                            lineHeight: "24px",
                        }}
                    >
                        Loading…
                    </div>
                ) : error ? (
                    <div
                        style={{
                            background: "var(--secondary)",
                            borderRadius: "20px",
                            padding: "14px 18px",
                            color: "#ffb4ab",
                            fontSize: "12px",
                            lineHeight: "16px",
                        }}
                    >
                        Weather data unavailable.
                    </div>
                ) : weather ? (
                    <>
                        <CurrentWeather weather={weather.current} />

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                            }}
                        >
                            <Title>Details</Title>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: "16px",
                                        padding: "14px 18px",
                                        background: "var(--secondary)",
                                        borderRadius: "20px 20px 4px 4px",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            letterSpacing: "0.5px",
                                            textTransform: "uppercase",
                                            color: "var(--subdued)",
                                        }}
                                    >
                                        Humidity
                                    </span>

                                    <span
                                        style={{
                                            fontSize: "16px",
                                            color: "var(--default)",
                                        }}
                                    >
                                        {weather.current.humidity}%
                                    </span>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: "16px",
                                        padding: "14px 18px",
                                        background: "var(--secondary)",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            letterSpacing: "0.5px",
                                            textTransform: "uppercase",
                                            color: "var(--subdued)",
                                        }}
                                    >
                                        Wind speed
                                    </span>

                                    <span
                                        style={{
                                            fontSize: "16px",
                                            color: "var(--default)",
                                        }}
                                    >
                                        {weather.current.windSpeed.toFixed(1)} m/s
                                    </span>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: "16px",
                                        padding: "14px 18px",
                                        background: "var(--secondary)",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            letterSpacing: "0.5px",
                                            textTransform: "uppercase",
                                            color: "var(--subdued)",
                                        }}
                                    >
                                        Sunrise
                                    </span>

                                    <span
                                        style={{
                                            fontSize: "16px",
                                            color: "var(--default)",
                                        }}
                                    >
                                        {weather.current.sunrise}
                                    </span>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: "16px",
                                        padding: "14px 18px",
                                        background: "var(--secondary)",
                                        borderRadius: "4px 4px 20px 20px",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            letterSpacing: "0.5px",
                                            textTransform: "uppercase",
                                            color: "var(--subdued)",
                                        }}
                                    >
                                        Sunset
                                    </span>

                                    <span
                                        style={{
                                            fontSize: "16px",
                                            color: "var(--default)",
                                        }}
                                    >
                                        {weather.current.sunset}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <ForecastList forecasts={weather.forecast} />
                    </>
                ) : null}
            </Section>

            <Footer year={2026} author="Koushik" />
        </Container>
    );
}

export default App_04;