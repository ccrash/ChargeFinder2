import 'react-native-gesture-handler';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { formatDistance } from '../helpers/utils'
import { Charger } from '../def/charger'

interface _props {
  chargers: Charger[]
  onPress: (charger: Charger) => void
}
interface _propsItem {
  charger: Charger
  onPress: (charger: Charger) => void
}

const ListItem = ({ charger, onPress }: _propsItem) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(charger)}>
      <View>
        <Text style={styles.title}>{charger.AddressInfo.Title}</Text>
        <View style={styles.details}>
          {charger.AddressInfo.AddressLine1 && <Text style={styles.address}>{charger.AddressInfo.AddressLine1}</Text>}
          {charger.AddressInfo.Distance && <Text style={styles.distance}>{formatDistance(charger.AddressInfo.Distance)}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const ChargersList = ({ chargers = [], onPress = () => { } }: _props) => {
  return (
    <FlatList
      data={chargers}
      renderItem={({ item }) => <ListItem charger={item} onPress={onPress} />}
      keyExtractor={(item) => item.ID.toString()}
      contentContainerStyle={styles.listContainer}
    />
  )
}

export default ChargersList

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'left',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  address: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
  },
  distance: {
    flex: 1,
    fontSize: 16,
    color: 'grey',
    textAlign: 'right',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
})