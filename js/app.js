// -----------Variables-----------
const sendBtn = document.querySelector("#enviar");
const resetBtn = document.querySelector("#resetBtn");
const form = document.querySelector("#enviar-mail");
// Campos.
const email = document.querySelector("#email");
const subject = document.querySelector("#asunto");
const message = document.querySelector("#mensaje");
// Expresiones regulares.
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;





// -----------Event Listeners-----------
eventListeners();
function eventListeners(){
    // Cuando la app se cargue.
    document.addEventListener("DOMContentLoaded", startApp);

    // Campos del formulario.
    email.addEventListener("blur", validateForm);
    subject.addEventListener("blur", validateForm);
    message.addEventListener("blur", validateForm);

    // Resetear formulario.
    resetBtn.addEventListener("click", formReset);

    // Enviar email.
    form.addEventListener("submit", sendEmail);
}





// -----------Funciones-----------
function startApp(){
    sendBtn.disabled = true;                                    // Desabilitar botón.
    sendBtn.classList.add("cursor-not-allowed", "opacity-50");  // Cambios visibles como deshabilitado.

    // Resetear clases de los elementos.
    email.classList.remove("border", "border-red-500", "border-green-500");
    subject.classList.remove("border", "border-red-500", "border-green-500");
    message.classList.remove("border", "border-red-500", "border-green-500");
}

// Validar el formulario.
function validateForm(e){
    // Si el campo de formulario tiene un tamaño mayor a cero.
    if(e.target.value.length > 0){
        // Eliminar los mensaes de error.
        const currentError = document.querySelector("p.error");
        if(currentError){
            currentError.remove();
        }
        
        // Eliminar y poner clases de estilo visual.
        e.target.classList.remove("border", "border-red-500");
        e.target.classList.add("border", "border-green-500");
    }
    else{
        // Eliminar y poner clases de estilo visual.
        e.target.classList.remove("border", "border-green-500");
        e.target.classList.add("border", "border-red-500");

        // Mostrar error.
        showError("Todos los campos son obligatorios");
    }

    // Si el tipo del campo seleccionado es del tipo "email".
    if(e.target.type === "email"){
        // Si sí cumple con el formato de un email.
        if( er.test(e.target.value) ){
            // Eliminar los errores.
            const currentError = document.querySelector("p.error");
            if(currentError){
                currentError.remove();
            }

            // Eliminar y poner clases de estilo visual.
            e.target.classList.remove("border", "border-red-500");
            e.target.classList.add("border", "border-green-500");
        }
        else{
            // Eliminar y poner clases de estilo visual.
            e.target.classList.remove("border", "border-green-500");
            e.target.classList.add("border", "border-red-500");

            // Mostrar error.
            showError("Email no válido");
        }
    }

    // Si los 3 campos del formulario han sido completados de manera adecuada..
    if(er.test(email.value) && subject.value !== "" && message.value !== ""){
        sendBtn.disabled = false;                                       // Habilitar botón.
        sendBtn.classList.remove("cursor-not-allowed", "opacity-50");   // Cambios visibles como habilitado.
    }
    else{
        sendBtn.disabled = true;                                        // Desabilitar botón.
        sendBtn.classList.add("cursor-not-allowed", "opacity-50");      // Cambios visibles como deshabilitado.
    }
}

// Mostrar error.
function showError(textMessage){
    // Crear mensaje de error en HTML.
    const errorMessage = document.createElement("p");
    errorMessage.textContent = textMessage;
    errorMessage.classList.add("border", "border-red-500", "background-red-100", "text-red-500", "p-3", "mt-5", "text-center", "error");
    
    // Buscar mensajes de error existentes.
    const errors = document.querySelectorAll(".error");

    // Agregar mensaje de error si no hay.
    if(errors.length === 0){
        form.appendChild(errorMessage);
    }
}

// Enviar el email.
function sendEmail(e){
    // Quitar acciones predeterminadas.
    e.preventDefault();

    // Mostrar spinner.
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";

    // Después de 3 segundos ocultar el spinner y mostrar el mensaje.
    setTimeout( () => {
        // Desaparecer.
        spinner.style.display = "none";

        // Mensaje de éxito.
        const textMessage = document.createElement("p");
        textMessage.textContent = "Mensaje enviado de manera exitosa";
        textMessage.classList.add("bg-green-500", "text-white", "p-2", "my-10", "text-center", "font-bold", "uppercase");

        // Insertar el mensaje antes del spinner.
        form.insertBefore(textMessage, spinner);
        
        // Timer.
        setTimeout( () => {
            textMessage.remove();   // Eliminar mensaje de éxito.
            formReset();            // Restear formulario.
        }, 3000);
    }, 3000);
}

// Resetear el formulario.
function formReset(){
    form.reset();   // Resetear formulario.
    startApp();     // Valores de inicio.
}