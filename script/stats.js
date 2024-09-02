let apiUrl = `https://aulamindhub.github.io/amazing-api/events.json`;

let tableContainer = document.getElementById("tableContainer");
let events = [];
let currentDate = '';

function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            events = data.events;
            currentDate = data.currentDate;
            console.log(currentDate);
            createTable(events);
        })
        .catch(error => console.error("Error al obtener los datos:", error)
        );
}

// Funcion para estadisticas del eventos destacados
function featuredEvent(events) {
    if (events.length === 0)
        return {};

    const eventHighestAssistance = events.reduce((max, event) => {
        const percentage = (event.assistance * 100) / event.capacity;
        return percentage > max.percentage ? { event, percentage } : max;
    }, { event: null, percentage: -Infinity });

    const eventLowestAssistance = events.reduce((min, event) => {
        const percentage = (event.assistance * 100) / event.capacity;
        return percentage < min.percentage ? { event, percentage } : min;
    }, { event: null, percentage: Infinity });

    const eventlargestCapacity = events.reduce((max, event) => {
        return event.capacity > max.capacity ? event : max;
    }, { capacity: -Infinity });

    return {
        highest: eventHighestAssistance,
        lowest: eventLowestAssistance,
        largestCapacity: eventlargestCapacity
    }
}

function statisticsByCategory(events) {
    const now = new Date(currentDate);

    const categories = [...new Set(events.map(event => event.category))];

    const upcomingEvents = events.filter(event => new Date(event.date) > now);
    const pastEvents = events.filter(event => new Date(event.date) <= now);

    const calculateCategoryStats = (events) => {
        return categories.map(category => {
            const categoryEvents = events.filter(event => event.category === category);
            
            if (categoryEvents.length === 0) {
                return null;
            }

            const totalRevenue = categoryEvents.reduce((total, event) => total + (event.price * (event.assistance || event.estimate)), 0);
            const averageAssistance = categoryEvents.reduce((total, event) => total + ((event.assistance || event.estimate) * 100) / event.capacity, 0) / categoryEvents.length;

            return {
                category,
                revenue: totalRevenue,
                averageAssistance: averageAssistance
            };
        }).filter(stat => stat !== null).sort((a, b) => b.revenue - a.revenue);
    };

    return {
        upcoming: calculateCategoryStats(upcomingEvents),
        past: calculateCategoryStats(pastEvents)
    };
}


function createTable(events) {
    tableContainer.innerHTML = '';

    const { highest, lowest, largestCapacity } = featuredEvent(events);
    const { upcoming, past } = statisticsByCategory(events);

    const table = document.createElement("table");
    table.className = "table my-3 col-10";
    table.innerHTML = `
        <thead class="border corder-3 border">
            <tr>
                <th colspan="3" class="text-light bg-success text-light py-3 fs-4">Event Statistics</th>
            </tr>
            <tr>
                <td class="bg-success-subtle py-3 fw-bold">Event with highest % of assistance</td>
                <td class="bg-success-subtle py-3 fw-bold">Event with lowest % of assistance</td>
                <td class="bg-success-subtle py-3 fw-bold">Event with largest capacity</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="ps-4">${highest ? `${highest.event.name}: ${highest.percentage.toFixed(2)}%` : 'N/A'}</td>
                <td class="ps-4">${lowest ? `${lowest.event.name}: ${lowest.percentage.toFixed(2)}%` : 'N/A'}</td>
                <td class="ps-4">${largestCapacity ? `${largestCapacity.name}: ${largestCapacity.capacity} Persons` : 'N/A'}</td>
            </tr>
        </tbody>
        <thead>
            <tr>
                <th colspan="3" class="text-light bg-success text-light py-3 fs-4">Upcoming Events Statistics by Category</th>
            </tr>
            <tr>
                <td class="bg-success-subtle py-3 fw-bold">Category</td>
                <td class="bg-success-subtle py-3 fw-bold">Revenue</td>
                <td class="bg-success-subtle py-3 fw-bold">Percentage of Assistance</td>
            </tr>
        </thead>
        <tbody>
            ${upcoming.map(stat => `
                <tr>
                    <td class="ps-4">${stat.category}</td>
                    <td class="ps-4">$ ${stat.revenue.toFixed(2)}</td>
                    <td class="ps-4">${stat.averageAssistance.toFixed(2)} %</td>
                </tr>
            `).join('')}
        </tbody>
        <thead>
            <tr>
                <th colspan="3" class="thead bg-success text-light py-3 fs-4">Past Events Statistics by Category</th>
            </tr>
            <tr>
                <td class="bg-success-subtle py-3 fw-bold">Category</td>
                <td class="bg-success-subtle py-3 fw-bold">Revenue</td>
                <td class="bg-success-subtle py-3 fw-bold">Percentage of Assistance</td>
            </tr>
        </thead>
        <tbody>
            ${past.map(stat => `
                <tr>
                    <td class="ps-4">${stat.category}</td>
                    <td class="ps-4">$ ${stat.revenue.toFixed(2)}</td>
                    <td class="ps-4">${stat.averageAssistance.toFixed(2)} %</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    tableContainer.appendChild(table);
};


document.addEventListener("DOMContentLoaded", fetchData);