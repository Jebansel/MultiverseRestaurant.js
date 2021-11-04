/**
 * Delete a restaurant
 *
 */
async function deleteRestaurant(id) {
    const response = await fetch(`http://localhost:3002/api/restaurants/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        window.location.reload();
    }
}
/**
 * Updates a restaurant via a put request
 *
 */
async function updateRestaurant(event) {
    event.preventDefault(); // prevent the form from submitting
    const form = event.target;
    const data = {
        id: form.restaurantId.value,
        name: form.name.value,
        imagelink: form.imagelink.value,
    };
    const response = await fetch(`http://localhost:3002/api/restaurants/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );
    if (response.ok) {
        window.location = '/restaurants';
    }

}

// // Updates a restaurants menu
// async function updateRestaurantMenu(event) {
//     event.preventDefault(); // prevent the form from submitting
//     const form = event.target;
//     const data = {
//         id: form.menuId.value,
//         name: form.name.value,
//     };
//     const response = await fetch(`http://localhost:3002/api/restaurants/${data.id}`, {
//         method: 'PUT',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     }
//     );
//     if (response.ok) {
//         window.location = '/restaurants';
//     }

// }