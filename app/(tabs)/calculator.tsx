import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calculator, Leaf, Droplets, Bug, Sprout } from 'lucide-react-native';

interface CropData {
  fertilizer: { [key: string]: number }; // kg per hectare
  pesticide: { [key: string]: number }; // ml per hectare
  insecticide: { [key: string]: number }; // ml per hectare
  manure: { [key: string]: number }; // kg per hectare
}

const CROPS_DATA: { [key: string]: CropData } = {
  rice: {
    fertilizer: {
      'NPK 20:20:20': 125,
      'Urea': 100,
      'DAP': 75,
      'Potash': 50,
      'Zinc Sulfate': 25,
    },
    pesticide: {
      '2,4-D': 1000,
      'Butachlor': 1500,
      'Propanil': 2000,
      'Glyphosate': 800,
    },
    insecticide: {
      'Chlorpyrifos': 1000,
      'Fipronil': 750,
      'Imidacloprid': 500,
      'Lambda-cyhalothrin': 300,
    },
    manure: {
      'Cow Manure': 10000,
      'Chicken Manure': 5000,
      'Compost': 8000,
      'Vermicompost': 3000,
    },
  },
  wheat: {
    fertilizer: {
      'NPK 12:32:16': 150,
      'Urea': 120,
      'DAP': 100,
      'Potash': 60,
      'Zinc Sulfate': 30,
    },
    pesticide: {
      '2,4-D': 800,
      'Metsulfuron': 20,
      'Glyphosate': 1000,
      'Pendimethalin': 1200,
    },
    insecticide: {
      'Chlorpyrifos': 1200,
      'Dimethoate': 800,
      'Quinalphos': 1000,
      'Imidacloprid': 600,
    },
    manure: {
      'Cow Manure': 12000,
      'Chicken Manure': 6000,
      'Compost': 10000,
      'Vermicompost': 4000,
    },
  },
  corn: {
    fertilizer: {
      'NPK 10:26:26': 200,
      'Urea': 150,
      'DAP': 125,
      'Potash': 75,
      'Zinc Sulfate': 35,
    },
    pesticide: {
      'Atrazine': 2000,
      'Glyphosate': 1200,
      '2,4-D': 900,
      'Pendimethalin': 1500,
    },
    insecticide: {
      'Cypermethrin': 500,
      'Chlorpyrifos': 1500,
      'Spinosad': 300,
      'Emamectin Benzoate': 250,
    },
    manure: {
      'Cow Manure': 15000,
      'Chicken Manure': 7500,
      'Compost': 12000,
      'Vermicompost': 5000,
    },
  },
  tomato: {
    fertilizer: {
      'NPK 19:19:19': 300,
      'Urea': 200,
      'DAP': 150,
      'Potash': 100,
      'Calcium Nitrate': 75,
    },
    pesticide: {
      'Glyphosate': 1500,
      'Paraquat': 2000,
      'Pendimethalin': 1800,
      '2,4-D': 600,
    },
    insecticide: {
      'Imidacloprid': 800,
      'Spinosad': 400,
      'Cypermethrin': 600,
      'Acetamiprid': 500,
    },
    manure: {
      'Cow Manure': 20000,
      'Chicken Manure': 10000,
      'Compost': 15000,
      'Vermicompost': 6000,
    },
  },
  potato: {
    fertilizer: {
      'NPK 12:32:16': 250,
      'Urea': 180,
      'DAP': 140,
      'Potash': 120,
      'Zinc Sulfate': 40,
    },
    pesticide: {
      'Glyphosate': 1300,
      'Pendimethalin': 2000,
      'Paraquat': 1800,
      'Metribuzin': 500,
    },
    insecticide: {
      'Imidacloprid': 700,
      'Chlorpyrifos': 1800,
      'Cypermethrin': 700,
      'Spinosad': 350,
    },
    manure: {
      'Cow Manure': 25000,
      'Chicken Manure': 12000,
      'Compost': 18000,
      'Vermicompost': 8000,
    },
  },
};

