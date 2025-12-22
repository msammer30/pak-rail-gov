// Data for Train Number, Name, and Scheduled Time dropdowns
// Data for Train Number, Name, and Scheduled Time dropdowns
import { supabase, getSchedules, addSchedule, updateSchedule, deleteSchedule, getGeneralMessage, upsertGeneralMessage } from './supabase.js';

// Config flag to determine whether to use Supabase or localStorage
const USE_SUPABASE = true; // Set to true to use Supabase, false to use localStorage
const lhrKcDepartureOptions = [
    { trainNo: "08 DN", trainName: "تیزگام ایکسپریس", scheduledTime: "13:35" }, { trainNo: "42 DN", trainName: " قراقرم ایکسپریس", scheduledTime: "15:00" },
    { trainNo: "34 DN", trainName: "پاک بزنس ایکسپریس", scheduledTime: "16:30" }, { trainNo: "16 DN", trainName: " کراچی ایکسپریس", scheduledTime: "18:00" },
    { trainNo: "06 DN", trainName: "گرین لائن ایکسپریس", scheduledTime: "20:40" }, { trainNo: "44 DN", trainName: " شاہ حسین ایکسپریس", scheduledTime: "21:00" }
];
const kcLhrArrivalOptions = [
    { trainNo: "41 UP", trainName: "قراقرم ایکسپریس", scheduledTime: "10:20" }, { trainNo: "33 UP", trainName: " پاک بزنس ایکسپریس", scheduledTime: "10:20" },
    { trainNo: "15 UP", trainName: " کراچی ایکسپریس", scheduledTime: "13:00" }, { trainNo: "07 UP", trainName: " تیزگام ایکسپریس", scheduledTime: "14:00" },
    { trainNo: "05_UP", trainName: "گرین لائن ایکسپریس", scheduledTime: "14:35" }, { trainNo: "43 UP", trainName: " شاہ حسین ایکسپریس", scheduledTime: "15:35" },
];
const lhrRwpDepartureOptions = [
    { trainNo: "105 UP", trainName: " راول ایکسپریس", scheduledTime: "00:30" }, { trainNo: "101UP", trainName: "سبک رفتار ایکسپریس", scheduledTime: "07:00" },
    { trainNo: "07 UP", trainName: "تیزگام ایکسپریس", scheduledTime: "13:35" }, { trainNo: "05 UP", trainName: " گرین لائن ایکسپریس", scheduledTime: "15:10" },
    { trainNo: "103 UP", trainName: "سبک خرام ایکسپریس", scheduledTime: "16:30" }, { trainNo: "107 UP", trainName: "اسلام آباد نان سٹاپ", scheduledTime: "18:00" },
];
const rwpLhrArrivalOptions = [
    { trainNo: "106 DN", trainName: " راول ایکسپریس", scheduledTime: "05:00" }, { trainNo: "102 DN", trainName: "سبک رفتار", scheduledTime: "11:50" },
    { trainNo: "08 DN", trainName: " تیزگام", scheduledTime: "13:15" }, { trainNo: "06 DN", trainName: " گرین لائن", scheduledTime: "20:10" },
    { trainNo: "104 DN", trainName: " سبک خرام", scheduledTime: "21:35" }, { trainNo: "108 DN", trainName: " اسلام آباد نان سٹاپ", scheduledTime: "22:30" }
];
const lhrQtaDepartureOptions = [{ trainNo: "40 DN", trainName: "جعفر ایکسپریس", scheduledTime: "16:45" }];
const qtaLhrArrivalOptions = [{ trainNo: "39 UP", trainName: "جعفر ایکسپریس", scheduledTime: "09:10" }];
const lhrMianwaliDepartureOptions = [
    { trainNo: "28 DN", trainName: " شالیمار ایکسپریس", scheduledTime: "07:10" }, { trainNo: "38 DN", trainName: "فرید ایکسپریس", scheduledTime: "06:00" },
    { trainNo: "02 DN", trainName: " خیبر میل", scheduledTime: "07:35" }, { trainNo: "10_DN", trainName: " علامہ اقبال ایکسپریس", scheduledTime: "12:40" },
    { trainNo: "14 DN", trainName: " عوام ایکسپریس", scheduledTime: "18:55" },
];
const mianwaliLhrArrivalOptions = [
    { trainNo: "27 UP", trainName: "شالیمار ایکسپریس", scheduledTime: "02:55" }, { trainNo: "13 UP", trainName: " عوام ایکسپریس", scheduledTime: "07:00" },
    { trainNo: "09 UP", trainName: "علامہ اقبال ایکسپریس", scheduledTime: "12:30" }, { trainNo: "37 UP", trainName: " فرید ایکسپریس", scheduledTime: "22:00" },
    { trainNo: "01 UP", trainName: " خیبر میل", scheduledTime: "19:30" }
];
const lhrNwlDepartureOptions = [
    { trainNo: "171_UP", trainName: "سیالکوٹ ایکسپریس", scheduledTime: "05:00" }, { trainNo: "211_UP", trainName: "نارووال پسنجر", scheduledTime: "07:25" },
    { trainNo: "09_UP", trainName: "علامہ اقبال ایکسپریس", scheduledTime: "12:20" }, { trainNo: "125_UP", trainName: "لاثانی ایکسپریس", scheduledTime: "15:45" },
    { trainNo: "209_UP", trainName: "فیض احمد فیض", scheduledTime: "19:30" }
];
const nwlLhrArrivalOptions = [
    { trainNo: "210_DN", trainName: "فیض احمد فیض", scheduledTime: "05:00" }, { trainNo: "126_DN", trainName: "لاثانی ایکسپریس", scheduledTime: "07:00" },
    { trainNo: "10_DN", trainName: "علامہ اقبال ایکسپریس", scheduledTime: "11:35" }, { trainNo: "212 DN", trainName: "نارووال پسنجر", scheduledTime: "17:00" },
    { trainNo: "172 DN", trainName: "سیالکوٹ ایکسپریس", scheduledTime: "21:50" }
];
const lhrFsldDepartureOptions = [
    { trainNo: "112 DN", trainName: "بدر ایکسپریس", scheduledTime: "09:30" }, { trainNo: "122 DN", trainName: "راوی ایکسپریس", scheduledTime: "02:15" },
    { trainNo: "114 DN", trainName: "غوری ایکسپریس", scheduledTime: "19:00" }, { trainNo: "148 DN", trainName: "ماڑی انڈس ایکسپریس", scheduledTime: "21:10" }
];
const fsldLhrArrivalOptions = [
    { trainNo: "111_UP", trainName: "بدر ایکسپریس", scheduledTime: "08:35" }, { trainNo: "121 DN", trainName: "راوی ایکسپریس", scheduledTime: "08:55" },
    { trainNo: "113_UP", trainName: "غوری ایکسپریس", scheduledTime: "19:30" }, { trainNo: "147 UP", trainName: "ماڑی انڈس ایکسپریس", scheduledTime: "05:30" }
];
const lhrPshDepartureOptions = [
    { trainNo: "13 UP", trainName: "عوام ایکسپریس", scheduledTime: "07:35" }, { trainNo: "39 UP", trainName: " جعفر ایکسپریس", scheduledTime: "09:45" },
    { trainNo: "01 UP", trainName: "خیبر میل", scheduledTime: "20:00" }
];
const pshLhrArrivalOptions = [
    { trainNo: "02 DN", trainName: "خیبر میل", scheduledTime: "07:15" }, { trainNo: "40 DN", trainName: "جعفر ایکسپریس", scheduledTime: "16:10" },
    { trainNo: "14 DN", trainName: " عوام ایکسپریس", scheduledTime: "18:20" }
];


