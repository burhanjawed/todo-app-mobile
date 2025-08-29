import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { data } from '@/data/todos';

export default function Index() {
  const [todoInput, setTodoInput] = useState('');
  const [todoData, setTodoData] = useState(data.sort((a, b) => b.id - a.id));

  const addNewTodo = () => {
    const title = todoInput.trim();
    if (!title) return;

    const todoObj = {
      id: todoData.length > 0 ? todoData[0].id + 1 : 1,
      title,
      completed: false,
    };

    setTodoData((prev) => [todoObj, ...prev]);
    setTodoInput('');
  };

  const toggleTodo = (id) => {
    setTodoData(
      todoData.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodoData((prev) => prev.filter((t) => t.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text
        style={[styles.todoItemText, item.completed && styles.completedText]}
        onPress={() => toggleTodo(item.id)}
      >
        {item.title}
      </Text>
      <Pressable onPress={() => deleteTodo(item.id)}>
        <MaterialCommunityIcons
          name='delete-circle'
          size={36}
          color='red'
          style={styles.todoItemTrashIcon}
        />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Add a new todo'
          placeholderTextColor='gray'
          onChangeText={setTodoInput}
          value={todoInput}
        />
        {/* <TouchableOpacity style={styles.todoButton} onPress={addNewTodo}>
          <Text style={styles.todoButtonText}>Add</Text>
        </TouchableOpacity> */}
        <Pressable style={styles.inputButton} onPress={addNewTodo}>
          <Text style={styles.inputButtonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={todoData}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.todoList}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // padding: 15,
    // marginTop: -30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto',
    // gap: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginRight: 10,
    fontSize: 18,
    minWidth: 0,
    color: 'white',
  },
  inputButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  inputButtonText: {
    fontWeight: 600,
    fontSize: 18,
    color: 'black',
  },
  todoList: {
    // marginBlock: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto',
  },
  todoItemText: {
    flex: 1,
    fontSize: 18,
    color: 'white',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  todoItemTrashIcon: {
    // marginRight: 10,
    // backgroundColor: 'red',
    // padding: 10,
    // borderRadius: 100,
  },
});
