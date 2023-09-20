import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text, Modal } from 'react-native-paper';
import Seats from './Seats'; // Importe o componente SeatsSelection
import bg from '../assets/oppenheimer-poster-mobile-5166c.jpg';
import bg2 from '../assets/barbie.jpg';
import bg3 from '../assets/besouroAzul.jpg';

export default function Movie({ movie, removeToCart, addToCart }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const openSeatsSelectionModal = () => {
    setModalVisible(true);
  };

  const displayModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Card style={styles.movieContainer}>
      <Card.Title title={movie.movieName} subtitle={movie.category} />
      <Card.Content>
        <Text variant="titleLarge">{movie.description}</Text>
        <Text variant="bodyMedium">R${movie.price.toFixed(2)}</Text>
      </Card.Content>
      <Card.Cover source={bg} />
      <Card.Actions>
        <Button onPress={() => openSeatsSelectionModal()}>Selecionar Assentos</Button>
        <Button onPress={() => removeToCart(movie.id)}>Remover</Button>
      </Card.Actions>

      <Modal
        style={styles.modalContainer}
        visible={isModalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <Seats movie={movie} addToCart={addToCart} displayModal={displayModal} />
      </Modal>
    </Card>
  );
}

const styles = StyleSheet.create({
  movieContainer: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
  },
  modalContainer: {
    width: '100%',
  },
});
