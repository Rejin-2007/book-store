import React from 'react'
import { PiBookOpenTextLight } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import BookModel from './BookModel';
import { GiCalendarHalfYear } from "react-icons/gi";

const BookCard = ({ books }) => {
  const [showModel, setShowModel] = useState(false)
  return (

    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books.map((book) => (
        <div key={book._id} className='border-2 border-red-500 rounded-lg px-4 py-2 m-4 mt-4 relative hover:shadow-xl'>
          
          <div className='flex justify-start items-center gap-x-2'>
            <PiBookOpenTextLight className='text-red-300 text-2xl ' />
            <h2 className='my-1 text-white'>{book.title}</h2>
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <BiUserCircle className='text-red-300 text-2xl ' />
            <h2 className='my-1 text-white'>{book.author}</h2>
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <GiCalendarHalfYear className='text-red-300 text-2xl ' />
            <h2 className=' my-1 text-white'>{book.publishYear}</h2>
          </div>
          
          <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
            <BiShow
              className='text-3xl text-blue-800 hover:text-black cursor-pointer '
              onClick={() => setShowModel(true)}
            />
            <Link to={`/books/details/${book._id}`}>
              <BsInfoCircle className='text-2xl text-cyan-950 hover:text-black ' />
            </Link>
            <Link to={`/books/edit/${book._id}`}>
              <AiOutlineEdit className='text-2xl text-yellow-800 hover:text-black' />
            </Link>
            <Link to={`/books/delete/${book._id}`}>
              <MdOutlineDelete className='text-2xl text-red-800 hover:text-black' />
            </Link>
          </div>
          {
            showModel && (
              <BookModel book={book} onClose={() => setShowModel(false)} />
            )
          }
        </div>
      ))}
    </div>
  )
}

export default BookCard