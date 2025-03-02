const express = require('express');
const router = express.Router();
const db = require('../db');

// Get appointments for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_date DESC',
            [req.params.userId]
        );
        
        if (!rows) {
            return res.status(200).json([]);
        }
        
        res.status(200).json(rows);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});
// Create new appointment
// Create new appointment
router.post('/', async (req, res) => {
    try {
        const { user_id, patient_name, contact_number, appointment_date, doctor, notes } = req.body;
        
        console.log('Creating appointment:', req.body);

        // Validate required fields
        if (!user_id || !patient_name || !contact_number || !appointment_date || !doctor) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                received: { user_id, patient_name, contact_number, appointment_date, doctor }
            });
        }

        // SQL query with DATE type for appointment_date
        const [result] = await db.execute(
            'INSERT INTO appointments (user_id, patient_name, contact_number, appointment_date, doctor, notes) VALUES (?, ?, ?, DATE(?), ?, ?)',
            [user_id, patient_name, contact_number, appointment_date, doctor, notes || null]
        );

        console.log('Appointment created:', result);

        res.status(201).json({ 
            id: result.insertId,
            message: 'Appointment created successfully'
        });
    } catch (error) {
        console.error('Appointment creation error:', error);
        res.status(500).json({ 
            error: error.message || 'Failed to create appointment'
        });
    }
});
// Update appointment
router.put('/:id', async (req, res) => {
    try {
        const { patient_name, contact_number, appointment_date, doctor, notes } = req.body;
        
        console.log('Received update data:', req.body);

        // Validate required fields and ensure no undefined values
        if (!patient_name?.trim() || !contact_number?.trim() || 
            !appointment_date || !doctor?.trim()) {
            return res.status(400).json({ 
                error: 'Missing or invalid required fields',
                received: { patient_name, contact_number, appointment_date, doctor }
            });
        }

        // Sanitize all fields
        const sanitizedData = {
            patient_name: patient_name.trim(),
            contact_number: contact_number.trim(),
            appointment_date: appointment_date,
            doctor: doctor.trim(),
            notes: notes?.trim() || null
        };

        const [result] = await db.execute(
            `UPDATE appointments 
             SET patient_name = ?,
                 contact_number = ?,
                 appointment_date = DATE(?),
                 doctor = ?,
                 notes = ?
             WHERE id = ?`,
            [
                sanitizedData.patient_name,
                sanitizedData.contact_number,
                sanitizedData.appointment_date,
                sanitizedData.doctor,
                sanitizedData.notes,
                req.params.id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        
        res.json({ 
            message: 'Appointment updated successfully',
            updatedFields: sanitizedData
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ 
            error: 'Failed to update appointment',
            details: error.message 
        });
    }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM appointments WHERE id = ?', [req.params.id]);
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;