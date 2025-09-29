import { useState } from 'react'
import { View, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function searchBar({
  placeHolder = '', 
  size = 20,
  color = '#414040',
  icon,
  onChangeText,
  value
}) {
    const [search, setSearch] = useState('');
    const handleChange = (text) => {
      setSearch(text);
      if (onChangeText) {
        onChangeText(text); 
      }
    };

    return (
      <View style={{       
        flexDirection: 'row', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: '#D3D3D3', 
        borderRadius: 5, 
        padding: 5, 
        marginBottom: 10,
        marginTop: 10,
        marginRight: 30}}>

        {icon && (
          <Ionicons
            name={icon}
            size={size}
            color={color}
            style={{ marginRight: 8 }}
          />
        )}

        <TextInput style={{ height: 30, flex: 1 }}       
        onChangeText={handleChange} 
        value={value} 
        placeholder={placeHolder} 
        placeholderTextColor='#737373'/>
      </View>
    )
}
