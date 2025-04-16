import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import Backbutton from '../components/Backbutton';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const apiUrl = import.meta.env.VITE_DEFAULT_API_LINK || 'http://localhost:6588';
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async () => {
    const data = { title, author, publishYear };

    setLoading(true);
    try {
      await axios.post(`${apiUrl}/books`, data);
      setLoading(false);
      enqueueSnackbar('Book Created Successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.message || 'An error occurred');
      enqueueSnackbar('Error creating book', { variant: 'error' });
      console.error('Error in handleSaveBook:', error);
    }
  };

  return (
    <div className="p-4">
      <Backbutton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          className="border-2 bg-sky-300 hover:bg-sky-400 transition-all duration-200 px-4 py-2 mt-4 rounded-lg"
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default CreateBooks;
