import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Pressable } from 'react-native';
import { COLORS, FONTS } from '../../../styles/globalStyles';
import CustomButton from '../../../components/customButton';

const CustomFilter = () => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  const [button1Layout, setButton1Layout] = useState(null);
  const button1Ref = useRef(null);

  const [button2Layout, setButton2Layout] = useState(null);
  const button2Ref = useRef(null);

  const options1 = [
    { label: 'Reporte Diario', value: 'diario' },
    { label: 'Reporte Mensual', value: 'mensual' },
    { label: 'Reporte Anual', value: 'anual' },
  ];

  const options2 = [
    { label: 'Más recientes', value: 'recientes' },
    { label: 'Más antiguos', value: 'antiguos' },
  ];

  const handleButton1Layout = () => {
    if (button1Ref.current) {
      button1Ref.current.measure((fx, fy, width, height, px, py) => {
        setButton1Layout({ width, height, px, py });
      });
    }
  };

  const handleButton2Layout = () => {
    if (button2Ref.current) {
      button2Ref.current.measure((fx, fy, width, height, px, py) => {
        setButton2Layout({ width, height, px, py });
      });
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {/* Botón 1 */}
      <View ref={button1Ref} onLayout={handleButton1Layout} style={{ flex: 1, marginRight: 5 }}>
        <CustomButton
          title="Tipo de Reporte"
          onPress={() => setModal1Visible(true)}
          iconComponent={<Text style={{ color: COLORS.whiteText, fontSize: FONTS.size.sm }}>▼</Text>}
        />
      </View>

      {/* Botón 2 */}
      <View ref={button2Ref} onLayout={handleButton2Layout} style={{ flex: 1, marginLeft: 5 }}>
        <CustomButton
          title="Orden por"
          onPress={() => setModal2Visible(true)}
          iconComponent={<Text style={{ color: COLORS.whiteText, fontSize: FONTS.size.sm }}>▼</Text>}
        />
      </View>

      {/* Modal 1 */}
      <Modal
        transparent={true}
        visible={modal1Visible}
        animationType="fade"
        onRequestClose={() => setModal1Visible(false)}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={() => setModal1Visible(false)}
        >
          <View
            style={[
              {
                position: 'absolute',
                backgroundColor: COLORS.background,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: COLORS.greyBorder,
                maxHeight: 200,
              },
              button1Layout && {
                top: button1Layout.py + button1Layout.height,
                left: button1Layout.px,
                width: button1Layout.width,
              },
            ]}
          >
            <FlatList
              data={options1}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: COLORS.greyBorder }}
                  onPress={() => setModal1Visible(false)} // solo cierra el modal
                >
                  <Text style={{ fontFamily: FONTS.regular, fontSize: FONTS.size.md }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>

      {/* Modal 2 */}
      <Modal
        transparent={true}
        visible={modal2Visible}
        animationType="fade"
        onRequestClose={() => setModal2Visible(false)}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={() => setModal2Visible(false)}
        >
          <View
            style={[
              {
                position: 'absolute',
                backgroundColor: COLORS.background,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: COLORS.greyBorder,
                maxHeight: 200,
              },
              button2Layout && {
                top: button2Layout.py + button2Layout.height,
                left: button2Layout.px,
                width: button2Layout.width,
              },
            ]}
          >
            <FlatList
              data={options2}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: COLORS.greyBorder }}
                  onPress={() => setModal2Visible(false)} // solo cierra el modal
                >
                  <Text style={{ fontFamily: FONTS.regular, fontSize: FONTS.size.md }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default CustomFilter;
