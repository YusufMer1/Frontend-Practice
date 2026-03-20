let applications = [];

applications = JSON.parse(localStorage.getItem("applications")) || [];

const form = document.getElementById("internForm");
const list = document.getElementById("list");

renderApplications();
form.addEventListener("submit", function(e) {
    e.preventDefault(); 

    
    const company = form.querySelector('input[placeholder="Şirket adı"]').value;
    const position = form.querySelector('input[placeholder="Pozisyon"]').value;
    const date = form.querySelector('input[type="date"]').value;
    const status = form.querySelector('select').value;

    
    const newApp = {
        id: Date.now(),
        company: company,
        position: position,
        date: date,
        status: status
    };

    
    applications.push(newApp);

    localStorage.setItem("applications", JSON.stringify(applications)); 

    renderApplications();

    
    form.reset();
});


function renderApplications() {
    list.innerHTML = ""; // listeyi temizle

    applications.forEach(app => {
        const card = document.createElement("div");
        card.classList.add("app-card");

        //status rengi
        if(app.status === "Kabul") {
            card.classList.add("status-accepted");
        } else if(app.status === "Red") {
            card.classList.add("status-rejected");
        } else if(app.status === "Görüşme") {
            card.classList.add("status-interview");
        }
        
        card.innerHTML = `
            <span>${app.company}</span>
            <span>${app.position}</span>
            <span>${app.date}</span>
            <span>${app.status}</span>
            <button class="btn-delete" onclick="deleteApplication(${app.id})"><i class="fa-solid fa-trash"></i></button>
        `;

        list.appendChild(card);
    });

    updateDashboard(); 
}

function deleteApplication(id) {
    applications = applications.filter(app => app.id !== id);

    localStorage.setItem("applications", JSON.stringify(applications));

    renderApplications();
}



function updateDashboard() {
    const total = applications.length;
    const accepted = applications.filter(a => a.status === "Kabul").length;
    const rejected = applications.filter(a => a.status === "Red").length;

    document.querySelector('.dashboard .card:nth-child(1)').textContent = `Toplam: ${total}`;
    document.querySelector('.dashboard .card:nth-child(2)').textContent = `Kabul: ${accepted}`;
    document.querySelector('.dashboard .card:nth-child(3)').textContent = `Red: ${rejected}`;
}