const routeConfigs = {
    'lhr_kc_departure': { options: lhrKcDepartureOptions, prefix: 'lhr-kc-dep', formId: 'form-lhr-kc-dep' },
    'kc_lhr_arrival': { options: kcLhrArrivalOptions, prefix: 'kc-lhr-arr', formId: 'form-kc-lhr-arr' },
    'lhr_psh_departure': { options: lhrPshDepartureOptions, prefix: 'lhr-psh-dep', formId: 'form-lhr-psh-dep' },
    'psh_lhr_arrival': { options: pshLhrArrivalOptions, prefix: 'psh-lhr-arr', formId: 'form-psh-lhr-arr' },
    'lhr_fsld_departure': { options: lhrFsldDepartureOptions, prefix: 'lhr-fsld-dep', formId: 'form-lhr-fsld-dep' },
    'fsld_lhr_arrival': { options: fsldLhrArrivalOptions, prefix: 'fsld-lhr-arr', formId: 'form-fsld-lhr-arr' },
    'lhr_nwl_departure': { options: lhrNwlDepartureOptions, prefix: 'lhr-nwl-dep', formId: 'form-lhr-nwl-dep' },
    'nwl_lhr_arrival': { options: nwlLhrArrivalOptions, prefix: 'nwl-lhr-arr', formId: 'form-nwl-lhr-arr' },
    'lhr_rwp_departure': { options: lhrRwpDepartureOptions, prefix: 'lhr-rwp-dep', formId: 'form-lhr-rwp-dep' },
    'rwp_lhr_arrival': { options: rwpLhrArrivalOptions, prefix: 'rwp-lhr-arr', formId: 'form-rwp-lhr-arr' },
    'lhr_mianwali_departure': { options: lhrMianwaliDepartureOptions, prefix: 'lhr-mianwali-dep', formId: 'form-lhr-mianwali-dep' },
    'mianwali_lhr_arrival': { options: mianwaliLhrArrivalOptions, prefix: 'mianwali-lhr-arr', formId: 'form-mianwali-lhr-arr' },
    'lhr_qta_departure': { options: lhrQtaDepartureOptions, prefix: 'lhr-qta-dep', formId: 'form-lhr-qta-dep' },
    'qta_lhr_arrival': { options: qtaLhrArrivalOptions, prefix: 'qta-lhr-arr', formId: 'form-qta-lhr-arr' }
};

