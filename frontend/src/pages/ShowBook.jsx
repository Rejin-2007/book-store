import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Backbutton from '../components/Backbutton'
import Spinner from '../components/Spinner'

const ShowBook = () => {
  const  [book,setBook] = useState([])
  const [loading,setLoading] = useState(false);
  const {id} = useParams(); 

  useEffect(() => {
    setLoading(true);
    try {
      axios.get(`http://localhost:6588/books/${id}`).then((res)=>{
        setBook(res.data);
        setLoading(false);
      })
    } catch (error) {
      setLoading(false)
      console.log("Error Occured In ShowwBook")
    }
  }, [])
  

  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ):(
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 '>ID</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 '>TITLE</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 '>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 '>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 '>Created Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 '>Last Updated Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook