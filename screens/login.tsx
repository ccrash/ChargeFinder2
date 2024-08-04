import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

interface _props {
  navigation: any
}

export const LoginScreen: React.FC<_props> = ({ navigation }) => {
  const [name, setName] = useState<string>('')
  const [carId, setCarId] = useState<string>()

  const handleLogin = () => {
    if (name.trim()) {
      navigation.navigate('Map', { user: { name, carId } })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerBig}>Hi</Text>
      <Text style={styles.headerRegular}>Enter your username and car ID to access</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Car ID"
        value={carId}
        onChangeText={setCarId}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerBig: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  headerRegular: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    alignContent: 'center'
  },
  input: {
    width: '100%',
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
})

