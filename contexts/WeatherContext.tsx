import React, { createContext, useContext, useEffect, useState } from 'react';

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  windSpeed: number;
  location: string;
  icon: string;
}

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
  lastUpdated: Date | null;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      // Simulate weather API call
      setTimeout(() => {
        const mockWeather: WeatherData = {
          temperature: Math.floor(Math.random() * 15) + 20,
          humidity: Math.floor(Math.random() * 30) + 50,
          condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
          windSpeed: Math.floor(Math.random() * 10) + 5,
          location: 'Your Farm Location',
          icon: '☀️',
        };
        setWeather(mockWeather);
        setLastUpdated(new Date());
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();

    // Update weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, loading, lastUpdated }}>
      {children}
    </WeatherContext.Provider>
  );
}