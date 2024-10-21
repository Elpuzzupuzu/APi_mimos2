document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const user_name = document.getElementById('user_name').value; // Capturar el nombre de usuario
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/users/login', {  // Ajusta la URL a la de tu servidor
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_name: user_name, password: password }) // Enviar user_name y password
        });

        const data = await response.json();

        if (response.ok) {
            // Guardar el token y el id_user en localStorage
            localStorage.setItem('accessToken', data.accessToken); // Guardar el token
            localStorage.setItem('id_user', data.id_user); // Guardar el id_user

            // Crear el objeto userCart
            const userCart = {
                id_cart: data.id_user,  // Asegúrate de que este sea el ID del carrito que quieres guardar
                id_user: data.id_user  // O el ID del usuario, según tu lógica
            };

            // Guardar el objeto userCart en localStorage
            localStorage.setItem('userCart', JSON.stringify(userCart));

            // Redirigir a la página principal (index.html)
            window.location.href = './index.html';
        } else {
            // Mostrar el mensaje de error en la interfaz
            alert(data.message || 'Error en las credenciales');
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        alert('Ocurrió un problema en el servidor. Intenta de nuevo más tarde.');
    }
});
