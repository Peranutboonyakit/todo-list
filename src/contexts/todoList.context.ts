import { createContext } from "react";
import axios from "axios";
import { makeAutoObservable } from "mobx";

import { TodoListType } from "../types/types";

const config_API = {
  url: "http://localhost:3001/todos",
  headers: {
    headers: { "Content-Type": "application/json" },
  },
};

class TodoListContext {
  todoList: Array<TodoListType>;
  selectedDropdown: string;
  isLoading: boolean;
  valueAddText: string;
  countCompleteTasks: number;
  totalTasks: number;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.todoList = [];
    this.selectedDropdown = "All";
    this.isLoading = true;
    this.valueAddText = "";
    this.countCompleteTasks = 0;
    this.totalTasks = 0;

    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  async getTodoList() {
    try {
      this.isLoading = true;
      const resp = await axios.get(config_API.url, {
        params: this.checkParamsFilter(),
      });
      if (resp.data.length > 0) {
        // Data
        this.todoList = resp.data;

        if (this.selectedDropdown === "All") {
          // Total tasks length
          this.totalTasks = resp.data.length;
          // Tasks completed
          let filterComplete = resp.data.filter(
            (v: any) => v.completed === true
          );
          this.countCompleteTasks = filterComplete.length;
        }
      } else {
        this.todoList = [];
        this.totalTasks = 0;
        this.countCompleteTasks = 0;
      }
      this.isLoading = false;
    } catch (err: any) {
      this.isLoading = false;
      throw err;
    }
  }

  async putCheckedTask(value: TodoListType) {
    try {
      const formData = {
        title: value.title,
        completed: value.completed ? false : true,
      };
      const resp = await axios.put(
        config_API.url + `/${value.id}`,
        formData,
        config_API.headers
      );
      if (resp.status === 200) {
        await this.getTodoList();
      }
    } catch (err: any) {
      throw err;
    }
  }

  async postCreatedTask() {
    try {
      const formData = {
        title: this.valueAddText,
        completed: false,
      };
      const resp = await axios.post(
        config_API.url,
        formData,
        config_API.headers
      );
      if (resp.status === 201) {
        this.valueAddText = "";
        await this.getTodoList();
      }
    } catch (err: any) {
      throw err;
    }
  }

  async deletedTask(id: string) {
    try {
      const resp = await axios.delete(config_API.url + `/${id}`);
      if (resp.status === 200) {
        await this.getTodoList();
      }
    } catch (err: any) {
      throw err;
    }
  }

  async putEditTask(value: TodoListType) {
    try {
      const formData = {
        title: value.title,
        completed: value.completed,
      };
      const resp = await axios.put(
        config_API.url + `/${value.id}`,
        formData,
        config_API.headers
      );
      if (resp.status === 200) {
        await this.getTodoList();
      }
    } catch (err: any) {
      throw err;
    }
  }

  //-------------------
  // FUNCTION
  //-------------------
  checkParamsFilter() {
    switch (this.selectedDropdown) {
      case "All":
        return {};
      case "Done":
        return { completed: true };
      case "Undone":
        return { completed: false };

      default:
        return {};
    }
  }
}

export const todoListContext = createContext(new TodoListContext());
