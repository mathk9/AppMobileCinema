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
import { addUser } from '../services/dbservice';

import Alert from './Alert';

export default function SignupForm({navigation}){
  const [email, setEmail] = React.useState('');
  const [accountName, setAccountName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordVerify, setPasswordVerify] = React.useState('');
  const [alert, setAlert] = React.useState();

  const handleSuccess = async () => {
    setEmail(null);
    setAccountName(null);
    setPassword(null);
    setPasswordVerify(null);
  };

  // Handle the form submission by calling Userfront.signup()
  const handleSubmit = async () => {
    console.log("Entrou no submit");
    // Reset the alert to empty
    setAlert(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email))
      return setAlert('Digite um email válido');

    if(accountName.length <= 0 ){
      console.log("accountName: "+accountName);
      return setAlert('Digite um nome de usuário válido');
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{5,}$/;
    if(!passwordRegex.test(password))
      return setAlert('Digite uma senha válida');

    // Verify that the passwords match
    if (password !== passwordVerify) {
      return setAlert('Senha e Confirmação de senha não batem');
    }

    try {
      let obj = {
        accountName : accountName,
        password : password,
        email : email,
      };

      let response = await addUser(obj);

      if(response)
        navigation.navigate('Home');
      else
        setAlert('Erro ao salvar cadartro.');

      handleSuccess();
    }
    catch (error) {
      console.log(error);
      setAlert(error.message);
    }
    
  };

  return (
    <Card style={styles.container}>
      <View style={styles.containerSignup}>
        <Text style={styles.paragraph}>Cadastro</Text>
        <SafeAreaView>
          <Alert message={alert} />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <TextInput
            style={styles.input}
            onChangeText={setAccountName}
            value={accountName}
            placeholder="Nome de usuário"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Senha"
            textContentType="password"          
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            onChangeText={setPasswordVerify}
            value={passwordVerify}
            textContentType="password"
            placeholder="Confirmação de senha"          
            secureTextEntry={true}
          />
          <Button
            style={styles.button}
            onPress={handleSubmit}
            title="Cadastrar"
            accessibilityLabel="Sign up"
          />
        </SafeAreaView>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 50,
  },
  containerSignup: {
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
});