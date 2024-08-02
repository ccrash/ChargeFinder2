import React, { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'

interface _props {
  navigation: any
}

export const HomeScreen: FC<_props> = ({ navigation }) => {

  return (
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.bold}>Charger Finder</Text>
        <Text style={styles.normal}>Find an EV charger near you!</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Map')}>
          <Text style={styles.buttonText}>Open Map</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('List')}>
          <Text style={styles.buttonText}>Open List</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleContainer: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
    },
    bold: {
      color: 'black',
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: 80
    },
    normal: {
      color: 'grey',
      textAlign: 'left',
      fontSize: 20,
    },
    button: {
      backgroundColor: 'black',
      width: 'auto',
      borderRadius: 10,
      padding: 20,
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
  })