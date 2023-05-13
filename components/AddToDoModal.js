import { View, TextInput, Text, Button } from "react-native";
import AppStyles from "../styles/AppStyles";
import { useState } from "react";

export default function AddToDoModal(props)
{
    const [todo, setTodo] = useState("")
return (
<View style={AppStyles.container}>
    <Text style={AppStyles.header}>Agregar Tarea</Text>
    <TextInput style={[AppStyles.textInput,AppStyles.darkTextInput]} 
        placeholder='Tarea'
        value={todo} onChangeText={setTodo}/>
        
        <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin]}>
            <Button title="Cancelar" onPress={props.onClose}/>
            <Button title="Ok" onPress={() => {
                props.addToDo(todo);
                setTodo("");
                props.onClose();
            }}/>
        </View>
</View>
)
}