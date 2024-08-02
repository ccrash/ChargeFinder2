import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Charger } from '../def/charger'

interface _props {
  charger: Charger | null
  onContinue: (charger: Charger) => void
  onClose: () => void
}

export const MapMarkerDetails = ({charger, onContinue, onClose} : _props) => {

  return charger && (
    
    <View style={styles.container}>
      <Text style={styles.title}>{charger.AddressInfo.Title}</Text>
      { charger.AddressInfo.AddressLine1 && <Text style={styles.address}>{charger.AddressInfo.AddressLine1}</Text> }
      { charger.AddressInfo.Town && <Text style={styles.address}>{charger.AddressInfo.Town}</Text> }
      { charger.AddressInfo.StateOrProvince && <Text>{charger.AddressInfo.StateOrProvince}</Text> }
      { charger.AddressInfo.Postcode && <Text style={styles.postcode}>{charger.AddressInfo.Postcode}</Text> }
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonSelect} onPress={() => onContinue(charger)}>
          <Text style={styles.buttonSelectText}>Select</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
          <Text style={styles.buttonCloseText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MapMarkerDetails

export const styles = StyleSheet.create({
    container: {
      margin: 20,
      marginTop: 100,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
    },
    address: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
    postcode: {
      fontSize: 18,
      marginBottom: 15,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttons: {
      flexDirection: 'row',
      alignContent: 'space-between',
      padding: 20,
    },
    buttonSelect: {
      backgroundColor: 'black',
      borderRadius: 5,
      padding: 20,

    },
    buttonSelectText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16
    },
    buttonClose: {
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 20,
      borderColor: 'black',
      borderWidth: 1
    },
    buttonCloseText: {
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16
    },
  })