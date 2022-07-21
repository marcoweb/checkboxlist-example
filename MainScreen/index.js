import { View, Text, FlatList, TextInput, Button, TouchableHighlight, Alert } from "react-native";
import { useEffect, useState } from "react";
import { query, collection, getDocs, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore"
import { firestore } from '../firebase'
import Checkbox from 'expo-checkbox'

import { styles } from './styles'

const MainScreen = () => {
    const [ tarefas, setTarefas ] = useState([])
    const [ tarefaEmEdicao, setTarefaEmEdicao ] = useState({ id: 0, rotulo: '' })

    async function loadTarefas() {
        try {
            const q = query(collection(firestore, "tarefas"))
            const queryResult = await getDocs(q)
            let items = []
            queryResult.forEach((doc) => {
                items.push({
                    id: doc.id,
                    rotulo: doc.data().rotulo,
                    status: doc.data().status
                })
            })
            setTarefas(items)
        } catch (error) {
            console.log(error)
        }
    }

    async function setTarefaCheck(tarefa) {
        try {
            await setDoc(doc(firestore, "tarefas", tarefa.id), {status: !tarefa.status}, {merge: true})
            loadTarefas()
        } catch (error) {
            console.log(error)
        }
    }

    function limpaTarefaEmEdicao() {
        setTarefaEmEdicao({ id: 0, rotulo: '' })
    }

    useEffect(() => {
        loadTarefas()
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text>Tarefa:</Text>
                <TextInput style={styles.input}  value={tarefaEmEdicao.rotulo} placeholder="Digite uma nova tarefa"
                    onChangeText={text => setTarefaEmEdicao({id: tarefaEmEdicao.id, rotulo: text})} />
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Limpar" onPress={() => limpaTarefaEmEdicao()} />
                </View>
                <View style={styles.button}>
                    <Button title="Salvar" />
                </View>
            </View>
            <FlatList data={tarefas} renderItem={({ item }) =>
                <View style={styles.taskContainer}>
                    <Checkbox style={{height: 30, width: 30}} value={item.status} onValueChange={() => setTarefaCheck(item)} />
                    <TouchableHighlight onPress={() => setTarefaEmEdicao(item)} onLongPress={() => deleteTarefa(item)}>
                        <Text style={styles.task} >{item.rotulo}</Text>
                    </TouchableHighlight>
                </View>} keyExtractor={item => item.id} />
        </View>
    )
}

export default MainScreen

