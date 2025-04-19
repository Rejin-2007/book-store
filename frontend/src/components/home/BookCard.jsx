import React, { useState } from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { GiCalendarHalfYear } from "react-icons/gi";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import BookModel from "./BookModel"; // Modal component

const BookCard = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  if (!books || books.length === 0) {
    return <p className="text-white p-4 text-center">No books found.</p>;
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-screen-xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-zinc-900 border-2 border-red-500 rounded-xl p-4 w-full hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <PiBookOpenTextLight className="text-red-300 text-2xl" />
              <h2 className="text-white font-semibold truncate">{book.title}</h2>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <BiUserCircle className="text-red-300 text-2xl" />
              <h2 className="text-white truncate">{book.author}</h2>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <GiCalendarHalfYear className="text-red-300 text-2xl" />
              <h2 className="text-white">{book.publishYear}</h2>
            </div>

            <div className="flex justify-between items-center space-x-2">
              <BiShow
                className="text-3xl text-blue-800 hover:text-black cursor-pointer"
                onClick={() => setSelectedBook(book)}
              />
              <Link to={`/books/details/${book._id}`}>
                <BsInfoCircle className="text-2xl text-cyan-950 hover:text-black" />
              </Link>
              <Link to={`/books/edit/${book._id}`}>
                <AiOutlineEdit className="text-2xl text-yellow-800 hover:text-black" />
              </Link>
              <Link to={`/books/delete/${book._id}`}>
                <MdOutlineDelete className="text-2xl text-red-800 hover:text-black" />
              </Link>
            </div>
          </div>
        ))}

        {selectedBook && (
          <BookModel book={selectedBook} onClose={() => setSelectedBook(null)} />
        )}
      </div>
    </div>
  );
};

export default BookCard;