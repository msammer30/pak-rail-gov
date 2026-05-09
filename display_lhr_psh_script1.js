import { runCycleCoordinator } from './cycle_coordinator.js';
document.addEventListener('DOMContentLoaded', () => {
    const departuresTableBody = document.getElementById('lhr-psh-departures-body');
    const arrivalsTableBody = document.getElementById('psh-lhr-arrivals-body');
    const LOCAL_STORAGE_KEY = 'trainAppSchedules';

    const renderSchedules = () => {
        const allSchedules = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
        
        const departuresData = allSchedules.lhr_psh_departure || [];
        const arrivalsData = allSchedules.psh_lhr_arrival || [];

        populateTable(departuresTableBody, departuresData, 'lhr_psh_departure');
        populateTable(arrivalsTableBody, arrivalsData, 'psh_lhr_arrival');
    };

    const populateTable = (tableBody, dataArray, routeKey) => {
        tableBody.innerHTML = ''; // Clear existing rows

        if (dataArray.length === 0) {
            const row = tableBody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 6; // Adjusted colspan
            cell.textContent = 'No schedule data available.';
            cell.style.textAlign = 'center';
            return;
        }

        dataArray.forEach((item, index) => {
            const row = tableBody.insertRow();
            if (item.status) {
                row.classList.add(`status-${item.status.toLowerCase().replace(/ /g, '-')}-row`);
            }
            row.insertCell().textContent = item.trainNo;

            const trainNameCell = row.insertCell();
            trainNameCell.textContent = item.trainName;
            trainNameCell.classList.add('animated-train-name');
            
            row.insertCell().textContent = item.scheduledTime;
            row.insertCell().textContent = item.expectedTime;
            
            const statusCell = row.insertCell();
            statusCell.textContent = item.status;
            statusCell.classList.add('animated-status');
            
            row.insertCell().textContent = item.platformNo;
            
            if (item.status === 'Arrived' || item.status === 'Departed' || item.status === 'Cancelled') {
                row.classList.add('status-highlight');
            }

            // Removed Actions Cell and Buttons
        });
    };

    // editItemPrompt function removed
    // removeItem function removed

    renderSchedules();
    window.addEventListener('storage', (event) => {
        if (event.key === LOCAL_STORAGE_KEY) {
            renderSchedules();
        }
    });

    // Automatic Page Cycling
    runCycleCoordinator(window.location.pathname.split('/').pop());

    // --- Date/Time Display Logic ---
    const dateTimeElement = document.getElementById('current-datetime');

    function updateDateTimeDisplay() {
        if (dateTimeElement) {
            const now = new Date();
            const options = { 
                weekday: 'short', year: 'numeric', month: 'short', 
                day: 'numeric', hour: '2-digit', minute: '2-digit', 
                second: '2-digit', hour12: true 
            };
            dateTimeElement.textContent = now.toLocaleString('en-US', options);
        }
    }

    if (dateTimeElement) {
        updateDateTimeDisplay(); // Initial call
        setInterval(updateDateTimeDisplay, 1000); // Update every second
    }
    // --- End Date/Time Display Logic ---
});
