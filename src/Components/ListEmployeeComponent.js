import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteEmployeeById, listOfEmployee } from '../Services/EmployeeService';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 700); // Adjust the breakpoint as needed
          };
      
          // Initial check for the screen size
          handleResize();
      
          // Add event listener for window resize
          window.addEventListener('resize', handleResize);
      
          // Clean up the event listener on component unmount
          return () => {
            window.removeEventListener('resize', handleResize);
          };

    }, []);

    const getAllEmployees = () => {
        listOfEmployee().then((response) => {
            // console.log(response.data)
            setEmployees(response.data)
        }).catch(error => {
            console.error(error);
        });
    }

    const addNewEmployee = () => {
        navigate("/add-employee");
    }

    const updateEmployee = (id) => {
        navigate(`/edit-employee/${id}`)
    }

    const deleteEmployee = (id) => {
        deleteEmployeeById(id).then((response) => {
            // console.log(response);
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <>
            <div className='container main'>

                <h2 className='text-center mb-2'>List of Employees</h2>
                <button className={`btn btn-primary mb-2 ${isSmallScreen ? 'btn-sm' : ''}`} onClick={addNewEmployee}>Add Employee</button>
                <table className='table table-striped emp-table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee =>

                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td className='action-btn'>
                                    <button className='btn btn-success' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => deleteEmployee(employee.id)} style={{ marginLeft: '10px' }}>Delete</button>
                                </td>
                                <td className='action-icon'>
                                <i className="fa-solid fa-pen-to-square i1" onClick={() => updateEmployee(employee.id)}></i>
                                <i className="fa-solid fa-trash i2" onClick={() => deleteEmployee(employee.id)}></i>
                                </td>
                            </tr>

                        )

                        }

                    </tbody>
                </table>
            </div>

        </>
    )
}

export default ListEmployeeComponent