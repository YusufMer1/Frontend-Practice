const form = document.querySelector("form");
const input = document.querySelector("#taskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const tasklist = document.querySelector("#task-list");
const items = ["Todo 1", "Todo 2", "Todo 3", "Todo 4"]

loadItems();


function loadItems(){
    items.forEach(function(item){
        createItem(item);
    })
}

function createItem(text){
    const li = document.createElement("li")
    li.className = "list-group-item list-group-item-secondary"
    li.appendChild(document.createTextNode(text));

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
    
    createItem(input.value);
    input.value = "";

    e.preventDefault();
}

function deleteItem(e){
    if(e.target.className === "fas fa-times"){
        if(confirm("silmek istediğinize emin misiniz")){
            e.target.parentElement.parentElement.remove();
        }
    }
    
    e.preventDefault();
}

function deleteAllItems(e){
    if(confirm("tüm elemanları silmek istediğinize emin misiniz")){
        tasklist.childNodes.forEach(function(ıtem){
            if(ıtem.nodeType === 1){
                ıtem.remove();
            }
        });
    }
}
