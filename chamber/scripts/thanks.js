const formInfo = new URLSearchParams(window.location.search);
const thanksInfo = document.querySelector('.form-data');


const formattedTimeDate = new Date(formInfo.get('time-stamp')).toLocaleString('en-CA', {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true, timeZone: 'America/Denver'
}).replace(',', '');


thanksInfo.innerHTML =
    `<strong>Name:</strong> ${formInfo.get('fname')} ${formInfo.get('lname')}<br>
    <strong>E-Mail:</strong> ${formInfo.get('email')}<br>
    <strong>Mobile Number:</strong> ${formInfo.get('phone')}<br>
    <strong>Business Name:</strong> ${formInfo.get('org-name')}<br>
    <strong>Time Logged:</strong> ${formattedTimeDate}

    `;