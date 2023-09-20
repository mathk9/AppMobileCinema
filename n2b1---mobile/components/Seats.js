import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Seats({ movie, addToCart, displayModal }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelection = (seat) => {
    const updatedSeats = [...selectedSeats];

    if (updatedSeats.includes(seat)) {
      const index = updatedSeats.indexOf(seat);
      updatedSeats.splice(index, 1);
    } else {
      updatedSeats.push(seat);
    }

    setSelectedSeats(updatedSeats);
  };

  const handleAddToCart = () => {
    if (selectedSeats.length > 0) {
      addToCart(movie.id, selectedSeats);
      displayModal();
    } else {
      // Exiba uma mensagem de erro ou aviso ao usuário informando que nenhum assento foi selecionado.
    }
  };

  return (
    <View style={styles.container}>
      <Text>Selecione seus assentos para {movie.movieName}:</Text>
      <View style={styles.cinemaContainer}>
        {/* Renderize os assentos disponíveis no formato de sala de cinema */}
        {renderCinemaSeats()}
      </View>
      <Button title="Adicionar ao Carrinho" onPress={handleAddToCart} />
    </View>
  );

  // Função para renderizar os assentos no formato de sala de cinema
  function renderCinemaSeats() {
    const numRows = 5; // Número de fileiras
    const numSeatsPerRow = 5; // Número de assentos por fileira
    const seats = [];

    for (let row = 1; row <= numRows; row++) {
      const rowSeats = [];
      for (let seatNum = 1; seatNum <= numSeatsPerRow; seatNum++) {
        const seat = `L ${row}, A ${seatNum}`;

        rowSeats.push(
          <Button
            key={seat}
            title={seat}
            onPress={() => handleSeatSelection(seat)}
            color={selectedSeats.includes(seat) ? 'green' : 'gray'}
            style={styles.seatButton}
          />
        );
      }
      seats.push(
        <View key={`row-${row}`} style={styles.rowContainer}>
          {rowSeats}
        </View>
      );
    }

    return seats;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  cinemaContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  seatButton: {
    width: 30,
    height: 40,
    margin: 5,
  },
});
