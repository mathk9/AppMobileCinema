import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, SafeAreaView, Button } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function Order({ navigation }) {
  const { cart } = navigation.state.params;
  
  console.log('cart: ');
  console.log(cart);  

  const handleSubmit = async () => {
    
  }
  
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.paragraph}>Resumo da Compra</Text>
        <DataTable>

          <DataTable.Header>
            <DataTable.Title >Filme</DataTable.Title>
            <DataTable.Title >Data</DataTable.Title>
            <DataTable.Title >Preço</DataTable.Title>
            <DataTable.Title numeric>Assentos</DataTable.Title>
          </DataTable.Header>

          {cart.map((item, index) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell >{item.movieName}</DataTable.Cell>
              <DataTable.Cell >{item.sessionDate}</DataTable.Cell>
              <DataTable.Cell >R${item.price.toFixed(2)}</DataTable.Cell>
              <DataTable.Cell numeric>
                {item.seats.map((seat)=> seat)}
              </DataTable.Cell>
            </DataTable.Row>
            
          ))}

        </DataTable>

        <View style={styles.total}>
          <Text >Total:</Text>
          <Text >
            ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
          </Text>
        </View>

        <Button
          style={styles.button}
          title="Finalizar Compra"
          color="#f194ff"
          mode="contained"
          accessibilityLabel="Finalizar"
        />
        <Button
          style={styles.button}
          title="Reiniciar a compra"
          color="red"
          mode="contained"
          onPress={()=> navigation.navigate('Home')}
          accessibilityLabel="Reiniciar"
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  paragraph: {
    marginBottom: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 16,
    marginBottom: 25,
  },
  button: {
    position: 'absolute',
    marginBottom: 12,
    padding: 8,
    top: '95%',
  },
});