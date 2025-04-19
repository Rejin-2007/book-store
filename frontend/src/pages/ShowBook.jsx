import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Backbutton from "../components/Backbutton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const apiUrl = "https://book-store-backend-2ymx.onrender.com"
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner />;
  if (!book) return <p className="text-red-500 text-center">Book not found.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Backbutton />
      <h1 className="text-3xl my-6 font-bold text-center sm:text-left">
        Book Details
      </h1>

      <div className="flex flex-col bg-white border-2 border-sky-400 rounded-xl shadow-md p-6 space-y-4 overflow-x-auto">
        <DetailItem label="ID" value={book._id} />
        <DetailItem label="Title" value={book.title} />
        <DetailItem label="Author" value={book.author} />
        <DetailItem label="Publish Year" value={book.publishYear} />
        <DetailItem
          label="Created At"
          value={new Date(book.createdAt).toLocaleString()}
        />
        <DetailItem
          label="Last Updated"
          value={new Date(book.updatedAt).toLocaleString()}
        />
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center">
    <span className="text-lg font-medium text-gray-600 sm:w-48">{label}</span>
    <span className="text-base text-gray-800 break-all">{value}</span>
  </div>
);

export default ShowBook;