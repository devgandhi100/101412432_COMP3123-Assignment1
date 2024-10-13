const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

// Create new employee
router.post('/employees', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json({ message: 'Employee created successfully.', employee_id: employee._id });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
});

// Get employee by ID
router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

// Update employee by ID
router.put('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
});

// Delete employee by ID
router.delete('/employees', async (req, res) => {
    try {
        const { eid } = req.query;
        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(204).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

module.exports = router;
