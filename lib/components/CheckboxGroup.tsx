import React from "react";
import { View, StyleSheet } from "react-native";
import { Checkbox, Text } from "react-native-paper";

const CheckboxGroup = ({
  label,
  options,
  values,
  onChange,
}) => {
  const handleToggle = (value) => {
    const newValue = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];
    onChange(newValue);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {options.map((option) => (
        <View key={option.value} style={styles.option}>
          <Checkbox
            status={values.includes(option.value) ? "checked" : "unchecked"}
            onPress={() => handleToggle(option.value)}
          />
          <Text style={styles.optionLabel} onPress={() => handleToggle(option.value)}>
            {option.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  optionLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default CheckboxGroup;