
import axios from 'axios'

const Rest_API_Base_URL = "https://employeecurd822024-production.up.railway.app/api/v1/employees"

export const listOfEmployee = () => axios.get(Rest_API_Base_URL);

export const createEmployee = (employee) => axios.post(Rest_API_Base_URL, employee);

export const getEmployeeById = (employeeId) => axios.get(Rest_API_Base_URL + "/" + employeeId);

export const updateEmployeeById = (employeeId,employee) => axios.put(Rest_API_Base_URL + "/" + employeeId, employee )

export const deleteEmployeeById = (employeeId) => axios.delete(Rest_API_Base_URL + '/' + employeeId)
