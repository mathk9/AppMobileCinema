import {
    TouchableOpacity, View, Image, StyleSheet, ImageBackground
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import bg from '../assets/oppenheimer-poster-mobile-5166c.jpg';
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function Movie({movie, removeToCart, addToCart}) {
    return (        
        <Card style={styles.movieContainer}>
          <Card.Title title={movie.movieName} subtitle={movie.category} />
          <Card.Content>
            <Text variant="titleLarge">{movie.description}</Text>
            <Text variant="bodyMedium">R${movie.price.toFixed(2)}</Text>
          </Card.Content>
          <Card.Cover source={bg} />
          <Card.Actions>
            <Button onPress={() => addToCart(movie.id)}>Add</Button>
            <Button onPress={() => removeToCart(movie.id)}>Cancel</Button>
          </Card.Actions>
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
});
