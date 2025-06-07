import axios from 'axios'
import { Bounce, ToastContainer, Zoom, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const Students = () => {
  const [Data, setData] = useState([])
  const [EditFirstName, setEditFirstName] = useState('')
  const [EditLastName, setEditLastName] = useState('')
  const [EditEmail, setEditEmail] = useState('')
  const [DeleteModalId, setDeleteModalId] = useState()
  const [EditModalId, setEditModalId] = useState()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/getStudent/')
      .then(
        (res) => {
          console.log(res.data)
          setData(res.data)
        }
      )
      .catch((err) => console.error(err))
  }, [loading])

  const handleDelete = () => {
    setLoading(true)
    axios.delete(`http://127.0.0.1:8000/deleteStudent/${DeleteModalId}/`).then((res) => { console.log(res) }).then((res) => {
      setLoading(false)
      toast.success("Student Deleted Successfully")
    }).catch((err) => {
      setLoading(false)
      toast.error(err)
    })
  }

  const handleEdit = () => {
    setLoading(true)
    axios.put(`http://127.0.0.1:8000/editStudent/${EditModalId}/`, {
      first_name: EditFirstName.trim(),
      last_name: EditLastName.trim(),
      email: EditEmail.trim()
    }).then((res) => console.log(res)
    ).then(
      (res) => {
        setLoading(false)
        toast.success("Edited Successfully")
      }
    ).catch((err) => {
      setLoading(false)
      toast.error(err)
    })
  }
  console.log(Data)

  return (
    <div className='h-full'>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="bg-gray-200 rounded-2xl h-fit w-fit p-4">
        <p className='text-2xl text-blue-900 text-center mb-4 font-bold'>Student list</p>
        <div className="relative overflow-x-auto rounded-2xl">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S. no.
                </th>
                <th scope="col" className="px-6 py-3">
                  First name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {Data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-600 font-semibold">
                    No students added. Go and add a student! <NavLink to='/' className="text-blue-800">Home</NavLink>
                  </td>
                </tr>
              ) : (
                Data.map((item, index) => (
                  <tr key={item.id} className="bg-white border-b dark:border-gray-200 border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{item.first_name}</td>
                    <td className="px-6 py-4">{item.last_name}</td>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
                        onClick={() => {
                          setEditModalId(item.id);
                          setEditFirstName(item.first_name);
                          setEditLastName(item.last_name);
                          setEditEmail(item.email);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer"
                        onClick={() => setDeleteModalId(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

        {/* Delete Modal  */}
        {
          DeleteModalId && (<div id="delete-modal" tabIndex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-900">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Delete Student
                  </h3>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                  <p className='text-white'>Are you sure you want to delete?</p>
                </div>
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button data-modal-hide="delete-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => {
                    handleDelete()
                    setDeleteModalId(null)
                  }}
                  >{loading ? "Deleting..." : "Delete"}</button>
                  <button data-modal-hide="delete-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => setDeleteModalId(null)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>)
        }

        {/* Edit Modal  */}
        {EditModalId && (<div id="edit-modal" tabIndex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-900">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Student
                </h3>

              </div>
              <div className="p-4 md:p-5 space-y-4">
                <div className='mb-4'>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-900">First name</label>
                  <input type="text" id="first_name" value={EditFirstName} onChange={(e) => setEditFirstName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className='mb-4'>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-900">Last name</label>
                  <input type="text" id="last_name" value={EditLastName} onChange={(e) => setEditLastName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className='mb-4'>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                  <input type="email" id="email" value={EditEmail} onChange={(e) => setEditEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="edit-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => {
                  handleEdit()
                  setEditModalId(null)
                }}
                >{
                    loading ? "Saving..." : "Save"
                  }</button>
                <button data-modal-hide="edit-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => setEditModalId(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  )
}
export default Students