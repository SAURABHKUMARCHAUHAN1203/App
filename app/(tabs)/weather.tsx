import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useWeather } from '@/contexts/WeatherContext';
import {
  CloudRain,
  Sun,
  Cloud,
  Droplets,
  Wind,
  Thermometer,
  Eye,
  Compass,
  RefreshCw,
  Calendar,
  Clock,
} from 'lucide-react-native';

interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export default function WeatherScreen() {
  const { weather, loading, lastUpdated } = useWeather();
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    generateForecast();
  }, []);

  const generateForecast = () => {
    const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain'];
    const icons = ['☀️', '⛅', '☁️', '🌦️', '🌧️'];

    const forecastData: ForecastDay[] = days.slice(0, 7).map((day, index) => {
      const conditionIndex = Math.floor(Math.random() * conditions.length);
      const baseTemp = 25 + Math.floor(Math.random() * 10);
      
      return {
        day,
        high: baseTemp + Math.floor(Math.random() * 5),
        low: baseTemp - Math.floor(Math.random() * 8) - 3,
        condition: conditions[conditionIndex],
        icon: icons[conditionIndex],
        humidity: 50 + Math.floor(Math.random() * 40),
        windSpeed: 5 + Math.floor(Math.random() * 15),
      };
    });

    setForecast(forecastData);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    generateForecast();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun size={32} color="#F59E0B" />;
      case 'partly cloudy':
        return <Cloud size={32} color="#6B7280" />;
      case 'cloudy':
        return <Cloud size={32} color="#4B5563" />;
      case 'rainy':
      case 'light rain':
      case 'heavy rain':
        return <CloudRain size={32} color="#3B82F6" />;
      default:
        return <Sun size={32} color="#F59E0B" />;
    }
  };

  const getFarmingAdvice = (condition: string, humidity: number): string => {
    if (condition.toLowerCase().includes('rain')) {
      return 'Good time for transplanting. Avoid pesticide application.';
    } else if (condition.toLowerCase() === 'sunny' && humidity < 60) {
      return 'Ideal for harvesting and field operations. Increase irrigation.';
    } else if (humidity > 80) {
      return 'High humidity - monitor for fungal diseases. Ensure good ventilation.';
    } else {
      return 'Good conditions for most farming activities. Monitor soil moisture.';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.weatherIconContainer}>
              <CloudRain size={24} color="#22C55E" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Weather Forecast</Text>
              <Text style={styles.headerSubtitle}>Agricultural Weather Monitor</Text>
            </View>
            <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
              <RefreshCw size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Weather Card */}
        {weather && (
          <View style={styles.currentWeatherCard}>
            <View style={styles.currentWeatherHeader}>
              <Text style={styles.currentWeatherTitle}>Current Conditions</Text>
              {lastUpdated && (
                <View style={styles.lastUpdatedContainer}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.lastUpdatedText}>
                    {formatTime(lastUpdated)}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.currentWeatherMain}>
              <View style={styles.currentWeatherLeft}>
                <Text style={styles.currentTemperature}>{weather.temperature}°C</Text>
                <Text style={styles.currentCondition}>{weather.condition}</Text>
                <Text style={styles.currentLocation}>{weather.location}</Text>
              </View>
              <View style={styles.currentWeatherIcon}>
                {getWeatherIcon(weather.condition)}
              </View>
            </View>

            <View style={styles.currentWeatherDetails}>
              <View style={styles.weatherDetailItem}>
                <Droplets size={16} color="#3B82F6" />
                <Text style={styles.weatherDetailLabel}>Humidity</Text>
                <Text style={styles.weatherDetailValue}>{weather.humidity}%</Text>
              </View>
              <View style={styles.weatherDetailItem}>
                <Wind size={16} color="#10B981" />
                <Text style={styles.weatherDetailLabel}>Wind</Text>
                <Text style={styles.weatherDetailValue}>{weather.windSpeed} km/h</Text>
              </View>
            </View>

            {/* Farming Advice */}
            <View style={styles.farmingAdviceContainer}>
              <Text style={styles.farmingAdviceTitle}>🌾 Farming Advice</Text>
              <Text style={styles.farmingAdviceText}>
                {getFarmingAdvice(weather.condition, weather.humidity)}
              </Text>
            </View>
          </View>
        )}

        {/* 7-Day Forecast */}
        <View style={styles.forecastContainer}>
          <Text style={styles.forecastTitle}>7-Day Forecast</Text>
          
          <View style={styles.forecastList}>
            {forecast.map((day, index) => (
              <View key={index} style={styles.forecastItem}>
                <View style={styles.forecastDay}>
                  <Text style={styles.forecastDayText}>{day.day}</Text>
                  <Text style={styles.forecastCondition}>{day.condition}</Text>
                </View>
                
                <View style={styles.forecastIcon}>
                  <Text style={styles.forecastIconText}>{day.icon}</Text>
                </View>
                
                <View style={styles.forecastTemps}>
                  <Text style={styles.forecastHigh}>{day.high}°</Text>
                  <Text style={styles.forecastLow}>{day.low}°</Text>
                </View>
                
                <View style={styles.forecastDetails}>
                  <View style={styles.forecastDetailItem}>
                    <Droplets size={12} color="#6B7280" />
                    <Text style={styles.forecastDetailText}>{day.humidity}%</Text>
                  </View>
                  <View style={styles.forecastDetailItem}>
                    <Wind size={12} color="#6B7280" />
                    <Text style={styles.forecastDetailText}>{day.windSpeed} km/h</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Weather Alerts */}
        <View style={styles.alertsContainer}>
          <Text style={styles.alertsTitle}>⚠️ Agricultural Alerts</Text>
          
          <View style={styles.alertItem}>
            <View style={styles.alertIconContainer}>
              <Droplets size={20} color="#3B82F6" />
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Irrigation Advisory</Text>
              <Text style={styles.alertDescription}>
                Current humidity levels are optimal. Monitor soil moisture before next irrigation.
              </Text>
            </View>
          </View>

          <View style={styles.alertItem}>
            <View style={styles.alertIconContainer}>
              <Wind size={20} color="#F59E0B" />
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Wind Advisory</Text>
              <Text style={styles.alertDescription}>
                Moderate winds expected. Good for pesticide application but avoid spraying during peak hours.
              </Text>
            </View>
          </View>
        </View>

        {/* Weather Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>🌱 Weather-Based Tips</Text>
          
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>🌡️</Text>
              <Text style={styles.tipText}>
                Monitor temperature variations for pest activity patterns
              </Text>
            </View>
            
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>💧</Text>
              <Text style={styles.tipText}>
                High humidity increases disease risk - ensure proper ventilation
              </Text>
            </View>
            
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>🌬️</Text>
              <Text style={styles.tipText}>
                Use wind direction data for efficient pesticide application
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F0FDF4',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  refreshButton: {
    padding: 8,
  },
  currentWeatherCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  currentWeatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentWeatherTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  lastUpdatedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lastUpdatedText: {
    fontSize: 12,
    color: '#6B7280',
  },
  currentWeatherMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentWeatherLeft: {
    flex: 1,
  },
  currentTemperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  currentCondition: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 4,
  },
  currentLocation: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  currentWeatherIcon: {
    marginLeft: 20,
  },
  currentWeatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginBottom: 16,
  },
  weatherDetailItem: {
    alignItems: 'center',
    gap: 8,
  },
  weatherDetailLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  weatherDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  farmingAdviceContainer: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
  },
  farmingAdviceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#15803D',
    marginBottom: 8,
  },
  farmingAdviceText: {
    fontSize: 12,
    color: '#166534',
    lineHeight: 16,
  },
  forecastContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  forecastTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  forecastList: {
    gap: 12,
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  forecastDay: {
    flex: 2,
  },
  forecastDayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  forecastCondition: {
    fontSize: 12,
    color: '#6B7280',
  },
  forecastIcon: {
    flex: 1,
    alignItems: 'center',
  },
  forecastIconText: {
    fontSize: 24,
  },
  forecastTemps: {
    flex: 1,
    alignItems: 'center',
  },
  forecastHigh: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  forecastLow: {
    fontSize: 12,
    color: '#6B7280',
  },
  forecastDetails: {
    flex: 1,
    gap: 4,
  },
  forecastDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  forecastDetailText: {
    fontSize: 10,
    color: '#6B7280',
  },
  alertsContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  alertsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  alertItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  alertIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  tipsContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    marginBottom: 32,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipIcon: {
    fontSize: 20,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
});