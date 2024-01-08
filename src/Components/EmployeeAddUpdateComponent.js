import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createEmployee, getEmployeeById, updateEmployeeById } from '../Services/EmployeeService'

const EmployeeAddUpdateComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmail] = useState('')

    const navigate = useNavigate();

    const {id} = useParams();
    
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        emailId: ''
    });

    useEffect(() => {

        if(id){
            getEmployeeById(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.emailId);
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    const  saveOrUpdateEmployee = (e) =>{
        e.preventDefault();
        
        if(validateForm()){

            const employee = {firstName, lastName, emailId}
            // console.log(employee)

            if(id){
               updateEmployeeById(id,employee).then((response) => {
                //   console.log(response.data);
                  navigate("/employees");
                  
               }).catch(error => {
                  console.error(error);
               })
            }else{
                createEmployee(employee).then((response) => {
                    // console.log(response.data);
                    navigate("/employees")
                }).catch(error => {
                    console.error(error);
                })
            }
        }


    }

    const validateForm = () =>{
        let valid =true;

        const errorsCopy = {...errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if(emailId.trim()){
            errorsCopy.emailId = '';
        } else {
            errorsCopy.emailId = 'Email is required';
            valid = false;
        }


        setErrors(errorsCopy);
        return valid;
    } 

    const pageTitle = () => {
        if(id){
            return <h3 className='text-center m-2'>Update Employee</h3>
        }else{
            return <h3 className='text-center m-2'>Add Employee</h3>
        }
    }



  return (
    <div className='container main'>
        <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
               {
                    pageTitle()
               }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input
                                type='text'
                                placeholder='Enter First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${ errors.firstName ? 'is-invalid': '' }`}
                                onChange={(e) => setFirstName(e.target.value)}
                            >
                            </input>
                            { errors.firstName && <div className='invalid-feedback'> { errors.firstName} </div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Last Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${ errors.lastName ? 'is-invalid': '' }`}
                                onChange={(e) => setLastName(e.target.value)}
                            >
                            </input>
                            { errors.lastName && <div className='invalid-feedback'> { errors.lastName} </div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input
                                type='text'
                                placeholder='Enter Email'
                                name='emailId'
                                value={emailId}
                                className={`form-control ${ errors.emailId ? 'is-invalid': '' }`}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </input>
                            { errors.emailId && <div className='invalid-feedback'> { errors.emailId} </div> }
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee} >Submit</button>
                    </form>

                </div>
            </div>

        </div>

    </div>
  )
}

export default EmployeeAddUpdateComponent