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

document.addEventListener('DOMContentLoaded', () => {
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
        formElement.reset();
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
             trainNoSelect.value = ""; 
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
            form.addEventListener('submit', function(event) {
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
                if(trainNo && (!trainName || !scheduledTimeValue)){
                    const selectedTrainData = config.options.find(train => train.trainNo === trainNo);
                    if(selectedTrainData){
                        trainName = selectedTrainData.trainName;
                        scheduledTimeValue = selectedTrainData.scheduledTime;
                    }
                }

                const expectedTimeValue = document.getElementById(`${prefix}-expectedTime`).value;
                // Get the final status value from the dropdown, which should have been auto-updated
                let statusValue = document.getElementById(`${prefix}-status`).value;
                const platformNo = document.getElementById(`${prefix}-platformNo`).value;
                
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
                    } else {
                        showConfirmation("Error: Could not find item to update in storage.", true);
                    }
                    resetFormDisplay(submittedForm);
                    currentEditDetails = null; 
                } else { 
                    if (currentEditDetails && currentEditDetails.formId && currentEditDetails.formId !== submittedFormId) {
                         const activeEditForm = document.getElementById(currentEditDetails.formId);
                         if(activeEditForm) resetFormDisplay(activeEditForm);
                    }
                    currentEditDetails = null; 

                    if (!allSchedules[currentRouteKey]) allSchedules[currentRouteKey] = [];
                    allSchedules[currentRouteKey].push(entryData);
                    const readableRouteKey = currentRouteKey.toUpperCase().replace(/_/g, ' ').replace(' DEP ', ' (Departure) ').replace(' ARR ', ' (Arrival) ');
                    showConfirmation(`Entry for ${readableRouteKey} added successfully!`);
                    resetFormDisplay(submittedForm);
                }
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allSchedules));
                displayAllDataOnMasterPage(); 
            });
        });
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
                tableHTML += `
                    <tr>
                        <td>${item.trainNo ? item.trainNo.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;") : ''}</td>
                        <td>${item.trainName ? item.trainName.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;") : ''}</td>
                        <td>${item.scheduledTime ? item.scheduledTime.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;") : ''}</td>
                        <td>${item.expectedTime ? item.expectedTime.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;") : ''}</td>
                        <td>${item.status ? item.status.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;") : ''}</td>
                        <td>${item.platformNo ? item.platformNo.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;") : ''}</td>
                        <td class="actions-cell">
                            <button type="button" class="action-btn edit-btn" data-routekey="${routeKey}" data-index="${index}">Edit</button>
                            <button type="button" class="action-btn remove-btn" data-routekey="${routeKey}" data-index="${index}">Delete</button>
                        </td>
                    </tr>`;
            });
        }
        tableHTML += `</tbody></table>`;
        container.innerHTML = tableHTML;
    };

    const displayAllDataOnMasterPage = () => {
        const allSchedules = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
        for (const routeKey in routeConfigs) {
            const config = routeConfigs[routeKey];
            renderMasterTable(routeKey, `table-data-${config.prefix}`, allSchedules[routeKey] || []);
        }
    };

    const mainContentArea = document.querySelector('.forms-container'); 
    if (mainContentArea) {
        mainContentArea.addEventListener('click', function(event) {
            const target = event.target;
            if (target.classList.contains('remove-btn')) {
                const routeKey = target.dataset.routekey;
                const index = parseInt(target.dataset.index, 10);
                if (confirm(`Are you sure you want to delete this entry for ${routeKey.replace(/_/g, ' ')}?`)) {
                    let allSchedules = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
                    if (allSchedules[routeKey] && allSchedules[routeKey][index] !== undefined) {
                        allSchedules[routeKey].splice(index, 1);
                        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allSchedules));
                        displayAllDataOnMasterPage(); 
                        showConfirmation(`Entry from ${routeKey.replace(/_/g, ' ')} deleted successfully.`);
                        if(currentEditDetails && currentEditDetails.routeKey === routeKey && currentEditDetails.index === index) {
                            const formToReset = document.getElementById(currentEditDetails.formId);
                            if(formToReset) resetFormDisplay(formToReset); 
                            currentEditDetails = null;
                        } else if (currentEditDetails && currentEditDetails.routeKey === routeKey && index < currentEditDetails.index) {
                            currentEditDetails.index--;
                        }
                    } else {
                        showConfirmation(`Error: Could not find entry to delete for ${routeKey}.`, true);
                    }
                }
            } else if (target.classList.contains('edit-btn')) {
                const routeKey = target.dataset.routekey;
                const index = parseInt(target.dataset.index, 10);
                populateFormForMasterEdit(routeKey, index);
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
});
