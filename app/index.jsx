import { ThemeContext } from '@/context/ThemeContext';
import { Inter_500Medium, useFonts } from '@expo-google-fonts/inter';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { data } from '@/data/todos';

export default function Index() {
  const [todoInput, setTodoInput] = useState('');
  const [todoData, setTodoData] = useState(data.sort((a, b) => b.id - a.id));

  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  if (!loaded && !error) {
    return null;
  }

  const styles = createStyles(theme, colorScheme);

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
        <Pressable
          style={{ marginLeft: 10 }}
          onPress={() =>
            setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
          }
        >
          <Octicons
            name={colorScheme === 'dark' ? 'moon' : 'sun'}
            size={36}
            color={theme.text}
            selectable={undefined}
            style={{ width: 36 }}
          />
        </Pressable>
      </View>
      <Animated.FlatList
        data={todoData}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.todoList}
        renderItem={renderItem}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode='on-drag'
      />
    </SafeAreaView>
  );
}

function createStyles(theme, colorScheme) {
  return new StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
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
    },
    input: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      marginRight: 10,
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      minWidth: 0,
      color: theme.text,
    },
    inputButton: {
      padding: 10,
      backgroundColor: theme.button,
      borderRadius: 5,
    },
    inputButtonText: {
      fontWeight: 600,
      fontSize: 18,
      color: colorScheme === 'dark' ? 'black' : 'white',
    },
    todoList: {},
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
      fontFamily: 'Inter_500Medium',
      color: theme.text,
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
}
