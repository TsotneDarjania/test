import React, { useState, useRef } from 'react';
import "./index.css"

/**
 * TaskManager Component
 * 
 * A React component that manages a list of tasks with the following features:
 * - Add new tasks via input field and "Add Task" button
 * - Display tasks in an unordered list
 * - Toggle task completion status by clicking on task text
 * - Remove tasks via "Remove" button
 * - Completed tasks show with line-through style
 * - The component should have a state variable `tasks` which is an array of tasks
 * - Each task should have a unique id, a text, and a completed property
 * - {id: somethingUnique, text: 'task text', completed: false} 
 */
function TaskManager() {

    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState({})

    const taskInpuField = useRef()


    function changeTaskStatus(taskId){
   
    const updatedTasks = tasks.map((task) => {
        if(task.id === taskId){
            task.isComplete = !task.isComplete
        }

        return task;
    })

       setTasks(updatedTasks)
    }


    function addTask(){
       
        if(!task.value){
            alert("Name of task is empty")
return;
        } 
        const newTasksList = [...tasks]
        newTasksList.push(task)
        setTasks(newTasksList)
        setTask({})
    }

    function removeTask(taskId){
        const newTasksList  = tasks.filter((task) => task.id !== taskId)
        setTasks(newTasksList)
    }

    function createNewTask(e){
            setTask({
                id: `id_${e.currentTarget.value}_${Math.random() * 1000}`,
                value : e.currentTarget.value,
                isComplete : false
            })
    }

    return (
        <div>
            <h1>Task Manager</h1>
            <input ref={taskInpuField} onChange={(e) => createNewTask(e)} type="text" placeholder='Enter a new task' />
            <button onClick={()=> {
              
                addTask()
                // console.log(taskInpuField)
                  taskInpuField.current.value = ""
            }}>Add Task</button>
            <ul>
                {tasks.map((task) => (
                    <li style={{cursor: "pointer"}} key={task.id} onClick={() => {
                       changeTaskStatus(task.id)
                    }}> <span >{task.value}</span>
                        <button onClick={() => {
                          removeTask(task.id)
                        }}>Remove</button>
                        {task.isComplete ? "done" : "unFinished"}
                        </li>
                ))}
            </ul>
        </div>
    );

}

export default TaskManager;
