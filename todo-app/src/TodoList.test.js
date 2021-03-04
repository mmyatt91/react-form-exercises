import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

function testList(todoList, task="clean bird cage") {
    const taskInput = todoList.getByLabelText("Task:");
    fireEvent.change(taskInput, { target: { value: task } });
    const btn = todoList.getByText("Add New Task")
    fireEvent.click(btn);
}

it("renders without crashing", function() {
    render(<TodoList />)
});

it("matches snapshot", function() {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it("should add task", function() {
    const todoList = render(<TodoList />);
    testList(todoList);

    // Expect form to reset and new task should be adde
    expect(todoList.getByLabelText("Task:")).toHaveValue("");
    expect(todoList.getByText("clean bird cage")).toBeInTheDocument();
    expect(todoList.getByText("Update")).toBeInTheDocument();
    expect(todoList.getByText("X")).toBeInTheDocument();
});

it("should edit task", function() {
    const todoList = render(<TodoList />);
    testList(todoList);

    fireEvent.click(todoList.getByText("Update"));
    const updateInput = todoList.getByDisplayValue("clean bird cage");
    fireEvent.change(updateInput, { target: { value: "meditate" }});
    fireEvent.click(todoList.getByText("Update"));

    // Expect only the updated task to be displayed
    expect(todoList.getByText("meditate")).toBeInTheDocument();
    expect(todoList.queryByText("clean bird cage")).not.toBeInTheDocument();
});

it("should remove task", function() {
    const todoList = render(<TodoList />);
    testList(todoList);

    fireEvent.click(todoList.getByText("X"));

    // Expect task to be deleted 
    expect(todoList.queryByText("clean bird cage")).not.toBeInTheDocument()
});