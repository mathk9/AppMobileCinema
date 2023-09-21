import { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  StyleSheet,
  ScrollView
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Card } from 'react-native-paper';
import Alert from './Alert';
import Movie from './Movie';
import { getAllMovies } from '../services/dbservice';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import ListOrder from './ListOrder'

export default function Home({navigation}){

  const [movies, setMovies] = useState([]);
  const [cart, setCart] = useState([]);
  const [qntCart, setQntCart] = useState(0);
  const [alert, setAlert] = useState();

  useEffect(
    () => {
      console.log('executando useffect');
      processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
    }, []);

  async function processamentoUseEffect() {
    setMovies(await getAllMovies());
  }

  const removeToCart = async (id) => {
    setAlert(null);
    console.log('removeFromCart');
    const listCart = [...cart]; 
    console.log('listCart: ');
    console.log(listCart);

    let cartAux = movies.find(movie => movie.id === id);
    cartAux.price = cartAux.price / cartAux.seats.length

    const indexToRemove = listCart.findIndex(item => item.id === id);

    if (indexToRemove !== -1) {
      listCart.splice(indexToRemove, 1);
      setAlert('Item removido do carrinho.');
    } else {
      setAlert('O item não foi encontrado no carrinho.');
    }

    console.log('listCart2: ');
    console.log(listCart);
    setCart(listCart);
    setQntCart(listCart.length);
  };

  async function addToCart(id, seats) {
    setAlert(null);
    const listCart = [...cart];
    let cartAux = movies.find(movie => movie.id === id);

    if (!listCart.some(item => item.id === id)) {
      cartAux.seats = seats;
      cartAux.price = cartAux.price * cartAux.seats.length
      listCart.push(cartAux);
      
    } else {
      setAlert('O item já está no carrinho.');
    }

    setCart(listCart);
    console.log('cart');
    console.log(cart);
    setQntCart(listCart.length); 
  }
  
  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() => navigation.navigate('Order', { cart: cart })}
        style={styles.cartIconContainer}
      >
        <Icon name="shopping-cart" size={30} color="#007AFF" />
        {qntCart > 0 && (
          <Text style={styles.cartItemCount}>{qntCart}</Text>
        )}
      </TouchableOpacity>
      
      <Text style={styles.paragraph}>Filmes</Text>   
      <Alert message={alert} />
        <ScrollView style={styles.listMovies}>
          {
            movies.map((movie, index) => (
              <Movie movie={movie} key={index.toString()}
                removeToCart={removeToCart} addToCart={addToCart} />
            ))
          }
        </ScrollView>
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
  listMovies: {
    marginBottom: 10,
    height: '85%',
  },
  button: {
    width: '10%',
  },
  cartIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    marginTop: 16,
    display: 'flex',
    float: 'left',
  },
  cartItemCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
    color: '#007AFF',
  },
  
});