import { supabase, getSchedules, addSchedule, updateSchedule, deleteSchedule } from './supabase.js';

// Data for Train Number, Name, and Scheduled Time dropdowns
const lhrKcDepartureOptions = [
    { trainNo: "38 DN", trainName: "Fareed Express / فرید ایکسپریس", scheduledTime: "06:00" }, { trainNo: "28 DN", trainName: "Shalimar Express / شالیمار ایکسپریس", scheduledTime: "07:30" },
    { trainNo: "02 DN", trainName: "Khyber Mail / خیبر میل", scheduledTime: "07:55" }, { trainNo: "10_DN", trainName: "Allma Iqbal Express / علامہ اقبال ایکسپریس", scheduledTime: "12:10" },
    { trainNo: "08 DN", trainName: "Tezgam Express / تیزگام ایکسپریس", scheduledTime: "13:45" }, { trainNo: "42 DN", trainName: "Karakarm Express / قراقرم ایکسپریس", scheduledTime: "15:00" },
    { trainNo: "34 DN", trainName: "Pak Business Express / پاک بزنس ایکسپریس", scheduledTime: "16:30" }, { trainNo: "16 DN", trainName: "Karachi Express / کراچی ایکسپریس", scheduledTime: "18:00" },
    { trainNo: "14 DN", trainName: "Awam Express / عوام ایکسپریس", scheduledTime: "18:30" }, { trainNo: "06 DN", trainName: "Green Line Express / گرین لائن ایکسپریس", scheduledTime: "20:50" },
    { trainNo: "44 DN", trainName: "Shah hussain Express / شاہ حسین ایکسپریس", scheduledTime: "21:00" }
];
const kcLhrArrivalOptions = [
    { trainNo: "27 UP", trainName: "Shalimar Express / شالیمار ایکسپریس", scheduledTime: "02:55" }, { trainNo: "13 UP", trainName: "Awam Express / عوام ایکسپریس", scheduledTime: "07:25" },
    { trainNo: "41 UP", trainName: "Karakarm Express / قراقرم ایکسپریس", scheduledTime: "10:20" }, { trainNo: "33 UP", trainName: "Pak Business Express / پاک بزنس ایکسپریس", scheduledTime: "10:20" },
    { trainNo: "09 UP", trainName: "Allama Iqbal Express / علامہ اقبال ایکسپریس", scheduledTime: "12:30" }, { trainNo: "15 UP", trainName: "Karachi Express / کراچی ایکسپریس", scheduledTime: "13:00" },
    { trainNo: "07 UP", trainName: "Tezgam Express / تیزگام ایکسپریس", scheduledTime: "14:00" }, { trainNo: "05_UP", trainName: "Green Line Express / گرین لائن ایکسپریس", scheduledTime: "15:35" },
    { trainNo: "43 UP", trainName: "Shah Hussain Express / شاہ حسین ایکسپریس", scheduledTime: "15:35" }, { trainNo: "01 UP", trainName: "Khyber Mail / خیبر میل", scheduledTime: "20:30" },
    { trainNo: "37 UP", trainName: "Fareed Express / فرید ایکسپریس", scheduledTime: "22:00" }
];
const lhrRwpDepartureOptions = [
    { trainNo: "105 UP", trainName: "Rawal Express / راول ایکسپریس", scheduledTime: "00:30" }, { trainNo: "101UP", trainName: "Subak Rafftar Express / سبک رفتار ایکسپریس", scheduledTime: "07:00" },
    { trainNo: "13 UP", trainName: "Awam Express / عوام ایکسپریس", scheduledTime: "08:00" }, { trainNo: "39 UP", trainName: "Jaffar Express / جعفر ایکسپریس", scheduledTime: "10:15" },
    { trainNo: "07 UP", trainName: "TezgamExpress / تیزگام ایکسپریس", scheduledTime: "14:30" }, { trainNo: "05 UP", trainName: "Green Line Express / گرین لائن ایکسپریس", scheduledTime: "16:10" },
    { trainNo: "103 UP", trainName: "Subak Kharam Express / سبک خرام ایکسپریس", scheduledTime: "16:30" }, { trainNo: "107 UP", trainName: "Islamabad Non-Stop / اسلام آباد نان سٹاپ", scheduledTime: "18:00" },
    { trainNo: "01 UP", trainName: "Khyber Mail / خیبر میل", scheduledTime: "21:00" }
];
const rwpLhrArrivalOptions = [
    { trainNo: "106 DN", trainName: "Rawal Express / راول ایکسپریس", scheduledTime: "05:00" }, { trainNo: "02 DN", trainName: "Khyber Mail / خیبر میل", scheduledTime: "07:15" },
    { trainNo: "102 DN", trainName: "Subak Rafftar / سبک رفتار", scheduledTime: "11:50" }, { trainNo: "08 DN", trainName: "Tezgam / تیزگام", scheduledTime: "13:15" },
    { trainNo: "40 DN", trainName: "Jaffar Express / جعفر ایکسپریس", scheduledTime: "16:10" }, { trainNo: "14 DN", trainName: "Awam Express / عوام ایکسپریس", scheduledTime: "18:20" },
    { trainNo: "06 DN", trainName: "Green Line / گرین لائن", scheduledTime: "20:10" }, { trainNo: "104 DN", trainName: "Subak Kharam / سبک خرام", scheduledTime: "21:35" },
    { trainNo: "108 DN", trainName: "Islamabad Non Stop / اسلام آباد نان سٹاپ", scheduledTime: "22:30" }
];
const lhrQtaDepartureOptions = [{ trainNo: "39 UP", trainName: "Jaffar Express / جعفر ایکسپریس", scheduledTime: "09:40" }];
const qtaLhrArrivalOptions = [{ trainNo: "40 DN", trainName: "Jaffar Express / جعفر ایکسپریس", scheduledTime: "16:45" }];
const lhrMianwaliDepartureOptions = [{ trainNo: "147 UP", trainName: "Mari Indux Express / ماڑی انڈس ایکسپریس", scheduledTime: "05:30" }];
const mianwaliLhrArrivalOptions = [{ trainNo: "148 DN", trainName: "Mari Indux Express / ماڑی انڈس ایکسپریس", scheduledTime: "18:15" }];
const lhrNwlDepartureOptions = [
    { trainNo: "171_UP", trainName: "Sialkot Express / سیالکوٹ ایکسپریس", scheduledTime: "05:00" }, { trainNo: "211_UP", trainName: "Narowal Passenger / نارووال پسنجر", scheduledTime: "07:15" },
    { trainNo: "09_UP", trainName: "Allama Iqbal Express / علامہ اقبال ایکسپریس", scheduledTime: "13:00" }, { trainNo: "125_UP", trainName: "Lasani Express / لاثانی ایکسپریس", scheduledTime: "15:45" },
    { trainNo: "209_UP", trainName: "Faiz Ahmed Faiz / فیض احمد فیض", scheduledTime: "19:30" }
];
const nwlLhrArrivalOptions = [
    { trainNo: "210_DN", trainName: "Faiz Ahmed Faiz / فیض احمد فیض", scheduledTime: "05:00" }, { trainNo: "126_DN", trainName: "Lasani Express / لاثانی ایکسپریس", scheduledTime: "07:00" },
    { trainNo: "10_DN", trainName: "Allama Iqbal Express / علامہ اقبال ایکسپریس", scheduledTime: "11:35" }, { trainNo: "212 DN", trainName: "Narowal Passenger / نارووال پسنجر", scheduledTime: "17:00" },
    { trainNo: "172 DN", trainName: "Sialkot Express / سیالکوٹ ایکسپریس", scheduledTime: "21:50" }
];
const lhrFsldDepartureOptions = [
    { trainNo: "112 DN", trainName: "Baddar Express / بدر ایکسپریس", scheduledTime: "09:30" }, { trainNo: "114 DN", trainName: "Ghuri Express / غوری ایکسپریس", scheduledTime: "19:00" }
];
const fsldLhrArrivalOptions = [
    { trainNo: "111_UP", trainName: "Baddar Express / بدر ایکسپریس", scheduledTime: "08:35" }, { trainNo: "113_UP", trainName: "Ghuri Express / غوری ایکسپریس", scheduledTime: "18:10" }
];
const lhrPshDepartureOptions = [
    { trainNo: "13 UP", trainName: "Awam Express / عوام ایکسپریس", scheduledTime: "08:00" }, { trainNo: "39 UP", trainName: "Jaffar Express / جعفر ایکسپریس", scheduledTime: "10:15" },
    { trainNo: "07 UP", trainName: "TezgamExpress / تیز گام ایکسپریس", scheduledTime: "14:30" }, { trainNo: "05 UP", trainName: "Green Line Express / گرین لائن ایکسپریس", scheduledTime: "16:10" },
    { trainNo: "01 UP", trainName: "Khyber Mail / خیبر میل", scheduledTime: "21:00" }
];
const pshLhrArrivalOptions = [
    { trainNo: "02 DN", trainName: "Khyber Mail / خیبر میل", scheduledTime: "07:15" }, { trainNo: "08 DN", trainName: "Tezgam / تیز گام", scheduledTime: "13:15" },
    { trainNo: "40 DN", trainName: "Jaffar Express / جعفر ایکسپریس", scheduledTime: "16:10" }, { trainNo: "14 DN", trainName: "Awam Express / عوام ایکسپریس", scheduledTime: "18:20" },
    { trainNo: "06 DN", trainName: "Green Line / گرین لائن", scheduledTime: "20:10" }
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


document.addEventListener('DOMContentLoaded', async () => {
    // --- Authentication Check ---
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html'; // Redirect to login page
        return; // Stop further execution of this script
    }
    // --- End Authentication Check ---

    const formsContainer = document.querySelector('.forms-container');
    const confirmationMessage = document.getElementById('confirmation-message');
    let currentEditDetails = null; // { routeKey, id, formId }

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
             if(trainNameDisplay) trainNameDisplay.textContent = '-';
             if(scheduledTimeDisplay) scheduledTimeDisplay.textContent = '-';
             if(hiddenTrainName) hiddenTrainName.value = '';
             if(hiddenScheduledTime) hiddenScheduledTime.value = '';
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
            if(selectElement) selectElement.innerHTML = '<option value="">-- No Data --</option>';
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
            if(trainNameDisplay) trainNameDisplay.textContent = selectedTrainData.trainName;
            if(scheduledTimeDisplay) scheduledTimeDisplay.textContent = selectedTrainData.scheduledTime;
            if(hiddenTrainName) hiddenTrainName.value = selectedTrainData.trainName;
            if(hiddenScheduledTime) hiddenScheduledTime.value = selectedTrainData.scheduledTime;
        } else {
            if(trainNameDisplay) trainNameDisplay.textContent = '-';
            if(scheduledTimeDisplay) scheduledTimeDisplay.textContent = '-';
            if(hiddenTrainName) hiddenTrainName.value = '';
            if(hiddenScheduledTime) hiddenScheduledTime.value = '';
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
    
    const populateFormForMasterEdit = async (routeKey, id) => {
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
        const { data, error } = await supabase
            .from('schedules')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            showConfirmation("Error: Could not find item to edit.", true);
            currentEditDetails = null;
            return;
        }

        const item = data;
        const formElement = document.getElementById(targetFormId);
        if (!formElement) {
            showConfirmation(`Error: Could not find form with ID ${targetFormId}.`, true);
            currentEditDetails = null;
            return;
        }

        // Set the current edit details
        currentEditDetails = { routeKey, id, formId: targetFormId };

        // Get form elements
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
        cancelButton.style.display = 'block';
    };

    const renderMasterTable = async (routeKey, containerId, entriesArray) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        if (!entriesArray || entriesArray.length === 0) {
            container.innerHTML = '<p>No entries yet.</p>';
            return;
        }

        // Create table element
        const table = document.createElement('table');
        table.className = 'data-table';
        
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Train No', 'Train Name', 'Scheduled', 'Expected', 'Status', 'Platform', 'Actions'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        entriesArray.forEach(item => {
            const row = document.createElement('tr');
            
            // Add data cells
            [item.train_number, item.train_name, item.schedule_time, item.expected_time || '-', item.status || '-', item.platform || '-'].forEach(cellText => {
                const td = document.createElement('td');
                td.textContent = cellText;
                row.appendChild(td);
            });
            
            // Add action buttons
            const actionsTd = document.createElement('td');
            
            // Edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'action-btn edit-btn';
            editBtn.addEventListener('click', () => populateFormForMasterEdit(routeKey, item.id));
            actionsTd.appendChild(editBtn);
            
            // Remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Delete';
            removeBtn.className = 'action-btn remove-btn';
            removeBtn.addEventListener('click', async () => {
                if (confirm(`Are you sure you want to delete this ${routeKey.replace('_', ' ')} entry?`)) {
                    const { error } = await deleteSchedule(item.id);
                    if (error) {
                        showConfirmation(`Error deleting entry: ${error.message}`, true);
                    } else {
                        showConfirmation('Entry deleted successfully!');
                        await displayAllDataOnMasterPage();
                    }
                }
            });
            actionsTd.appendChild(removeBtn);
            
            row.appendChild(actionsTd);
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        container.appendChild(table);
    };

    const displayAllDataOnMasterPage = async () => {
        for (const routeKey in routeConfigs) {
            const { data, error } = await supabase
                .from('schedules')
                .select('*')
                .eq('route', routeKey)
                .order('schedule_time', { ascending: true });
            
            if (error) {
                console.error(`Error fetching ${routeKey} data:`, error);
                continue;
            }
            
            const containerId = `${routeConfigs[routeKey].prefix}-table-container`;
            renderMasterTable(routeKey, containerId, data);
        }
    };

    // Set up form submissions
    for (const routeKey in routeConfigs) {
        const config = routeConfigs[routeKey];
        const formElement = document.getElementById(config.formId);
        
        if (formElement) {
            formElement.addEventListener('submit', async (event) => {
                event.preventDefault();
                
                const prefix = config.prefix;
                const trainNoSelect = document.getElementById(`${prefix}-trainNo`);
                const hiddenTrainName = document.getElementById(`${prefix}-hidden-trainName`);
                const hiddenScheduledTime = document.getElementById(`${prefix}-hidden-scheduledTime`);
                const expectedTimeInput = document.getElementById(`${prefix}-expectedTime`);
                const statusSelect = document.getElementById(`${prefix}-status`);
                const platformNoInput = document.getElementById(`${prefix}-platformNo`);
                
                // Validate required fields
                if (!trainNoSelect.value) {
                    showConfirmation('Please select a Train No.', true);
                    return;
                }

                // Prepare the schedule data
                const scheduleData = {
                    route: routeKey,
                    train_number: trainNoSelect.value,
                    train_name: hiddenTrainName.value,
                    schedule_time: hiddenScheduledTime.value,
                    expected_time: expectedTimeInput.value,
                    status: statusSelect.value,
                    platform: platformNoInput.value
                };
                
                let result;
                
                if (currentEditDetails && currentEditDetails.formId === config.formId) {
                    // Update existing entry
                    result = await updateSchedule(currentEditDetails.id, scheduleData);
                    if (result.success) {
                        showConfirmation('Schedule updated successfully!');
                        currentEditDetails = null;
                    } else {
                        showConfirmation(`Error updating schedule: ${result.message}`, true);
                        return;
                    }
                } else {
                    // Add new entry
                    result = await addSchedule(scheduleData);
                    if (result.success) {
                        showConfirmation('Schedule added successfully!');
                    } else {
                        showConfirmation(`Error adding schedule: ${result.message}`, true);
                        return;
                    }
                }
                
                // Reset form and refresh data display
                resetFormDisplay(formElement);
                await displayAllDataOnMasterPage();
            });
        }
    }

    // Update date/time display
    function updateDateTimeDisplay() {
        const dateTimeElement = document.getElementById('current-datetime');
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

    // Initial setup
    updateDateTimeDisplay();
    setInterval(updateDateTimeDisplay, 1000);
    await displayAllDataOnMasterPage();
}); 