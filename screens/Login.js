import { Button, ImageBackground, KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import AppStyles from '../styles/AppStyles';
import { useState } from 'react';
import InlineTextButton from '../components/InlineTextButton';
import { signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { auth } from '../firebase';
import Icon from 'react-native-vector-icons/Entypo';

export default function Login({navigation}) {

const background = require("../assets/imagebg.jpg")

if (auth.currentUser) {
    navigation.navigate("ToDo");
}
else{
    onAuthStateChanged(auth, (user) => {
    if (user) {
        navigation.navigate("ToDo");
    }
    });
}

const [errorMessage, setErrorMessage] = useState("");
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")


let login = () => {
if (email !== "" && password !== "") {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        navigation.navigate("ToDo", { user: userCredential.user });
        setErrorMessage("");
        setEmail("");
        setPassword("");
    })
    .catch((error) => {
        setErrorMessage(error.message)
    });
    } else {
        setErrorMessage("Por favor, ingrese su correo y contraseña");
    }
}



return (
<ImageBackground style={AppStyles.imageContainer} source={background}>
    <KeyboardAvoidingView style={AppStyles.backgroundCover} 
    behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={60}>
    
    <Text style={[AppStyles.lightText, AppStyles.header]}>Login</Text>
    <Text style={AppStyles.errorText}>{errorMessage}</Text>
    
    <TextInput style={[AppStyles.textInput,AppStyles.lightTextInput, AppStyles.lightText]} 
        placeholder='Correo'
        value={email} onChangeText={setEmail} 
        placeholderTextColor="#BEBEBE"/>
    
    <TextInput style={[AppStyles.textInput,AppStyles.lightTextInput,AppStyles.lightText]} 
        placeholder='Contraseña' 
        placeholderTextColor="#BEBEBE"
        value={password} onChangeText={setPassword}
        secureTextEntry={true}/>
    
        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
        <   Text style={AppStyles.lightText}>Don't have an account? </Text> 
            <InlineTextButton text="Sign Up" onPress={() => navigation.navigate("SignUp")}/>
        </View>
    
        <View style={AppStyles.rowContainer}>
            <Text style={AppStyles.lightText}>Forgotten your password?  </Text> 
            <InlineTextButton text="Reset" onPress={() => navigation.navigate("ResetPassword")}/>
        </View>

        <Icon style={{marginTop:20}} name="login" onPress={login} size={50} color="#4F8EF7" />
    </KeyboardAvoidingView>
</ImageBackground>
);
}
