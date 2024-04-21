let todoContainer = document.getElementById("todoItemsContainer");

function save(){
    localStorage.setItem("todoList",JSON.stringify(toDoList));
}

function getTodoListFromStorage(){
    let stringifiedTodoList=localStorage.getItem("todoList");
    let parseTodoList=JSON.parse(stringifiedTodoList);
    if(parseTodoList===null){
        return [];
    }else{
        return parseTodoList;
    }
}

let toDoList=getTodoListFromStorage();
for( let todo of toDoList){
    createTodo(todo);
}

function createTodo(todo){
    let labelId="label"+todo.uniqueId;
    let checkBoxId="checkbox"+todo.uniqueId;
    let todoId="todo"+todo.uniqueId;

    let addList=document.createElement('li');
    addList.classList.add("todo-item-container","d-flex","flex-row");
    addList.id=todoId;
    todoContainer.appendChild(addList);

    let inputElement=document.createElement('input');
    inputElement.type="checkbox";
    inputElement.id=checkBoxId;
    inputElement.checked=todo.isChecked;
    inputElement.classList.add("checkbox-input");
    addList.appendChild(inputElement);
    inputElement.onclick = function(){
        toDoStatusChange(checkBoxId,labelId,todoId);
    };

    let labelContainer=document.createElement('div');
    labelContainer.classList.add("d-flex","flex-row","label-container");
    addList.appendChild(labelContainer);

    let labelElement=document.createElement('label');
    labelElement.setAttribute("for","checkboxInput");
    labelElement.classList.add("checkbox-label");
    labelElement.id=labelId;
    labelElement.textContent=todo.text;
    if(todo.isChecked===true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);
    


    let deleteIconContainer=document.createElement('div');
    deleteIconContainer.classList.add("delete-icon-container");
    let deleteIcon=document.createElement('i');
    deleteIcon.classList.add("far","fa-trash-alt","delete-icon");
    deleteIcon.onclick = function(){
        deleteTodo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);
    labelContainer.appendChild(deleteIconContainer);
}

function toDoStatusChange(checkBoxId,labelId,todoId){
    let checkBoxElement = document.getElementById(checkBoxId);
    let labelElement=document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let todoIdx=toDoList.findIndex(function(eachItem){
        let itemIdx="todo"+eachItem.uniqueId;
        if(todoId===itemIdx){
            return true;
        }else{
            false;
        }
    });
    let todoObject=toDoList[todoIdx];
    if(todoObject.isChecked===true){
        todoObject.isChecked=false;
    }else{
        todoObject.isChecked=true;
    }
}

function deleteTodo(todoId){
    let todoElement=document.getElementById(todoId);
    todoContainer.removeChild(todoElement);
    let deleteElementIndex=toDoList.findIndex(function(eachItem){
        let elementId="todo"+eachItem.id;
        if(todoId===elementId){
            return true;
        }else{
            return false;
        }
    });
    toDoList.splice(deleteElementIndex,1);
}

function addTodo(){
    let userInput=document.getElementById("todoUserInput").value;
    if(userInput===""){
        alert("Enter valid input:");
    }else{
        let todoId=toDoList.length+1;
    let todo={
        text: userInput,
        uniqueId: todoId,
        isChecked: false
    };
    toDoList.push(todo);
    createTodo(todo);
    document.getElementById("todoUserInput").value="";
    }
    
}

