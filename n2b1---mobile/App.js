import { useEffect } from 'react';
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files

import SignupForm from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Order from './components/Order';
import Seats from './components/Seats';
import ListOrder from './components/ListOrder';

import { Card } from 'react-native-paper';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createTable, addMovie, getAllMovies } from './services/dbservice';

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    Login,
    Seats,
    ListOrder,
    Order,
    SignupForm,
  })
);

export default function App() {

  let tabelasCriadas = false;

  useEffect(
    () => {
      console.log('executando useffect');
      processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
    }
  );

    async function processamentoUseEffect() {
      if (!tabelasCriadas) {
        console.log("Verificando necessidade de criar tabelas...");
        tabelasCriadas = true;
        await createTable();
      }
      
      // descomentar para criar um novo filme
      // obj = {
      //   movieName : 'Besouro Azul',
      //   category : 'Ficção',
      //   price : 37.85,
      //   description : 'Filme de heroi da DC',
      //   sessionDate : '20/09/2023 20:30',
      // }
      // await addMovie(obj);
      
      // console.log(await getAllMovies());
    }

  return (
    <View style={styles.container}>
      <View>
        <Routes />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 11,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});