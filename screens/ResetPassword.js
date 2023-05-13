import { Button, ImageBackground, KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/InlineTextButton';
import { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ResetPassword({navigation}) {

const background = require("../assets/imagebg.jpg")

const [email, setEmail] = useState("")
const [errorMessage, setErrorMessage] = useState("")

let resetPassword = () =>
{
    sendPasswordResetEmail(auth, email)
    .then(() => {
        navigation.popToTop();
    }).catch((error) => {
        setErrorMessage(error.message);
    })
}

return (
<ImageBackground style={AppStyles.imageContainer} source={background}>
    <KeyboardAvoidingView style={AppStyles.backgroundCover} 
    behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={60}>
    
    <Text style={[AppStyles.lightText, AppStyles.header]}>Reset Password</Text>
    <Text style={AppStyles.errorText}>{errorMessage}</Text>
    
    <TextInput style={[AppStyles.textInput,AppStyles.lightTextInput, AppStyles.lightText]} 
        placeholder='Email'
        value={email} onChangeText={setEmail} 
        placeholderTextColor="#BEBEBE"/>
        
        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
        <   Text style={AppStyles.lightText}>Don't have an account? </Text> 
            <InlineTextButton text="Sign Up" onPress={() => navigation.navigate("SignUp")}/>
        </View>
    
        <Button title='Reset Password' onPress={resetPassword} color="#f7b567"/>
    </KeyboardAvoidingView>
</ImageBackground>
);
}
