const EmployeeModel = require('../models/employee.model');

exports.getEmployeeList = (req, res) => {
    // console.log('Here all employees list');
    EmployeeModel.getAllEmployees((err, employees) => {
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Employees', employees);
        res.send(employees)
    })
}

// Get employee by ID
exports.getEmployeeByID = (req, res) => {
    //console.log('get emp by id');
    EmployeeModel.getEmployeeByID(req.params.id, (err, employee) => {
        if (err)
        res.send(err);
        console.log('single employee data', employee);
        res.send(employee);
    })
}

// create new employee
exports.createNewEmployee = (req, res) => {
    console.log('req data', req.body);
    const employeeReqData = new EmployeeModel(req.body);
    console.log('employeeReqData', employeeReqData);
    // check null
    if (req.body.contructor === Object && Object.keys(req,body).length === 0) { 
        res.send(400).send({success: false, message: 'Please fill all fields'});
    } else {
        EmployeeModel.createEmployee(employeeReqData, (err, employee) => {
            if (err)
                res.send(err);
                res.json({status: true, message: 'Employee created successfully', data: employee.insertId})
        })
    }
}

// update employee
exports.updateEmployee = (req, res) => {
    const employeeReqData = new EmployeeModel(req.body);
    console.log('employeeReqData update', employeeReqData);
    // check null
    if (req.body.contructor === Object && Object.keys(req,body).length === 0) {
        res.send(400).send({success: false, message: 'Please fill all fields'});
    } else {
        EmployeeModel.updateEmployee(req.params.id, employeeReqData, (err, employee) => {
            if (err)
                res.send(err);
                res.json({status: true, message: 'Employee updated successfully'})
        })
    }
}

// delete employee
exports.deleteEmployee = (req, res) => {
    EmployeeModel.deleteEmployee(req.params.id, (err, employee) => {
        if (err)
        res.send(err);
        res.json({success: true, message: 'Employee deleted successfully'});
    })
}