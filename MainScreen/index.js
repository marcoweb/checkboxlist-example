import { View, Text, FlatList, TextInput, Button, TouchableHighlight, Alert } from "react-native";
import { useEffect, useState } from "react";
import Checkbox from 'expo-checkbox'

import { styles } from './styles'

const MainScreen = () => {
    const [ tarefas, setTarefas ] = useState([
        { id: 1, rotulo: 'Tarefa 1', checked: false },
        { id: 2, rotulo: 'Tarefa 2', checked: false },
        { id: 3, rotulo: 'Tarefa 3', checked: false }
    ])
    const [ tarefaEmEdicao, setTarefaEmEdicao ] = useState({ id: 0, rotulo: '' })

    function limpaTarefaEmEdicao() {
        setTarefaEmEdicao({ id: 0, rotulo: '' })
    }

    function setCheckbox(id) {
        let list = []
        tarefas.forEach((item) => {
          if(item.id === id) {
            list.push({id: item.id, rotulo: item.rotulo, checked: !item.checked})
          } else {
            list.push(item)
          }
        })
        setTarefas(list)
      }

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
                    <Checkbox value={item.checked} onValueChange={() => setCheckbox(item.id)} />
                    <TouchableHighlight onPress={() => setTarefaEmEdicao(item)} onLongPress={() => deleteTarefa(item)}>
                        <Text style={styles.task} >{item.rotulo}</Text>
                    </TouchableHighlight>
                </View>} keyExtractor={item => item.id} />
        </View>
    )
}

export default MainScreen

