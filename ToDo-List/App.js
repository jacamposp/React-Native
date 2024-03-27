import { useEffect, useState, useRef } from "react";
import { Text, View, SafeAreaView, ScrollView, Alert } from "react-native";

import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Header } from "./components/Header/Header.jsx";
import { CardTodo } from "./components/CardTodo/CardTodo.jsx";
import { TabBottomMenu } from "./components/TabBottomMenu/TabBottomMenu.jsx";
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd.jsx";

import { styles } from "./App.style.js";

let isFirstRender = true;
let isLoadUpdate = false;

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [isAddDialogDisplayed, setIsAddDialogDisplayed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollToEndRef = useRef();

  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    if (!isLoadUpdate) {
      if (!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    } else {
      isLoadUpdate = false;
    }
  }, [todoList]);

  async function loadTodoList() {
    console.log("LOAD");
    try {
      const todoListString = await AsyncStorage.getItem("@todoList");
      const parsedTodolist = JSON.parse(todoListString);
      isLoadUpdate = true;
      setTodoList(parsedTodolist || []);
    } catch (error) {
      alert(error);
    }
  }

  async function saveTodoList() {
    console.log("SAVE");
    try {
      await AsyncStorage.setItem("@todoList", JSON.stringify(todoList));
    } catch (error) {
      alert(error);
    }
  }

  function getFilteredList() {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted);
      case "done":
        return todoList.filter((todo) => todo.isCompleted);
    }
  }

  function deleteTodo(todoToDelete) {
    Alert.alert("Delete todo", "Are you sure you want to delete this todo?", [
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((t) => t.id !== todoToDelete.id));
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View key={todo.id} style={styles.cardItem}>
        <CardTodo onLongPress={deleteTodo} onPress={updateTodo} todo={todo} />
      </View>
    ));
  }

  function updateTodo(todo) {
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
    const updatedTodoList = [...todoList];
    const indexToUpdate = updatedTodoList.findIndex(
      (t) => t.id === updatedTodo.id
    );
    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);
  }

  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setIsAddDialogDisplayed(false);
    setInputValue("");
    setTimeout(() => {
      scrollToEndRef.current.scrollToEnd();
    }, 300);
  }

  function renderAddDialog() {
    return (
      <Dialog.Container
        visible={isAddDialogDisplayed}
        onBackdropPress={() => setIsAddDialogDisplayed(false)}
      >
        <Dialog.Title>Add Todo</Dialog.Title>
        <Dialog.Description>Choose a name for your todo</Dialog.Description>
        <Dialog.Input
          onChangeText={setInputValue}
          placeholder="Ex: Go to the gym"
        />
        <Dialog.Button
          label="Cancel"
          color="grey"
          onPress={() => setIsAddDialogDisplayed(false)}
        />
        <Dialog.Button
          disabled={inputValue.length === 0}
          label="Save"
          onPress={addTodo}
        />
      </Dialog.Container>
    );
  }

  return (
    <>
      <View style={styles.app}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Header />
          </View>
          <View style={styles.body}>
            <ScrollView ref={scrollToEndRef}>{renderTodoList()}</ScrollView>
          </View>
          <ButtonAdd onPress={() => setIsAddDialogDisplayed(true)} />
        </SafeAreaView>
      </View>
      <View style={styles.footer}>
        <TabBottomMenu
          todoList={todoList}
          onPress={setSelectedTabName}
          selectedTabName={selectedTabName}
        />
      </View>
      {renderAddDialog()}
    </>
  );
}
