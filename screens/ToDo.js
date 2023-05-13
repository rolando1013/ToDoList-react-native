import { Button, Text, View, SafeAreaView, Modal, ActivityIndicator, FlatList } from "react-native";
import AppStyles from "../styles/AppStyles";
import { auth, db } from "../firebase";
import { signOut, sendEmailVerification } from "firebase/auth";
// import InlineTextButton from "../.expo/components/InlineTextButton";
import { useState } from "react";
import AddToDoModal from "../components/AddToDoModal";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where, setDoc } from "firebase/firestore";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from 'react-native-vector-icons/Entypo';

export default function ToDo({navigation})
{

const [modalVisible, setModalVisible] = useState(false)
const [isLoadign, setIsLoadign] = useState(true)
const [isRefreshing, setIsRefreshing] = useState(false);
const [toDos, setToDos] = useState([])


let loadToDoList = async () => {
  const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  let toDos = [];
  querySnapshot.forEach((doc) => {
    let toDo = doc.data();
    toDo.id = doc.id;
    toDos.push(toDo);
  });
  // console.log(toDos);
  setToDos(toDos);
  setIsLoadign(false);
  setIsRefreshing(false);
};

if (isLoadign) {
  loadToDoList();
}

let checkToDoItem = (item, isChecked) => {
  const toDoRef = doc(db, 'todos', item.id);
  setDoc(toDoRef, { completed: isChecked }, { merge: true });
};

let deleteToDo = async (toDoId) => {
  await deleteDoc(doc(db, "todos", toDoId));
  let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
  setToDos(updatedToDos);
};


let renderToDoItem = ({item}) => {
  return (
    <View  style={[AppStyles.rowContainer, AppStyles.rightMargin, AppStyles.leftMargin]}>
      <View style={AppStyles.fillSpace}>
        <BouncyCheckbox
          isChecked={item.complated}
          size={25}
          fillColor="#258ea6"
          unfillColor="#FFFFFF"
          text={item.text}
          iconStyle={{ borderColor: "#258ea6" }}
          onPress={(isChecked) => { checkToDoItem(item, isChecked)}}
        />
      </View>
      <Icon style={{marginTop:10, marginBottom:20}} name="trash" size={30} color="#d00000"  onPress={() => deleteToDo(item.id)} />
    </View>
  );
}

// Refresh the list of items
let showToDoList = () => {
  return (
    <FlatList
      data={toDos}
      refreshing={isRefreshing}
      onRefresh={() => {
        loadToDoList();
        setIsRefreshing(true);
      }}
      renderItem={renderToDoItem}
      keyExtractor={item => item.id} />
  )
};

let showContent = () =>
{
  return (
    <View>
      {isLoadign ? <ActivityIndicator size="large"/> : showToDoList() }
      <Button title='Agregar tarea' onPress={() => setModalVisible(true)} color="#06d6a0"/>
    </View>
    )
}

let showSendVerificationEmail = () =>
{
  return (
  <View>
    <Text>Por favor, verifique su correo</Text>
    <Button title="Send Verificacion Email" onPress={() => sendEmailVerification(auth.currentUser)}/>
  </View>  
  )
}

let addToDo = async (todo) => {
  let toDoToSave = {
    text: todo,
    completed: false,
    userId: auth.currentUser.uid
  };
  const docRef = await addDoc(collection(db, "todos"), toDoToSave);
  toDoToSave.id = docRef.id;
  let updatedToDos = [...toDos];
  updatedToDos.push(toDoToSave);
  setToDos(updatedToDos);
};


return(
        <SafeAreaView>       
          <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.topMargin]}>
            <Icon name="menu" size={40} color="#415a77" onPress={() => navigation.navigate("ManageAccount")} />
          </View>
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false) }>
          <AddToDoModal onClose={() => setModalVisible(false)} addToDo={addToDo}/>
          </Modal>
            <Text style={AppStyles.header}>Tareas</Text>
          {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail()}
        </SafeAreaView>
    )
}