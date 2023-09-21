import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, SafeAreaView, Button } from 'react-native';
import { DataTable } from 'react-native-paper';
import { getAllOrdrUser } from '../services/dbservice';

export default function ListOrder({ navigation }) {

  const [orders, setOrders] = React.useState();

  React.useEffect(
    () => {      
      processamentoUseEffect();
    });

    async function processamentoUseEffect() {
      let list = await getAllOrdrUser('1');
      console.log('list');
      console.log(list);
      setOrders(list);      
    }
  
  return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title >Filme</DataTable.Title>
          <DataTable.Title >Preço</DataTable.Title>
          <DataTable.Title numeric>Assentos</DataTable.Title>
        </DataTable.Header>

        {orders.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell >{item.movieId}</DataTable.Cell>
            <DataTable.Cell >R${item.totalPrice.toFixed(2)}</DataTable.Cell>
            <DataTable.Cell numeric>{item.seats}</DataTable.Cell>
          </DataTable.Row>            
        ))}
      </DataTable>  
  );
}

const styles = StyleSheet.create({
});