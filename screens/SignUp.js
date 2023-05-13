import { Button, ImageBackground, KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import AppStyles from '../styles/AppStyles';
import { useState } from 'react';
import InlineTextButton from '../components/InlineTextButton';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export default function SignUp({navigation}) {

const background = require("../assets/imagebg.jpg")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [validationMensaje, setValidationMensaje] = useState("")

let validateAndSet = (value, valueToComparate, setValue) =>
{
    if (value !== valueToComparate) {
        setValidationMensaje("Password don't match.")
    }
    else{
        setValidationMensaje("")
    }
    setValue(value)
}

let signUp = () => {
    if (password === confirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sendEmailVerification(auth.currentUser)
            navigation.navigate("ToDo",{user:userCredential.user})
        }).catch((error) => {
            setValidationMensaje(error.message)
        });
    }
}


return (
<ImageBackground style={AppStyles.imageContainer} source={background}>
    <KeyboardAvoidingView style={AppStyles.backgroundCover} 
    behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={60}>
    <Text style={[AppStyles.lightText, AppStyles.header]}>Sign Up</Text>
    <Text style={[AppStyles.errorText]}>{validationMensaje}</Text>
    
    <TextInput style={[AppStyles.textInput,AppStyles.lightTextInput, AppStyles.lightText]} 
        placeholder='Email'
        value={email} onChangeText={setEmail} 
        placeholderTextColor="#BEBEBE"/>
    
    <TextInput style={[AppStyles.textInput,AppStyles.lightTextInput,AppStyles.lightText]} 
        placeholder='Password' 
        placeholderTextColor="#BEBEBE"
        value={password} onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)}
        secureTextEntry={true}/>
    
    <TextInput style={[AppStyles.textInput,AppStyles.lightTextInput,AppStyles.lightText]} 
        placeholder='Confirm Password' 
        placeholderTextColor="#BEBEBE"
        value={confirmPassword} onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)}
        secureTextEntry={true}/>
        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
        <Text style={AppStyles.lightText}> Already have an account? </Text> 
        <InlineTextButton text="Login" onPress={() => navigation.popToTop()}/>
        </View>
        <Button title='Sign Up' onPress={signUp} color="#f7b567"/>
    </KeyboardAvoidingView>
</ImageBackground>
);
}
