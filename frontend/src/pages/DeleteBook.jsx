import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import Backbutton from '../components/Backbutton';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const apiUrl = "https://book-store-backend-2ymx.onrender.com"
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = async () => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/books/${id}`);
      setLoading(false);
      enqueueSnackbar('Book Deleted Successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error deleting book', { variant: 'error' });
    }
  };

  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl '>Are You Sure To Delete?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>Yes, Delete It</button>
      </div>
    </div>
  );
};

export default DeleteBook;
