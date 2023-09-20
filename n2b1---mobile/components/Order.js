import * as React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export default function PedidoScreen({ route }) {
  const { cart } = route.params;
  
  console.log('cart: ');
  console.log(cart);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo da Compra</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.movieName}</Text>
                <Text style={styles.itemPrice}>Preço: R${movie.price.toFixed(2)}</Text>
                <Text style={styles.itemDate}>Data: {item.sessionDate}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#777',
  },
  itemDate: {
    fontSize: 16,
    color: '#777',
  },
});
