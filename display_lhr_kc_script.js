import { getSchedules } from './supabase.js';
import { runCycleCoordinator } from './cycle_coordinator.js';

document.addEventListener('DOMContentLoaded', async () => {
    const departuresTableBody = document.getElementById('lhr-kc-departures-body');
    const arrivalsTableBody = document.getElementById('kc-lhr-arrivals-body');

    const renderSchedules = async () => {
        // Fetch schedules from Supabase
        const lhrKcResult = await getSchedules('lhr_kc_departure');
        const kcLhrResult = await getSchedules('kc_lhr_arrival');
        
        const lhrKcDepartures = lhrKcResult.success ? lhrKcResult.data : [];
        const kcLhrArrivals = kcLhrResult.success ? kcLhrResult.data : [];

        populateTable(departuresTableBody, lhrKcDepartures, 'lhr_kc_departure');
        populateTable(arrivalsTableBody, kcLhrArrivals, 'kc_lhr_arrival');
    };

    const populateTable = (tableBody, dataArray, routeKey) => {
        tableBody.innerHTML = ''; // Clear existing rows

        if (dataArray.length === 0) {
            const row = tableBody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 6; // Adjusted colspan as Actions column is removed
            cell.textContent = 'No schedule data available.';
            cell.style.textAlign = 'center';
            return;
        }

        dataArray.forEach((item) => {
            const row = tableBody.insertRow();
             if (item.status) {
                row.classList.add(`status-${item.status.toLowerCase().replace(/ /g, '-')}-row`);
            }
            row.insertCell().textContent = item.train_number;
            
            const trainNameCell = row.insertCell();
            trainNameCell.textContent = item.train_name;
            trainNameCell.classList.add('animated-train-name');
            
            row.insertCell().textContent = item.schedule_time;
            row.insertCell().textContent = item.expected_time;
            
            const statusCell = row.insertCell();
            statusCell.textContent = item.status;
            statusCell.classList.add('animated-status'); // This class will be combined with .departures-theme or .arrivals-theme by CSS

            row.insertCell().textContent = item.platform;
            
            if (item.status === 'Arrived' || item.status === 'Departed' || item.status === 'Cancelled') {
                row.classList.add('status-highlight');
            }
        });
    };

    // Initial render
    await renderSchedules();
    
    // Refresh data every 30 seconds
    setInterval(async () => {
        await renderSchedules();
    }, 30000);

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
