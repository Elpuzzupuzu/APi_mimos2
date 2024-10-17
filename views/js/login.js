// Función para manejar el login
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const result = await response.json();

            // Obtener datos del resultado
            const userId = result.id;
            const username = result.username;

            // Asignar a variables locales (opcional)
            let userInfo = {
                userId: userId,
                username: username
            };

            ///comenzamos pruebas
            
            

            // Almacenar en localStorage
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            // Verificar si ya existe la información del carrito en localStorage
            if (!localStorage.getItem('userCart')) {
                // Llamar a la función para obtener y guardar el ID del carrito
                await handleCartId(userId);
            }

            // Redirigir al usuario a la página principal      INGRESAR A LA TIENDA
            window.location.href = 'index.html';
        } else {
            alert('Credenciales incorrectas, por favor intenta de nuevo.');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un problema con el servidor. Por favor, intenta más tarde.');
    }
});

// Función para obtener y guardar el ID del carrito
async function handleCartId(userId) {
    try {
        // Fetch para obtener solo el ID del carrito del usuario
        const response = await fetch(`http://localhost:8080/cart/${userId}/cartId`);
        if (!response.ok) {
            throw new Error('Error al obtener el ID del carrito');
        }

        const cartId = await response.json();
        console.log('ID del carrito obtenido exitosamente:', cartId);

        // Guardar userId y cartId en localStorage
        localStorage.setItem('userCart', JSON.stringify({ userId: userId, cartId: cartId }));

    } catch (error) {
        console.error('Error al obtener o guardar el ID del carrito:', error);
        alert('Hubo un problema al obtener o guardar el ID del carrito. Por favor, intenta más tarde.');
    }
}