export default function CalculatorScreen() {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [areaValue, setAreaValue] = useState('');
  const [areaUnit, setAreaUnit] = useState('acres');
  const [selectedInput, setSelectedInput] = useState('fertilizer');
  const [results, setResults] = useState<{ [key: string]: number } | null>(null);

  const convertToHectares = (area: number, unit: string): number => {
    switch (unit) {
      case 'acres':
        return area * 0.404686;
      case 'hectares':
        return area;
      case 'square_meters':
        return area / 10000;
      case 'square_feet':
        return area / 107639;
      default:
        return area;
    }
  };

  const calculateInputs = () => {
    const area = parseFloat(areaValue);
    if (!area || area <= 0) {
      Alert.alert('Error', 'Please enter a valid area');
      return;
    }

    const hectares = convertToHectares(area, areaUnit);
    const cropData = CROPS_DATA[selectedCrop];
    
    let inputData: { [key: string]: number };
    switch (selectedInput) {
      case 'fertilizer':
        inputData = cropData.fertilizer;
        break;
      case 'pesticide':
        inputData = cropData.pesticide;
        break;
      case 'insecticide':
        inputData = cropData.insecticide;
        break;
      case 'manure':
        inputData = cropData.manure;
        break;
      default:
        inputData = {};
    }

    const calculatedResults: { [key: string]: number } = {};
    Object.entries(inputData).forEach(([input, ratePerHectare]) => {
      calculatedResults[input] = Number((ratePerHectare * hectares).toFixed(2));
    });

    setResults(calculatedResults);
  };

  const getInputIcon = () => {
    switch (selectedInput) {
      case 'fertilizer':
        return <Sprout size={20} color="#22C55E" />;
      case 'pesticide':
        return <Leaf size={20} color="#EF4444" />;
      case 'insecticide':
        return <Bug size={20} color="#F59E0B" />;
      case 'manure':
        return <Droplets size={20} color="#8B5CF6" />;
      default:
        return <Sprout size={20} color="#22C55E" />;
    }
  };

  const getInputUnit = () => {
    switch (selectedInput) {
      case 'fertilizer':
      case 'manure':
        return 'kg';
      case 'pesticide':
      case 'insecticide':
        return 'ml';
      default:
        return 'kg';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.calculatorIconContainer}>
              <Calculator size={24} color="#22C55E" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Agricultural Calculator</Text>
              <Text style={styles.headerSubtitle}>Calculate input quantities</Text>
            </View>
          </View>
        </View>

        {/* Input Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Calculate Required Inputs</Text>

          {/* Crop Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Crop</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCrop}
                onValueChange={setSelectedCrop}
                style={styles.picker}
              >
                <Picker.Item label="Rice" value="rice" />
                <Picker.Item label="Wheat" value="wheat" />
                <Picker.Item label="Corn/Maize" value="corn" />
                <Picker.Item label="Tomato" value="tomato" />
                <Picker.Item label="Potato" value="potato" />
              </Picker>
            </View>
          </View>

          {/* Area Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Farm Area</Text>
            <View style={styles.areaInputContainer}>
              <TextInput
                style={styles.areaInput}
                value={areaValue}
                onChangeText={setAreaValue}
                placeholder="Enter area"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
              <View style={styles.unitPickerContainer}>
                <Picker
                  selectedValue={areaUnit}
                  onValueChange={setAreaUnit}
                  style={styles.unitPicker}
                >
                  <Picker.Item label="Acres" value="acres" />
                  <Picker.Item label="Hectares" value="hectares" />
                  <Picker.Item label="Sq. Meters" value="square_meters" />
                  <Picker.Item label="Sq. Feet" value="square_feet" />
                </Picker>
              </View>
            </View>
          </View>

          {/* Input Type Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Calculate For</Text>
            <View style={styles.inputTypeContainer}>
              {[
                { key: 'fertilizer', label: 'Fertilizers', color: '#22C55E' },
                { key: 'pesticide', label: 'Pesticides', color: '#EF4444' },
                { key: 'insecticide', label: 'Insecticides', color: '#F59E0B' },
                { key: 'manure', label: 'Organic Manure', color: '#8B5CF6' },
              ].map((type) => (
                <TouchableOpacity
                  key={type.key}
                  style={[
                    styles.inputTypeButton,
                    selectedInput === type.key && {
                      backgroundColor: type.color,
                      borderColor: type.color,
                    },
                  ]}
                  onPress={() => setSelectedInput(type.key)}
                >
                  <Text
                    style={[
                      styles.inputTypeText,
                      selectedInput === type.key && { color: '#FFFFFF' },
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Calculate Button */}
          <TouchableOpacity style={styles.calculateButton} onPress={calculateInputs}>
            <Calculator size={20} color="#FFFFFF" />
            <Text style={styles.calculateButtonText}>Calculate</Text>
          </TouchableOpacity>
        </View>

        {/* Results */}
        {results && (
          <View style={styles.resultsContainer}>
            <View style={styles.resultsHeader}>
              {getInputIcon()}
              <Text style={styles.resultsTitle}>
                Recommended {selectedInput.charAt(0).toUpperCase() + selectedInput.slice(1)} Quantities
              </Text>
            </View>
            
            <Text style={styles.resultsSubtitle}>
              For {areaValue} {areaUnit} of {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}
            </Text>

            <View style={styles.resultsList}>
              {Object.entries(results).map(([input, quantity]) => (
                <View key={input} style={styles.resultItem}>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultName}>{input}</Text>
                    <Text style={styles.resultQuantity}>
                      {quantity.toLocaleString()} {getInputUnit()}
                    </Text>
                  </View>
                  <View style={styles.resultBar}>
                    <View
                      style={[
                        styles.resultBarFill,
                        {
                          width: `${Math.min((quantity / Math.max(...Object.values(results))) * 100, 100)}%`,
                          backgroundColor: selectedInput === 'fertilizer' ? '#22C55E' :
                                         selectedInput === 'pesticide' ? '#EF4444' :
                                         selectedInput === 'insecticide' ? '#F59E0B' : '#8B5CF6',
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.disclaimer}>
              <Text style={styles.disclaimerText}>
                * These are general recommendations. Consult with local agricultural experts 
                and consider soil testing results for optimal application rates.
              </Text>
            </View>
          </View>
        )}
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
  calculatorIconContainer: {
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
  formContainer: {
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
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 50,
  },
  areaInputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  areaInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  unitPickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  unitPicker: {
    height: 50,
  },
  inputTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  inputTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    minWidth: '45%',
    alignItems: 'center',
  },
  inputTypeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  calculateButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
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
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  resultsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  resultsList: {
    gap: 16,
  },
  resultItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  resultInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  resultQuantity: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#22C55E',
  },
  resultBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  resultBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  disclaimer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#92400E',
    lineHeight: 16,
    textAlign: 'center',
  },
});