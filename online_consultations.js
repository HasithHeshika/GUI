const form = document.getElementById('appointmentForm');
const appointmentsList = document.getElementById('appointmentsList');

// Store appointments in an array
const appointments = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const patientName = document.getElementById('patientName').value;
  const doctorName = document.getElementById('doctorName').value;
  const appointmentDate = document.getElementById('appointmentDate').value;

  const appointment = {
    patientName,
    doctorName,
    appointmentDate
  };

  appointments.push(appointment);

  updateAppointmentsList();
  form.reset();
});

function updateAppointmentsList() {
  appointmentsList.innerHTML = '';

  appointments.forEach((appointment, index) => {
    const div = document.createElement('div');
    div.classList.add('appointment');

    div.innerHTML = `
      <p><strong>Patient:</strong> ${appointment.patientName}</p>
      <p><strong>Doctor:</strong> ${appointment.doctorName}</p>
      <p><strong>Date:</strong> ${appointment.appointmentDate}</p>
      <button onclick="deleteAppointment(${index})">Cancel</button>
    `;

    appointmentsList.appendChild(div);
  });
}

function deleteAppointment(index) {
  appointments.splice(index, 1);
  updateAppointmentsList();
}
