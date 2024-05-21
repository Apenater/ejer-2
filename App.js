import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [nombre, setNombre] = useState('');
  const [fechaReserva, setFechaReserva] = useState(new Date());
  const [personaReserva, setPersonaReserva] = useState('');
  const [alumno, setAlumno] = useState([]);
  const [carnet, setCarnet] = useState('');
  const [colorFav, setColorFav] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setFechaReserva(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const agregarAlumno = () => {
    const nuevoAlumno = {
      id: alumno.length + 1,
      nombre: nombre,
      carnet: carnet,
      colorFav: colorFav,
      fechaReserva: fechaReserva,
      personaReserva: personaReserva,
    };

    setAlumno([...alumno, nuevoAlumno]);
    setNombre('');
    setCarnet('');
    setColorFav('');
    setFechaReserva(new Date());
    setPersonaReserva('');
    setModalVisible(false);
  };

  const eliminarAlumno = (id) => {
    setAlumno(alumno.filter((alumno) => alumno.id !== id));
  };

  return (
    <View style={styles.container}>
      <Button title="Agregar Alumno" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Carnet"
              keyboardType="numeric"
              value={carnet}
              onChangeText={setCarnet}
            />
            <TextInput
              style={styles.input}
              placeholder="Materia favorita"
              value={colorFav}
              onChangeText={setColorFav}
            />
            <TouchableOpacity onPress={showDatepicker}>
              <Text>Seleccionar fecha de nacimiento</Text>
            </TouchableOpacity>
            <Text>selected: {fechaReserva.toLocaleString()}</Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
                locale="es-ES"
              />
            )}
            <Button title="Agregar Alumno" onPress={agregarAlumno} />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      <FlatList
        data={alumno}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.clienteItem}>
            <View style={styles.conte}>
              <Text style={styles.clienteNombre}>{item.id}</Text>
              <TouchableOpacity
                style={styles.buttonEliminar}
                onPress={() => eliminarAlumno(item.id)}>
                <Text style={styles.clienteNombre}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.clienteNombre}>{item.nombre}</Text>
            <Text style={styles.clienteNombre}>{item.carnet}</Text>
            <Text style={styles.clienteNombre}>{item.colorFav}</Text>
            <Text style={styles.clienteFecha}>
              Fecha de nacimiento: {item.fechaReserva.toDateString()}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001222',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  clienteItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  clienteNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clienteFecha: {
    fontSize: 16,
  },
  conte: {
    flexDirection: 'row',
  },
  buttonEliminar: {
    marginLeft: 300,
  },
});

export default App;