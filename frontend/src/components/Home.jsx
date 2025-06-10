import React, { useState } from 'react'
import { Bounce, ToastContainer, Zoom, toast } from 'react-toastify';
import axios from 'axios';


const Home = () => {
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.BACKEND_URL || "http://127.0.0.1:8000/"
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!first_name.trim()) {
      toast.warning("Enter first name")
      return
    }
    if (!last_name.trim()) {
      toast.warning("Enter last name")
      return
    }
    if (!email.trim()) {
      toast.warning("Enter email")
      return
    }
    setLoading(true);
    axios.post(`${url}addStudent/`, {
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: email.trim()
    }).then(res => {
      toast.success("Student added!");
      setEmail('')
      setFirst_name('')
      setLast_name('')
      setLoading(false)
    })
      .catch(err => {
        if (err.response && err.response.data.email) {
          toast.error("Email already exists!");
          setEmail('')
          setLoading(false)
        } else {
          toast.error("Something went wrong.");
          setEmail('')
          setFirst_name('')
          setLast_name('')
          setLoading(false)
        }
      });

  }

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
      <div className="bg-gray-200 rounded-2xl h-fit w-[400px] p-4">
        <p className='text-2xl mb-4 text-center font-bold'>Add Students</p>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-900">First name</label>
            <input type="text" id="first_name" value={first_name} onChange={(e) => setFirst_name(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div className='mb-4'>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-900">Last name</label>
            <input type="text" id="last_name" value={last_name} onChange={(e) => setLast_name(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div className='mb-4'>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div className='flex justify-center mt-4'>

            <button type="submit" className="text-white bg-gray-900 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  dark:hover:bg-gray-900 dark:focus:ring-blue-900 cursor-pointer" disabled={loading}>{
              loading ? "Submitting" : "Submit"
            }</button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Home