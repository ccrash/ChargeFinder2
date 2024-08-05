import React from 'react'
import { Text, Pressable, StyleSheet, Platform  } from 'react-native'
import { Callout } from 'react-native-maps'

import { Charger } from '../def/charger'

interface _props {
  charger: Charger
  onContinue: (charger: Charger) => void
}

export const MapMarkerDetails = ({ charger, onContinue }: _props) => {
  return (
    <Callout style={{borderRadius: 10}} onPress={() => Platform.OS != 'ios' ? onContinue(charger) : {}}>
      <Text style={styles.title}>{charger.AddressInfo.Title}</Text>
      {charger.AddressInfo.AddressLine1 && <Text style={styles.address}>{charger.AddressInfo.AddressLine1}</Text>}
      <Pressable style={styles.buttonSelect} onPress={() => onContinue(charger)}>
        <Text style={styles.buttonSelectText}>Select</Text>
      </Pressable>
    </Callout>
  )
}

export default MapMarkerDetails

export const styles = StyleSheet.create({
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
  buttonSelect: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 20,
    margin: 10

  },
  buttonSelectText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
})