import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Settings, CircleHelp as HelpCircle, Info, LogOut, Bell, Shield, Star, MessageSquare, Leaf } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      title: 'Notifications',
      subtitle: 'Weather alerts and reminders',
      icon: Bell,
      color: '#3B82F6',
      onPress: () => Alert.alert('Coming Soon', 'Notification settings will be available soon'),
    },
    {
      title: 'Settings',
      subtitle: 'App preferences and configuration',
      icon: Settings,
      color: '#6B7280',
      onPress: () => Alert.alert('Coming Soon', 'Settings will be available soon'),
    },
    {
      title: 'Privacy & Security',
      subtitle: 'Manage your data and privacy',
      icon: Shield,
      color: '#10B981',
      onPress: () => Alert.alert('Coming Soon', 'Privacy settings will be available soon'),
    },
    {
      title: 'Rate App',
      subtitle: 'Share your experience with us',
      icon: Star,
      color: '#F59E0B',
      onPress: () => Alert.alert('Thank You!', 'Your feedback helps us improve KrishiBalarm'),
    },
    {
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      icon: HelpCircle,
      color: '#8B5CF6',
      onPress: () => Alert.alert('Support', 'Contact us at support@krishibalarm.com'),
    },
    {
      title: 'Feedback',
      subtitle: 'Send us your suggestions',
      icon: MessageSquare,
      color: '#EC4899',
      onPress: () => Alert.alert('Feedback', 'We appreciate your suggestions! Email us at feedback@krishibalarm.com'),
    },
    {
      title: 'About',
      subtitle: 'Learn more about KrishiBalarm',
      icon: Info,
      color: '#06B6D4',
      onPress: () => Alert.alert(
        'About KrishiBalarm',
        'KrishiBalarm v1.0.0\n\nYour AI-powered agricultural assistant for modern farming. Get weather updates, calculate input quantities, and receive expert farming advice.'
      ),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.userIconContainer}>
              <User size={24} color="#22C55E" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Profile</Text>
              <Text style={styles.headerSubtitle}>Manage your account</Text>
            </View>
          </View>
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <User size={32} color="#FFFFFF" />
              </View>
              <View style={styles.statusIndicator} />
            </View>
            
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.fullName || 'Guest User'}</Text>
              <View style={styles.userEmail}>
                <Mail size={16} color="#6B7280" />
                <Text style={styles.userEmailText}>{user?.email || 'guest@example.com'}</Text>
              </View>
              <View style={styles.userStatus}>
                <Leaf size={14} color="#22C55E" />
                <Text style={styles.userStatusText}>Active Farmer</Text>
              </View>
            </View>
          </View>

          <View style={styles.userStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Days Active</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>AI Queries</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>Calculations</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                <item.icon size={20} color={item.color} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <View style={styles.menuChevron}>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfoContainer}>
          <View style={styles.appInfo}>
            <View style={styles.appLogoContainer}>
              <Leaf size={24} color="#22C55E" />
            </View>
            <View style={styles.appDetails}>
              <Text style={styles.appName}>KrishiBalarm</Text>
              <Text style={styles.appDescription}>
                Your AI-powered agricultural assistant for smart farming decisions
              </Text>
              <Text style={styles.appVersion}>Version 1.0.0</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with 💚 for farmers everywhere
          </Text>
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
  userIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F0FDF4',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  userCard: {
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: '#22C55E',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    backgroundColor: '#10B981',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  userEmailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  userStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userStatusText: {
    fontSize: 12,
    color: '#22C55E',
    fontWeight: '500',
  },
  userStats: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  menuChevron: {
    marginLeft: 12,
  },
  chevron: {
    fontSize: 18,
    color: '#D1D5DB',
  },
  appInfoContainer: {
    margin: 20,
    marginTop: 0,
  },
  appInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  appLogoContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F0FDF4',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  appDetails: {
    flex: 1,
  },
  appName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  logoutButton: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});