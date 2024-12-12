window.onload = function() {
    displayGreeting();
    updateOnAirStatus();
};

function displayGreeting() {
    const greetingMessage = document.getElementById('greeting-message');
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 0 && hour < 12) {
        greetingMessage.textContent = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        greetingMessage.textContent = "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
        greetingMessage.textContent = "Good Evening";
    } else {
        greetingMessage.textContent = "Good Night"; // Default greeting for hours 9 PM - Midnight
    }
}

function searchWebsite() {
    const searchBar = document.getElementById('search-bar');
    const query = searchBar.value.toLowerCase();
    const content = document.body.innerText.toLowerCase();

    if (query === "") {
        searchBar.placeholder = "Please enter a search term";
        return;
    }

    if (content.includes(query)) {
        alert(`Results found for: ${query}`);
        // Here you can implement a more detailed search results feature if needed
    } else {
        searchBar.value = "";
        searchBar.placeholder = "No results found";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    // Common USA holidays
    const holidays = [
        { month: 0, day: 1, name: "New Year's Day" },
        { month: 6, day: 4, name: "Independence Day" },
        { month: 11, day: 25, name: "Christmas Day" },
        // Add more holidays as needed
    ];

    // Regular events
    const events = [
        { name: "Minecraft Mondays", day: 1, start: "7:00 PM", end: "9:00 PM" },  // Every Monday
        { name: "Fortnite For a Night", day: 3, start: "7:00 PM", end: "9:00 PM" }, // Every Wednesday
        { name: "Weekly Upload", day: 5, start: "8:00 AM", end: "9:00 AM" }, // Every Friday
    ];

    function loadCalendar(year, month) {
        calendarEl.innerHTML = '';
        const header = document.createElement('header');
        header.innerHTML = `
            <button id="prev-month">&lt;</button>
            <h2>${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}</h2>
            <button id="next-month">&gt;</button>
        `;
        calendarEl.appendChild(header);

        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        calendarEl.appendChild(table);

        const tbody = table.querySelector('tbody');
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let date = 1;

        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    cell.innerHTML = '';
                } else if (date > daysInMonth) {
                    break;
                } else {
                    cell.innerHTML = date;

                    // Highlight today
                    if (date === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
                        cell.classList.add('today');
                    }

                    // Highlight holidays
                    holidays.forEach(holiday => {
                        if (holiday.month === month && holiday.day === date) {
                            const holidayLabel = document.createElement('div');
                            holidayLabel.innerHTML = holiday.name;
                            holidayLabel.style.color = '#d4842b';
                            cell.appendChild(holidayLabel);
                        }
                    });

                    // Highlight regular events
                    events.forEach(event => {
                        const eventDate = new Date(year, month, date).getDay();
                        if (event.day === eventDate) {
                            const eventLabel = document.createElement('div');
                            eventLabel.innerHTML = `${event.name} (${event.start} - ${event.end})`;
                            eventLabel.style.color = date === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth() ? '#02A4D3' : '#54bc7a';
                            cell.appendChild(eventLabel);
                        }
                    });

                    date++;
                }
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }

        document.getElementById('prev-month').addEventListener('click', () => {
            if (currentMonth === 0) {
                currentMonth = 11;
                currentYear--;
            } else {
                currentMonth--;
            }
            loadCalendar(currentYear, currentMonth);
        });

        document.getElementById('next-month').addEventListener('click', () => {
            if (currentMonth === 11) {
                currentMonth = 0;
                currentYear++;
            } else {
                currentMonth++;
            }
            loadCalendar(currentYear, currentMonth);
        });
    }

    loadCalendar(currentYear, currentMonth);
});

// Function to update "On Air" button background
function updateOnAirStatus() {
    const onAirButton = document.getElementById('on-air');
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    // Check if current time is within the specified times
    if (
        (day === 1 && hour >= 19 && hour < 21) ||  // Monday 7 PM - 9 PM
        (day === 3 && hour >= 19 && hour < 21) ||  // Wednesday 7 PM - 9 PM
        (day === 5 && hour >= 8 && hour < 9)       // Friday 8 AM - 9 AM
    ) {
        onAirButton.style.backgroundColor = '#FF0000';  // Red background
    } else {
        onAirButton.style.backgroundColor = 'transparent';  // Clear background
    }
}

// Update "On Air" status immediately and every minute
updateOnAirStatus();
setInterval(updateOnAirStatus, 60000);
