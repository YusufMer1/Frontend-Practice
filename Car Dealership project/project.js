const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");

const ui = new UI();
const storage = new Storage();

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addCar);

    document.addEventListener("DOMContentLoaded",function(){
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);
    });
    
    cardbody.addEventListener("click",deleteCar);

    clear.addEventListener("click",clearAllCar);
}

function clearAllCar(){
    if(confirm("are you sure that remove all cars")){
        ui.clearAllCarsFromUI();
        storage.clearAllCarsFromStorage();
    }
    
}

function deleteCar(e){
    
    if(e.target.id === "delete-car"){
        ui.deleteCarFromUI(e.target);

        const name = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        
        storage.deleteCarFromStorage(name);

        ui.displayMessage("The deleting operation is successfull","success")
    }
}

function addCar(e){
    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;

    if(title === "" || price === "" || url === ""){
        ui.displayMessage("Tüm alanları doldurunuz","danger");
    }
    else{
        let newCar = new Car(title,price,url);

        ui.addCarToUI(newCar);

        storage.addCarToStorage(newCar);

        ui.displayMessage("Araç başarıyla eklendi","success")
    }
    e.preventDefault();

    ui.clearInputs(titleElement,priceElement,url);
}
