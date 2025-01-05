document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointmentForm');
    const message = document.getElementById('message');
    const doctorSelect = document.getElementById('doctor');

fetch('http://localhost:3000/api/doctors')
    .then(response => response.json())
    .then(data => {
        data.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.name;
            option.textContent = doctor.name;
            doctorSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching doctors:', error));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            patientName: form.patientName.value,
            contactNumber: form.contactNumber.value,
            appointmentDate: form.appointmentDate.value,
            doctor: form.doctor.value,
        };

        if(!formData.patientName || !formData.contactNumber || !formData.appointmentDate || !formData.doctor) {
            message.textContent = 'Please fill in all fields.';
            message.style.color = 'red';
            return;
        }

        fetch('http://localhost:3000/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        .then(response => {
            if(response.ok) {
                message.textContent = 'Appointment booked successfully!';
                message.style.color = 'green';
                form.reset();
            } else {
                message.textContent = 'Error booking appointment.';
                message.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error booking appointment:', error);
            message.textContent = 'An error occurred. Please try again.';
            message.style.color = 'red';
        });
    });
});