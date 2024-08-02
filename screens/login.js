import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('')

  const handleLogin = () => {
    if (username.trim()) {
      navigation.navigate('Home', { username })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerBig}>Hi</Text>
      <Text style={styles.headerRegoular}>Enter your name to check your expanses</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Submit</Text>
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
  headerRegoular: {
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
    borderRadius: 4,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

