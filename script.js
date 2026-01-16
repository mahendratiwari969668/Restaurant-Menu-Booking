function bookNow() {
    // 1️⃣ Mapping dish numbers → dish names
    const dishNames = {
        1: "Cheeseburger",
        2: "Cheese Sandwich",
        3: "Chicken Burger",
        4: "Spicy Chicken",
        5: "Hot Dog",
        6: "Fruit Salad",
        7: "Cocktails",
        8: "Nuggets",
        9: "Sandwich",
        10: "French Fries",
        11: "Milk Shake",
        12: "Iced Tea",
        13: "Orange Juice",
        14: "Lemon Tea",
        15: "Coffee"
    };

    // 2️⃣ Get user inputs
    const nameInput = document.getElementById("customerName");
    const seatsInput = document.getElementById("inputbox2");
    const checkboxes = document.querySelectorAll(".check");

    const name = nameInput.value.trim();
    const seats = seatsInput.value.trim();

    // 3️⃣ Get selected dish names
    let selectedDishes = [];
    checkboxes.forEach(cb => {
        if (cb.checked) {
            const id = cb.id; // like "1", "2", etc.
            selectedDishes.push(dishNames[id]);
        }
    });

    // 4️⃣ Validate input
    if (name === "") {
        alert("Please enter your name!");
        return;
    }
    if (seats === "" || seats <= 0) {
        alert("Please enter a valid number of seats!");
        return;
    }
    if (selectedDishes.length === 0) {
        alert("Please select at least one dish!");
        return;
    }

    // 5️⃣ Create booking object
    const booking = {
        name: name,
        seats: seats,
        dishes: selectedDishes
    };

    // 6️⃣ Save booking data to localStorage
    localStorage.setItem("bookingData", JSON.stringify(booking));

    // 7️⃣ Show booking details on the page
    showBookingDetails(booking);

    // 8️⃣ Clear inputs for next entry
    nameInput.value = "";
    seatsInput.value = "";
    checkboxes.forEach(cb => cb.checked = false);

    alert("✅ Booking successful! Details saved locally.");
}

// 🔁 Helper function to show booking info in footer
function showBookingDetails(booking) {
    document.querySelector("footer #customerName").textContent = "Name: " + booking.name;
    document.querySelector("footer #numberOfSeats").textContent = "No. of Seats: " + booking.seats;
    document.querySelector("footer #selectedDishes").textContent =
        "Selected Dishes: " + booking.dishes.join(", ");
}

// 🚀 On page load — check if saved data exists and show it
window.onload = function () {
    const savedData = localStorage.getItem("bookingData");
    if (savedData) {
        const booking = JSON.parse(savedData);
        showBookingDetails(booking);
    }
};
