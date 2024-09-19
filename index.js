class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = [];
    }

    getAllActivities() {
        return this.activities;
    }

    // Crea una nueva actividad y la añade al arreglo
    createActivity(title, description, imgUrl) {
        const id = this.activities.length + 1;
        const newActivity = new Activity(id, title, description, imgUrl);
        this.activities.push(newActivity);
    }

    // Elimina una actividad por id
    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
    }
}

const repo = new Repository();

function agregarActividad(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="actividadesFavs"]').value.trim();
    const imgUrl = document.querySelector('input[name="Imagen"]').value.trim();
    const description = document.querySelector('input[name="descripcion"]').value.trim();

    // Verificar que los campos no estén vacíos
    if (title && imgUrl && description) {
        repo.createActivity(title, description, imgUrl);
        mostrarActividades();
        limpiarFormulario();
    } else {
        alert('faltan datos');
    }
}

// Función para mostrar las actividades creadas en la página
function mostrarActividades() {
    const actividadesContainer = document.querySelector('.actividadesContainer'); // Corregido
    actividadesContainer.innerHTML = '';

    const actividades = repo.getAllActivities();

    actividades.forEach(act => {
        const actividadDiv = document.createElement('div');
        actividadDiv.classList.add("actividad");
        actividadDiv.innerHTML = `
            <h4>${act.title}</h4>
            <p>${act.description}</p>
            <img src="${act.imgUrl}" alt="${act.title}" class="actividadImg">
            <button class="deleteBtn" data-id="${act.id}">Eliminar</button> <!-- Añadido -->
        `;
        actividadesContainer.appendChild(actividadDiv);
    });
    
    // Añadir event listeners a los botones de eliminar
    document.querySelectorAll('.deleteBtn').forEach(btn => {
        btn.addEventListener('click', eliminarActividad);
    });
}

function eliminarActividad(event) {
    const id = parseInt(event.target.getAttribute('data-id'));
    repo.deleteActivity(id);
    mostrarActividades();
}

// Función para borrar los campos del formulario
function limpiarFormulario() {
    document.querySelector('input[name="actividadesFavs"]').value = '';
    document.querySelector('input[name="Imagen"]').value = '';
    document.querySelector('input[name="descripcion"]').value = ''; // Corregido
}

// Evento para escuchar el submit en el formulario
document.querySelector('.actividades').addEventListener('submit', agregarActividad);
