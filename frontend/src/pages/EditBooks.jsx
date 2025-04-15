import React,{useState,useEffect} from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import Backbutton from '../components/Backbutton'
import { useNavigate,useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'


const EditBook = () => {
  const {enqueueSnackbar} = useSnackbar()
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [publishYear,setPublishYear] = useState('')
  const [loading,setLoading] = useState('')
  const {id} = useParams()
  const [error,setError]=useState('')

  useEffect(() => {
    setLoading(true)
    try {
      axios.get(`http://localhost:6588/books/${id}`).then((res)=>{
        setTitle(res.data.title)
        setAuthor(res.data.author)
        setPublishYear(res.data.publishYear)
        setLoading(false)
      })
    } catch (error) {
      setLoading(false)

      console.log("Error Occur In Edit Book ")
    }
  }, [])
  
  const navigate = useNavigate();
  const handleEditBook = () =>{
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true)
    try {
      axios.put(`http://localhost:6588/books/${id}`,data).then(()=>{
        setLoading(false);
        enqueueSnackbar("Book Edited Sucessfully",{variant:"success"})
        navigate('/')
      })
    } catch (error) {
      setLoading(false);
      setError(error.message)
      enqueueSnackbar('Error',{variant:"Error"})
      console.log("Error Occured In CreateBooks In handlesaveBook")
    }
  }

  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
            type='text'
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
            type='text'
            value={author}
            onChange={(e)=> setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input 
            type='text'
            value={publishYear}
            onChange={(e)=> setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='border-2 bg-sky-300 m-8 ' onClick={handleEditBook}>Save</button>
      </div>
      {
        error.length < 2 ? "" : <h1>{error}</h1> 
      }
    </div>
  )
}

export default EditBook