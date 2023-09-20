import * as React from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Card } from 'react-native-paper';
import { getUser, getAllUser } from '../services/dbservice';

import Alert from './Alert';

export default function LoginForm({navigation}){

  const [emailOrUsername, setEmailOrUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [alert, setAlert] = React.useState();

  const handleSubmit = async () => {
    // Reset the alert to empty
    setAlert(null);
    
    try {
      let obj = {
        emailOrUsername : emailOrUsername,
        password : password,
      };

      let response = await getUser(obj);

      console.log('response: ');
      console.log(response);
      
      if(response.length > 0)
        navigation.navigate('Home');
      else
        setAlert('Credenciais inválidas. Tente novamente.');
    }
    catch (error) {
      console.log(error);
      setAlert(error.message);
    }
  }

  return (
    <Card style={styles.container}>
      <View style={styles.containerLogin}>
        <Text style={styles.paragraph}>Login</Text>
        <SafeAreaView>
          <Alert message={alert} />        
          <TextInput
            style={styles.input}
            onChangeText={setEmailOrUsername}
            value={emailOrUsername}
            keyboardType="email-address"
            placeholder="Usuário ou Email"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Senha"
            textContentType="password"          
            secureTextEntry={true}
          />
          <Button
            style={styles.button}
            onPress={handleSubmit}
            title="Entrar"
            accessibilityLabel="Entrar"
          />
        </SafeAreaView>
      </View>
      <View style={styles.containerSignup}>
        <Button
          style={styles.buttonSignup}
          onPress={()=>navigation.navigate('SignupForm')}
          mode="contained"
          color="#f194ff"
          title="Ainda não tenho uma conta"
          accessibilityLabel="Cadastrar"
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 50,
  },
  containerLogin: {
    padding: 20,
  },
  paragraph: {
    marginBottom: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
  },
  button: {
    marginBottom: 12,
    padding: 8,
  },
  buttonSignup: {
    marginBottom: 12,
    padding: 8,
  },
  containerSignup: {
    padding: 20,
  },
});