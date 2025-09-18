import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useWeather } from '@/contexts/WeatherContext';
import {
  Leaf,
  Thermometer,
  Droplets,
  Wind,
  MapPin,
  Bot,
  Calculator,
  CloudRain,
  TrendingUp,
  Sprout,
} from 'lucide-react-native';

export default function Dashboard() {
  const { user } = useAuth();
  const { weather, loading: weatherLoading, lastUpdated } = useWeather();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  if (!user) return null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const quickActions = [
    {
      title: 'AI Assistant',
      subtitle: 'Ask farming questions',
      icon: Bot,
      color: '#3B82F6',
      route: '/chat',
    },
    {
      title: 'Input Calculator',
      subtitle: 'Calculate fertilizers',
      icon: Calculator,
      color: '#10B981',
      route: '/calculator',
    },
    {
      title: 'Weather Forecast',
      subtitle: 'Detailed weather info',
      icon: CloudRain,
      color: '#6366F1',
      route: '/weather',
    },
  ];

  const farmingTips = [
    {
      title: 'Soil Preparation',
      tip: 'Check soil pH before sowing for optimal crop growth',
      icon: '🌱',
    },
    {
      title: 'Water Management',
      tip: 'Monitor humidity levels for efficient irrigation',
      icon: '💧',
    },
    {
      title: 'Pest Control',
      tip: 'Regular inspection helps prevent pest outbreaks',
      icon: '🛡️',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <Leaf size={28} color="#22C55E" />
            </View>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{user.fullName}</Text>
            </View>
          </View>
        </View>

        {/* Weather Card */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <View style={styles.weatherTitle}>
              <CloudRain size={24} color="#22C55E" />
              <Text style={styles.weatherTitleText}>Current Weather</Text>
            </View>
            {lastUpdated && (
              <Text style={styles.lastUpdated}>
                Updated: {formatTime(lastUpdated)}
              </Text>
            )}
          </View>

          {weatherLoading ? (
            <Text style={styles.loadingText}>Loading weather...</Text>
          ) : weather ? (
            <View style={styles.weatherContent}>
              <View style={styles.weatherMain}>
                <Text style={styles.weatherIcon}>☀️</Text>
                <View style={styles.weatherInfo}>
                  <Text style={styles.temperature}>{weather.temperature}°C</Text>
                  <Text style={styles.condition}>{weather.condition}</Text>
                </View>
              </View>

              <View style={styles.weatherDetails}>
                <View style={styles.weatherDetail}>
                  <Droplets size={16} color="#6B7280" />
                  <Text style={styles.weatherDetailText}>{weather.humidity}%</Text>
                </View>
                <View style={styles.weatherDetail}>
                  <Wind size={16} color="#6B7280" />
                  <Text style={styles.weatherDetailText}>{weather.windSpeed} km/h</Text>
                </View>
                <View style={styles.weatherDetail}>
                  <MapPin size={16} color="#6B7280" />
                  <Text style={styles.weatherDetailText}>{weather.location}</Text>
                </View>
              </View>
            </View>
          ) : (
            <Text style={styles.errorText}>Unable to load weather data</Text>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionCard}
                onPress={() => router.push(action.route)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Farm Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <TrendingUp size={20} color="#22C55E" />
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>Crop Health</Text>
            </View>
            <View style={styles.statCard}>
              <Sprout size={20} color="#3B82F6" />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Active Crops</Text>
            </View>
            <View style={styles.statCard}>
              <Droplets size={20} color="#06B6D4" />
              <Text style={styles.statValue}>Good</Text>
              <Text style={styles.statLabel}>Soil Moisture</Text>
            </View>
          </View>
        </View>

        {/* Farming Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Farming Tips</Text>
          {farmingTips.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <Text style={styles.tipIcon}>{tip.icon}</Text>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipText}>{tip.tip}</Text>
              </View>
            </View>
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F0FDF4',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  weatherCard: {
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
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weatherTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#6B7280',
  },
  weatherContent: {
    gap: 16,
  },
  weatherMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  weatherIcon: {
    fontSize: 48,
  },
  weatherInfo: {
    flex: 1,
  },
  temperature: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  condition: {
    fontSize: 16,
    color: '#6B7280',
  },
  weatherDetails: {
    flexDirection: 'row',
    gap: 20,
  },
  weatherDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  weatherDetailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  loadingText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 20,
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    paddingVertical: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
});