document.addEventListener('DOMContentLoaded', () => {
    // Apply CSS for latest entry display
    const style = document.createElement('style');
    style.textContent = `
        .latest-entry {
            margin-top: 15px;
            padding: 12px;
            border-radius: 6px;
            background-color: rgba(255, 255, 255, 0.1);
            border-left: 4px solid #27ae60;
            animation: fadeIn 0.5s;
        }
        .latest-entry h4 {
            margin-top: 0;
            margin-bottom: 8px;
            color: #2ecc71;
            font-size: 0.95em;
        }
        .latest-entry p {
            margin: 5px 0;
            font-size: 0.9em;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // --- Authentication Check ---
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html'; // Redirect to login page
        return; // Stop further execution of this script
    }
    // --- End Authentication Check ---

    const formsContainer = document.querySelector('.forms-container');
    const confirmationMessage = document.getElementById('confirmation-message');
    const LOCAL_STORAGE_KEY = 'trainAppSchedules';
    let currentEditDetails = null; // { routeKey, index, formId }

    const showConfirmation = (message, isError = false) => {
        confirmationMessage.textContent = message;
        confirmationMessage.style.backgroundColor = isError ? '#c0392b' : '#27ae60';
        confirmationMessage.style.display = 'block';
        setTimeout(() => { confirmationMessage.style.display = 'none'; }, 3000);
    };

    const resetFormDisplay = (formElement) => {
        if (!formElement) return;
        const submitButton = formElement.querySelector('button[type="submit"]');
        const cancelButton = formElement.querySelector('.cancel-edit-btn');
        if (submitButton) {
            const formIdParts = formElement.id.replace('form-', '').split('-');
            if (formIdParts.length >= 3) {
                const readableRoute = `${formIdParts[0].toUpperCase()} - ${formIdParts[1].toUpperCase()} (${formIdParts[2] === 'dep' ? 'Departure' : 'Arrival'})`;
                submitButton.textContent = `Add ${readableRoute}`;
            } else {
                submitButton.textContent = 'Add Entry';
            }
        }
        if (cancelButton) cancelButton.style.display = 'none';

        const prefix = formElement.id.replace('form-', '');
        document.getElementById(`${prefix}-expectedTime`).value = '';
        document.getElementById(`${prefix}-status`).value = '';
        document.getElementById(`${prefix}-platformNo`).value = '';
        const trainNameDisplay = document.getElementById(`${prefix}-trainName-display`);
        const scheduledTimeDisplay = document.getElementById(`${prefix}-scheduledTime-display`);
        const hiddenTrainName = document.getElementById(`${prefix}-hidden-trainName`);
        const hiddenScheduledTime = document.getElementById(`${prefix}-hidden-scheduledTime`);
        const trainNoSelect = document.getElementById(`${prefix}-trainNo`);

        if (trainNoSelect && trainNoSelect.tagName === 'SELECT') {
            if (trainNameDisplay) trainNameDisplay.textContent = '-';
            if (scheduledTimeDisplay) scheduledTimeDisplay.textContent = '-';
            if (hiddenTrainName) hiddenTrainName.value = '';
            if (hiddenScheduledTime) hiddenScheduledTime.value = '';
        }

        // Clear the latest entry div when cancelling the edit
        if (currentEditDetails === null) {
            const latestEntryDiv = document.getElementById(`${prefix}-latest-entry`);
            if (latestEntryDiv) {
                latestEntryDiv.style.display = 'none';
            }
        }
    };

    function calculateAndUpdateStatus(prefix) {
        const scheduledTimeValue = document.getElementById(`${prefix}-hidden-scheduledTime`).value;
        const expectedTimeValue = document.getElementById(`${prefix}-expectedTime`).value;
        const statusSelect = document.getElementById(`${prefix}-status`);

        if (!statusSelect || !scheduledTimeValue) return; // Can't calculate without a scheduled time

        const currentStatus = statusSelect.value;
        const isDeparture = prefix.endsWith('-dep');
        const finalStatuses = isDeparture ? ['Departed', 'Cancelled'] : ['Arrived', 'Cancelled'];

        if (finalStatuses.includes(currentStatus)) {
            // Don't override a manually set final status unless it's 'Cancelled' and expected time is now added.
            if (currentStatus === 'Cancelled' && expectedTimeValue) {
                // falls through to calculation
            } else {
                return;
            }
        }

        if (expectedTimeValue) {
            if (expectedTimeValue > scheduledTimeValue) statusSelect.value = "Late";
            else if (expectedTimeValue < scheduledTimeValue) statusSelect.value = "Before";
            else statusSelect.value = "On Time";
        } else {
            statusSelect.value = "Cancelled";
        }
    }

    function populateTrainNoDropdown(selectElement, optionsArray) {
        if (!selectElement || !optionsArray || optionsArray.length === 0) {
            if (selectElement) selectElement.innerHTML = '<option value="">-- No Data --</option>';
            return;
        }
        selectElement.innerHTML = '<option value="">-- Select Train No --</option>';
        optionsArray.forEach(train => {
            const option = document.createElement('option');
            option.value = train.trainNo;
            option.textContent = train.trainNo;
            selectElement.appendChild(option);
        });
    }

    function handleTrainNoChange(event) {
        const selectElement = event.target;
        const form = selectElement.closest('form');
        if (!form) return;
        const prefix = form.id.replace('form-', '');

        const routeKeyFromFormId = Object.keys(routeConfigs).find(key => routeConfigs[key].prefix === prefix);
        if (!routeKeyFromFormId) return;

        const config = routeConfigs[routeKeyFromFormId];
        const optionsArray = config.options;

        const trainNameDisplay = document.getElementById(`${prefix}-trainName-display`);
        const scheduledTimeDisplay = document.getElementById(`${prefix}-scheduledTime-display`);
        const hiddenTrainName = document.getElementById(`${prefix}-hidden-trainName`);
        const hiddenScheduledTime = document.getElementById(`${prefix}-hidden-scheduledTime`);

        const selectedTrainNo = selectElement.value;
        const selectedTrainData = optionsArray.find(train => train.trainNo === selectedTrainNo);

        if (selectedTrainData) {
            if (trainNameDisplay) trainNameDisplay.textContent = selectedTrainData.trainName;
            if (scheduledTimeDisplay) scheduledTimeDisplay.textContent = selectedTrainData.scheduledTime;
            if (hiddenTrainName) hiddenTrainName.value = selectedTrainData.trainName;
            if (hiddenScheduledTime) hiddenScheduledTime.value = selectedTrainData.scheduledTime;
        } else {
            if (trainNameDisplay) trainNameDisplay.textContent = '-';
            if (scheduledTimeDisplay) scheduledTimeDisplay.textContent = '-';
            if (hiddenTrainName) hiddenTrainName.value = '';
            if (hiddenScheduledTime) hiddenScheduledTime.value = '';
        }
        // After updating scheduled time, re-calculate the status
        calculateAndUpdateStatus(prefix);
    }

    for (const routeKey in routeConfigs) {
        const config = routeConfigs[routeKey];
        const selectElement = document.getElementById(`${config.prefix}-trainNo`);
        const expectedTimeElement = document.getElementById(`${config.prefix}-expectedTime`);

        if (selectElement && selectElement.tagName === 'SELECT') {
            populateTrainNoDropdown(selectElement, config.options);
            selectElement.addEventListener('change', handleTrainNoChange);
        }
        if (expectedTimeElement) {
            expectedTimeElement.addEventListener('change', () => calculateAndUpdateStatus(config.prefix));
        }
    }

    const populateFormForMasterEdit = (routeKey, index) => {
        const config = routeConfigs[routeKey];
        if (!config) {
            showConfirmation("Error: Invalid route configuration for edit.", true);
            return;
        }
        const targetFormId = config.formId;

        if (currentEditDetails && currentEditDetails.formId && currentEditDetails.formId !== targetFormId) {
            const currentlyEditingForm = document.getElementById(currentEditDetails.formId);
            if (currentlyEditingForm) resetFormDisplay(currentlyEditingForm);
        }

        let allSchedules = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
        const item = allSchedules[routeKey] && allSchedules[routeKey][index];

        if (!item) {
            showConfirmation("Error: Could not find item to edit.", true);
            currentEditDetails = null; return;
        }

        const formElement = document.getElementById(targetFormId);
        if (!formElement) {
            showConfirmation(`Error: Could not find form with ID ${targetFormId}.`, true);
            currentEditDetails = null; return;
        }
        currentEditDetails = { routeKey, index, formId: targetFormId };
        const prefix = config.prefix;

        const trainNoSelect = document.getElementById(`${prefix}-trainNo`);
        if (trainNoSelect && trainNoSelect.tagName === 'SELECT') {
            trainNoSelect.value = item.trainNo;
            trainNoSelect.dispatchEvent(new Event('change'));
        }

        document.getElementById(`${prefix}-expectedTime`).value = item.expectedTime;
        document.getElementById(`${prefix}-status`).value = item.status;
        document.getElementById(`${prefix}-platformNo`).value = item.platformNo;

        formElement.querySelector('button[type="submit"]').textContent = 'Update Entry';
        const cancelButton = formElement.querySelector('.cancel-edit-btn');
        if (cancelButton) cancelButton.style.display = 'inline-block';
        formElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    if (formsContainer) {
        formsContainer.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', async function (event) {
                event.preventDefault();
                const submittedForm = this;
                const submittedFormId = submittedForm.id;
                const prefix = submittedFormId.replace('form-', '');
                const currentRouteKey = Object.keys(routeConfigs).find(key => routeConfigs[key].prefix === prefix);

                if (!currentRouteKey) {
                    console.error("Submit: Could not determine routeKey for form:", submittedFormId);
                    showConfirmation("Error: Form configuration not found.", true);
                    return;
                }
                const config = routeConfigs[currentRouteKey];

                let trainNo = document.getElementById(`${config.prefix}-trainNo`).value;
                let trainName = document.getElementById(`${config.prefix}-hidden-trainName`).value;
                let scheduledTimeValue = document.getElementById(`${config.prefix}-hidden-scheduledTime`).value;

                if (!trainNo) {
                    showConfirmation("Please select a valid Train No.", true);
                    return;
                }
                if (trainNo && (!trainName || !scheduledTimeValue)) {
                    const selectedTrainData = config.options.find(train => train.trainNo === trainNo);
                    if (selectedTrainData) {
                        trainName = selectedTrainData.trainName;
                        scheduledTimeValue = selectedTrainData.scheduledTime;
                    }
                }

                const expectedTimeValue = document.getElementById(`${prefix}-expectedTime`).value;
                // Get the final status value from the dropdown, which should have been auto-updated
                let statusValue = document.getElementById(`${prefix}-status`).value;
                const platformNo = document.getElementById(`${prefix}-platformNo`).value;

                if (USE_SUPABASE) {
                    // Format data for Supabase
                    const scheduleData = {
                        route: currentRouteKey,
                        train_number: trainNo,
                        train_name: trainName,
                        schedule_time: scheduledTimeValue,
                        expected_time: expectedTimeValue,
                        status: statusValue,
                        platform: platformNo
                    };

                    let result;
                    if (currentEditDetails && currentEditDetails.formId === submittedFormId) {
                        // Update existing entry in Supabase
                        result = await updateSchedule(currentEditDetails.index, scheduleData);
                        if (result.success) {
                            const readableRouteKey = currentRouteKey.toUpperCase().replace(/_/g, ' ').replace(' DEPARTURE', ' (Departure) ').replace(' ARRIVAL', ' (Arrival) ');
                            showConfirmation(`Entry for ${readableRouteKey} updated successfully!`);

                            // Display the added/updated entry below the form
                            displayLastAddedEntry(prefix, scheduleData);
                        } else {
                            showConfirmation(`Error updating schedule: ${result.message}`, true);
                            return;
                        }
                    } else {
                        // Add new entry to Supabase
                        result = await addSchedule(scheduleData);
                        if (result.success) {
                            const readableRouteKey = currentRouteKey.toUpperCase().replace(/_/g, ' ').replace(' DEPARTURE', ' (Departure) ').replace(' ARRIVAL', ' (Arrival) ');
                            showConfirmation(`Entry for ${readableRouteKey} added successfully!`);

                            // Display the added/updated entry below the form
                            displayLastAddedEntry(prefix, scheduleData);
                        } else {
                            showConfirmation(`Error adding schedule: ${result.message}`, true);
                            return;
                        }
                    }
                } else {
                    // Original localStorage implementation
                    const entryData = {
                        trainNo, trainName, scheduledTime: scheduledTimeValue,
                        expectedTime: expectedTimeValue, status: statusValue, platformNo
                    };

                    let allSchedules = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

                    if (currentEditDetails && currentEditDetails.formId === submittedFormId) {
                        if (allSchedules[currentEditDetails.routeKey] && allSchedules[currentEditDetails.routeKey][currentEditDetails.index] !== undefined) {
                            allSchedules[currentEditDetails.routeKey][currentEditDetails.index] = entryData;
                            const readableRouteKey = currentEditDetails.routeKey.toUpperCase().replace(/_/g, ' ').replace(' DEP ', ' (Departure) ').replace(' ARR ', ' (Arrival) ');
                            showConfirmation(`Entry for ${readableRouteKey} updated successfully!`);

                            // Display the added/updated entry below the form
                            displayLastAddedEntry(prefix, {
                                train_number: trainNo,
                                train_name: trainName,
                                schedule_time: scheduledTimeValue,
                                expected_time: expectedTimeValue,
                                status: statusValue,
                                platform: platformNo
                            });
                        } else {
                            showConfirmation("Error: Could not find item to update in storage.", true);
                            return;
                        }
                    } else {
                        if (!allSchedules[currentRouteKey]) allSchedules[currentRouteKey] = [];
                        allSchedules[currentRouteKey].push(entryData);
                        const readableRouteKey = currentRouteKey.toUpperCase().replace(/_/g, ' ').replace(' DEP ', ' (Departure) ').replace(' ARR ', ' (Arrival) ');
                        showConfirmation(`Entry for ${readableRouteKey} added successfully!`);

                        // Display the added/updated entry below the form
                        displayLastAddedEntry(prefix, {
                            train_number: trainNo,
                            train_name: trainName,
                            schedule_time: scheduledTimeValue,
                            expected_time: expectedTimeValue,
                            status: statusValue,
                            platform: platformNo
                        });
                    }
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allSchedules));
                }

                // Reset form and clean up current edit state
                if (currentEditDetails && currentEditDetails.formId === submittedFormId) {
                    currentEditDetails = null;
                } else if (currentEditDetails && currentEditDetails.formId && currentEditDetails.formId !== submittedFormId) {
                    const activeEditForm = document.getElementById(currentEditDetails.formId);
                    if (activeEditForm) resetFormDisplay(activeEditForm);
                    currentEditDetails = null;
                }

                resetFormDisplay(submittedForm);
                await displayAllDataOnMasterPage();
            });
        });
    }

    // Helper function to display the last added entry below the form
    function displayLastAddedEntry(prefix, scheduleData) {
        const formElement = document.getElementById(`form-${prefix}`);
        if (!formElement) return;

        const latestEntryDiv = document.getElementById(`${prefix}-latest-entry`) || document.createElement('div');
        latestEntryDiv.id = `${prefix}-latest-entry`;
        latestEntryDiv.className = 'latest-entry';
        latestEntryDiv.innerHTML = `
            <h4>Last Entry Added:</h4>
            <p><strong>Train:</strong> ${scheduleData.train_number} - ${scheduleData.train_name}</p>
            <p><strong>Scheduled Time:</strong> ${scheduleData.schedule_time}</p>
            <p><strong>Expected Time:</strong> ${scheduleData.expected_time || 'N/A'}</p>
            <p><strong>Status:</strong> ${scheduleData.status || 'N/A'}</p>
            <p><strong>Platform:</strong> ${scheduleData.platform || 'N/A'}</p>
        `;

        // Insert the div after the form buttons
        const formButtons = formElement.querySelector('.form-buttons');
        if (formButtons.nextElementSibling && formButtons.nextElementSibling.id === `${prefix}-latest-entry`) {
            formButtons.parentNode.replaceChild(latestEntryDiv, formButtons.nextElementSibling);
        } else {
            formButtons.insertAdjacentElement('afterend', latestEntryDiv);
        }

        // Make it visible
        latestEntryDiv.style.display = 'block';
    }

    const renderMasterTable = (routeKey, containerId, entriesArray) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        let tableHTML = `
            <table>
                <thead><tr><th>Train No</th><th>Name</th><th>Scheduled</th><th>Expected</th><th>Status</th><th>Platform</th><th>Actions</th></tr></thead>
                <tbody>`;
        if (!entriesArray || entriesArray.length === 0) {
            tableHTML += `<tr><td colspan="7" style="text-align:center;">No data available.</td></tr>`;
        } else {
            entriesArray.forEach((item, index) => {
                // Handle both localStorage and Supabase field naming
                const trainNo = item.trainNo || item.train_number || '';
                const trainName = item.trainName || item.train_name || '';
                const scheduledTime = item.scheduledTime || item.schedule_time || '';
                const expectedTime = item.expectedTime || item.expected_time || '';
                const status = item.status || '';
                const platformNo = item.platformNo || item.platform || '';

                // Use item.id for Supabase or index for localStorage
                const itemId = USE_SUPABASE ? item.id : index;

                // Store the exact database values as data attributes
                const exactTrainNo = item.train_number || item.trainNo || '';

                tableHTML += `
                    <tr data-exact-train-no="${exactTrainNo}">
                        <td>${trainNo.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
                        <td>${trainName.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
                        <td>${scheduledTime.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
                        <td>${expectedTime ? expectedTime.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;") : ''}</td>
                        <td>${status ? status.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;") : ''}</td>
                        <td>${platformNo ? platformNo.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;") : ''}</td>
                        <td class="actions-cell">
                            <button type="button" class="action-btn edit-btn" data-routekey="${routeKey}" data-index="${itemId}">Edit</button>
                            <button type="button" class="action-btn remove-btn" data-routekey="${routeKey}" data-index="${itemId}" data-train-no="${exactTrainNo}">Delete</button>
                        </td>
                    </tr>`;
            });
        }
        tableHTML += `</tbody></table>`;
        container.innerHTML = tableHTML;
    };

    const displayAllDataOnMasterPage = async () => {
        if (USE_SUPABASE) {
            // Fetch data from Supabase
            for (const routeKey in routeConfigs) {
                const config = routeConfigs[routeKey];
                const result = await getSchedules(routeKey);
                const entries = result.success ? result.data : [];
                renderMasterTable(routeKey, `table-data-${config.prefix}`, entries);
            }
        } else {
            // Use the original localStorage approach
            const allSchedules = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
            for (const routeKey in routeConfigs) {
                const config = routeConfigs[routeKey];
                renderMasterTable(routeKey, `table-data-${config.prefix}`, allSchedules[routeKey] || []);
            }
        }
    };

    const mainContentArea = document.querySelector('.forms-container');
    if (mainContentArea) {
        mainContentArea.addEventListener('click', async function (event) {
            const target = event.target;

            if (target.classList.contains('remove-btn')) {
                const routeKey = target.dataset.routekey;
                const indexOrId = target.dataset.index;
                const exactTrainNo = target.dataset.trainNo; // Get the exact train number from data attribute

                if (confirm(`Are you sure you want to delete this entry for ${routeKey.replace(/_/g, ' ')}?`)) {
                    if (USE_SUPABASE) {
                        try {
                            // Log the exact parameters being used for deletion
                            console.log("Attempting to delete with route:", routeKey, "and train_number:", exactTrainNo);

                            // Delete from Supabase using route and exact train number from data attribute
                            const result = await deleteSchedule(indexOrId, routeKey, exactTrainNo);

                            // Handle potential undefined result
                            if (result && result.success) {
                                showConfirmation(`Entry from ${routeKey.replace(/_/g, ' ')} deleted successfully.`);

                                // Remove the row from the table directly instead of re-rendering
                                const row = target.closest('tr');
                                if (row) {
                                    row.parentNode.removeChild(row);
                                } else {
                                    // Fall back to re-rendering if we can't find the row
                                    await displayAllDataOnMasterPage();
                                }

                                // If we were editing this item, reset the form
                                if (currentEditDetails && currentEditDetails.routeKey === routeKey) {
                                    const formToReset = document.getElementById(currentEditDetails.formId);
                                    if (formToReset) resetFormDisplay(formToReset);
                                    currentEditDetails = null;
                                }
                            } else {
                                const errorMsg = result ? result.message : 'Unknown error occurred';
                                showConfirmation(`Error deleting entry: ${errorMsg}`, true);
                            }
                        } catch (error) {
                            showConfirmation(`Error deleting entry: ${error.message}`, true);
                        }
                    } else {
                        // Original localStorage implementation
                        const index = parseInt(indexOrId, 10);
                        let allSchedules = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
                        if (allSchedules[routeKey] && allSchedules[routeKey][index] !== undefined) {
                            allSchedules[routeKey].splice(index, 1);
                            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allSchedules));
                            displayAllDataOnMasterPage();
                            showConfirmation(`Entry from ${routeKey.replace(/_/g, ' ')} deleted successfully.`);
                            if (currentEditDetails && currentEditDetails.routeKey === routeKey && currentEditDetails.index === index) {
                                const formToReset = document.getElementById(currentEditDetails.formId);
                                if (formToReset) resetFormDisplay(formToReset);
                                currentEditDetails = null;
                            } else if (currentEditDetails && currentEditDetails.routeKey === routeKey && index < currentEditDetails.index) {
                                currentEditDetails.index--;
                            }
                        } else {
                            showConfirmation(`Error: Could not find entry to delete for ${routeKey}.`, true);
                        }
                    }
                }
            } else if (target.classList.contains('edit-btn')) {
                const routeKey = target.dataset.routekey;
                const indexOrId = target.dataset.index;

                if (USE_SUPABASE) {
                    // Use the populateFormForMasterEditFromSupabase function to populate the form
                    await populateFormForMasterEditFromSupabase(routeKey, indexOrId);
                } else {
                    // Original localStorage implementation
                    const index = parseInt(indexOrId, 10);
                    populateFormForMasterEdit(routeKey, index);
                }
            } else if (target.classList.contains('cancel-edit-btn')) {
                const formElement = target.closest('form');
                if (formElement) {
                    resetFormDisplay(formElement);
                    currentEditDetails = null;
                    showConfirmation("Edit cancelled.");
                }
            }
        });
    }

    // Function to populate the form for editing using Supabase data
    async function populateFormForMasterEditFromSupabase(routeKey, id) {
        const config = routeConfigs[routeKey];
        if (!config) {
            showConfirmation("Error: Invalid route configuration for edit.", true);
            return;
        }
        const targetFormId = config.formId;

        if (currentEditDetails && currentEditDetails.formId && currentEditDetails.formId !== targetFormId) {
            const currentlyEditingForm = document.getElementById(currentEditDetails.formId);
            if (currentlyEditingForm) resetFormDisplay(currentlyEditingForm);
        }

        // Fetch the item from Supabase
        const { data: schedules } = await supabase
            .from('schedules')
            .select('*')
            .eq('id', id)
            .single();

        if (!schedules) {
            showConfirmation("Error: Could not find item to edit.", true);
            currentEditDetails = null;
            return;
        }

        const item = schedules;

        const formElement = document.getElementById(targetFormId);
        if (!formElement) {
            showConfirmation(`Error: Could not find form with ID ${targetFormId}.`, true);
            currentEditDetails = null;
            return;
        }

        // Set the current edit details
        currentEditDetails = { routeKey, index: id, formId: targetFormId };

        const prefix = config.prefix;
        const trainNoSelect = document.getElementById(`${prefix}-trainNo`);
        const trainNameDisplay = document.getElementById(`${prefix}-trainName-display`);
        const scheduledTimeDisplay = document.getElementById(`${prefix}-scheduledTime-display`);
        const hiddenTrainName = document.getElementById(`${prefix}-hidden-trainName`);
        const hiddenScheduledTime = document.getElementById(`${prefix}-hidden-scheduledTime`);
        const expectedTimeInput = document.getElementById(`${prefix}-expectedTime`);
        const statusSelect = document.getElementById(`${prefix}-status`);
        const platformNoInput = document.getElementById(`${prefix}-platformNo`);

        // Populate form with item data
        if (trainNoSelect) trainNoSelect.value = item.train_number;
        if (trainNameDisplay) trainNameDisplay.textContent = item.train_name;
        if (scheduledTimeDisplay) scheduledTimeDisplay.textContent = item.schedule_time;
        if (hiddenTrainName) hiddenTrainName.value = item.train_name;
        if (hiddenScheduledTime) hiddenScheduledTime.value = item.schedule_time;
        if (expectedTimeInput) expectedTimeInput.value = item.expected_time || '';
        if (statusSelect) statusSelect.value = item.status || '';
        if (platformNoInput) platformNoInput.value = item.platform || '';

        // Update form appearance for editing
        const submitButton = formElement.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Update Entry';
        }

        let cancelButton = formElement.querySelector('.cancel-edit-btn');
        if (!cancelButton) {
            cancelButton = document.createElement('button');
            cancelButton.type = 'button';
            cancelButton.className = 'cancel-edit-btn';
            cancelButton.textContent = 'Cancel Edit';
            cancelButton.style.marginTop = '10px';
            cancelButton.style.backgroundColor = '#7f8c8d';
            submitButton.parentNode.insertBefore(cancelButton, submitButton.nextSibling);

            cancelButton.addEventListener('click', () => {
                resetFormDisplay(formElement);
                currentEditDetails = null;
            });
        }
        cancelButton.style.display = 'inline-block';
        formElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    displayAllDataOnMasterPage();

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
        updateDateTimeDisplay();
        setInterval(updateDateTimeDisplay, 1000);
    }

    // --- Message Management Logic ---
    const messageForm = document.getElementById('form-general-message');
    const messageTableContainer = document.getElementById('table-data-general-message');

    if (messageForm) {
        messageForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const contentInput = document.getElementById('general-message-content');
            const content = contentInput.value.trim();

            if (!content) return;

            // Use upsert instead of add - will insert if no message exists, update if it does
            const result = await upsertGeneralMessage(content);
            if (result.success) {
                showConfirmation('Message saved successfully!');
                contentInput.value = '';
                loadAndDisplayGeneralMessage();
            } else {
                showConfirmation('Error saving message: ' + result.message, true);
            }
        });
    }

    async function loadAndDisplayGeneralMessage() {
        if (!messageTableContainer) return;

        const result = await getGeneralMessage();
        if (result.success) {
            const message = result.data;
            let html = `
                <table>
                    <thead>
                        <tr>
                            <th>Current Message</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            if (!message) {
                html += `<tr><td colspan="2" style="text-align:center;">No message set. Add one above.</td></tr>`;
            } else {
                const timeString = new Date(message.updated_at).toLocaleString();
                html += `
                    <tr>
                        <td>${message.content}</td>
                        <td>${timeString}</td>
                    </tr>
                `;
            }
            html += `</tbody></table>`;
            messageTableContainer.innerHTML = html;
        } else {
            messageTableContainer.innerHTML = `<p style="color: #e74c3c;">Error loading message.</p>`;
        }
    }

    // Initial load of general message
    if (messageTableContainer) {
        loadAndDisplayGeneralMessage();
    }
});
