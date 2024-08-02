import 'react-native-gesture-handler';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import { formatDistance } from '../helpers/utils'
import { Charger } from '../def/charger'

interface _props {
  item: Charger | null
  onPress: () => void
}

export const ListItem: React.FC<_props> = ({ item , onPress } : _props) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.title}>{item.AddressInfo.Title}</Text>
        <View style={styles.details}>
          { item.AddressInfo.AddressLine1 && <Text style={styles.address}>{item.AddressInfo.AddressLine1}</Text> }
          { item.AddressInfo.Distance && <Text style={styles.distance}>{formatDistance(item.AddressInfo.Distance)}</Text> }
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ListItem

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
  }
})