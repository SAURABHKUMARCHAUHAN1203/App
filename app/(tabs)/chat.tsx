import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Send, Bot, User } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m KrishiBalarm, your AI agricultural assistant. I can help you with farming questions, crop management, pest control, and much more. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}-${Math.random()}`,
      text: message.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage.text);
      const botMessage: Message = {
        id: `bot-${Date.now()}-${Math.random()}`,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('temperature')) {
      return 'Based on current weather conditions, I recommend checking the weather tab for detailed forecasts. For planting, ensure soil temperature is above 15°C and avoid sowing before heavy rains.';
    }
    
    if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrient') || lowerMessage.includes('npk')) {
      return 'For fertilizer recommendations, use our calculator tab. Generally, NPK ratios vary by crop: cereals need 4:2:1, vegetables 3:1:2, and fruits 2:1:3. Apply base fertilizer before sowing and top-dress during growth stages.';
    }
    
    if (lowerMessage.includes('pest') || lowerMessage.includes('insect') || lowerMessage.includes('disease')) {
      return 'For pest management: 1) Practice crop rotation, 2) Use neem-based organic pesticides, 3) Install pheromone traps, 4) Maintain field hygiene. Early detection is key - inspect crops weekly.';
    }
    
    if (lowerMessage.includes('soil') || lowerMessage.includes('ph') || lowerMessage.includes('texture')) {
      return 'Soil health is crucial! Test soil pH (6.0-7.0 is ideal for most crops), ensure proper drainage, add organic matter regularly, and maintain soil moisture at 60-70% of field capacity.';
    }
    
    if (lowerMessage.includes('seed') || lowerMessage.includes('sowing') || lowerMessage.includes('planting')) {
      return 'For successful sowing: 1) Choose disease-resistant varieties, 2) Treat seeds with fungicide, 3) Follow proper spacing, 4) Sow at optimal depth (2-3x seed diameter), 5) Ensure adequate soil moisture.';
    }
    
    if (lowerMessage.includes('irrigation') || lowerMessage.includes('water') || lowerMessage.includes('drip')) {
      return 'Efficient irrigation tips: 1) Use drip or sprinkler systems, 2) Water early morning or evening, 3) Check soil moisture before watering, 4) Apply mulch to reduce evaporation, 5) Collect rainwater when possible.';
    }
    
    if (lowerMessage.includes('crop') || lowerMessage.includes('variety') || lowerMessage.includes('cultivation')) {
      return 'For crop selection, consider: 1) Local climate and soil conditions, 2) Market demand, 3) Water availability, 4) Your farming experience, 5) Disease resistance. I can provide specific advice if you mention your location and crops.';
    }

    // Default response
    return 'Thank you for your question! As an AI agricultural assistant, I can help with various farming topics including crop management, pest control, fertilizer application, irrigation, soil health, and weather-related farming decisions. Could you please provide more specific details about what you\'d like to know?';
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.botIconContainer}>
              <Bot size={24} color="#22C55E" />
            </View>
            <View>
              <Text style={styles.headerTitle}>KrishiBalarm AI</Text>
              <Text style={styles.headerSubtitle}>Agricultural Assistant</Text>
            </View>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageWrapper,
                msg.sender === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper,
              ]}
            >
              <View style={styles.messageHeader}>
                <View style={styles.senderInfo}>
                  <View style={[
                    styles.senderIcon,
                    msg.sender === 'user' ? styles.userIcon : styles.botIcon,
                  ]}>
                    {msg.sender === 'user' ? (
                      <User size={16} color="#FFFFFF" />
                    ) : (
                      <Bot size={16} color="#FFFFFF" />
                    )}
                  </View>
                  <Text style={styles.senderName}>
                    {msg.sender === 'user' ? 'You' : 'KrishiBalarm'}
                  </Text>
                </View>
                <Text style={styles.timestamp}>{formatTime(msg.timestamp)}</Text>
              </View>
              <View style={[
                styles.messageBubble,
                msg.sender === 'user' ? styles.userMessage : styles.botMessage,
              ]}>
                <Text style={[
                  styles.messageText,
                  msg.sender === 'user' ? styles.userMessageText : styles.botMessageText,
                ]}>
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={message}
              onChangeText={setMessage}
              placeholder="Ask about farming, crops, weather..."
              placeholderTextColor="#9CA3AF"
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
              onPress={sendMessage}
              disabled={!message.trim()}
            >
              <Send size={20} color={message.trim() ? "#FFFFFF" : "#9CA3AF"} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
  botIconContainer: {
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
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 32,
  },
  messageWrapper: {
    marginBottom: 24,
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  botMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  senderIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userIcon: {
    backgroundColor: '#3B82F6',
  },
  botIcon: {
    backgroundColor: '#22C55E',
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  timestamp: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userMessage: {
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  botMessageText: {
    color: '#1F2937',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 32 : 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: '#22C55E',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
});