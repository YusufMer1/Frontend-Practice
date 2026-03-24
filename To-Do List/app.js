const form = document.querySelector("form");
const input = document.querySelector("#taskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const tasklist = document.querySelector("#task-list");
let todos;

loadItems();


function loadItems(){
    todos = getItemsFromLS();
    todos.forEach(function(item){
        createItem(item);
    })
}

function getItemsFromLS(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function setItemToLS(newtodo){
    todos = getItemsFromLS();
    todos.push(newtodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function createItem(newtodo){
    const li = document.createElement("li")
    li.className = "list-group-item list-group-item-secondary"
    li.appendChild(document.createTextNode(newtodo));

    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href","#");
    a.innerHTML =  '<i class="fas fa-times"></i>';
    li.appendChild(a);

    tasklist.appendChild(li);
}

eventListeners();

function eventListeners(){
    //submit
    form.addEventListener("submit",addNewItem)
    //delete
    tasklist.addEventListener("click",deleteItem);
    //delete all
    btnDeleteAll.addEventListener("click",deleteAllItems);
}

function addNewItem(e){
    if(input.value === ''){
        alert("add new ıtem");
        console.log("submit");
    }
    else{
        createItem(input.value);
        setItemToLS(input.value);
        input.value = "";
    }
    

    e.preventDefault();
}



function deleteItem(e){
    if(e.target.className === "fas fa-times"){
        if(confirm("silmek istediğinize emin misiniz")){
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        }
    }
    
    e.preventDefault();
}

function deleteTodoFromStorage(deletetodo){
    let todos = getItemsFromLS();
    todos.forEach(function(todo,index) {
        if(todo === (deletetodo)){
            todos.splice(index,1);
        }
    });  
    localStorage.setItem("todos",JSON.stringify(todos));
}

function deleteAllItems(e){
    if(confirm("tüm elemanları silmek istediğinize emin misiniz")){
        while(tasklist.firstChild){
            tasklist.removeChild(tasklist.firstChild);
        }   
        localStorage.clear();
    }
}
