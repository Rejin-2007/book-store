import express from "express";
import { BOOK } from "../models/bookModel.js";
const router = express.Router()

// Created New Book 

router.post("/", async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (!title) {
            return res.status(400).send({ message: "Title is required" });
        }
        if (!author) {
            return res.status(400).send({ message: "Author Name  is required" });
        }
        if (!publishYear) {
            return res.status(400).send({ message: "publish Year  is required" });
        }
        const newBook = {
            title: title.trim(),
            author: author.trim(),
            publishYear: Number(publishYear),
        };

        const book = await BOOK.create(newBook);

        return res.status(201).send({
            message: "Book is successfully Created",
            data: book,
        });
    } catch (error) {
        console.error("Error creating book:", error.message);
        return res.status(500).send({ message: "Server error", error: error.message });
    }
});

// Get All  Book 
router.get('/', async (req, res) => {
    try {
        const books = await BOOK.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(`message : ${error}`)
        res.status(500).send({ message: error.message })
    }
})
// Get Book By its ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await BOOK.findById(id)
        return res.status(200).json(book)
    } catch (error) {
        console.log(`message : ${error}`)
        res.status(500).send({ message: error.message })
    }
})
// Update A Book 
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, publishYear } = req.body;
        if (!title) {
            return res.status(400).send({ message: "Title is required" });
        }
        if (!author) {
            return res.status(400).send({ message: "Author Name  is required" });
        }
        if (!publishYear) {
            return res.status(400).send({ message: "publish Year  is required" });
        }
        const updatedBook = {
            title: title.trim(),
            author: author.trim(),
            publishYear: Number(publishYear),
        };
        
        
        const result = await BOOK.findByIdAndUpdate(
            id,
            updatedBook,
            { new: true }
        );
        if (!result) {
            return res.status(404).send({ message: "Book Is Not Found" });
        }
        return res.status(200).send({ message: "Book Is Sucessfully Updated" })
    } catch (error) {
        console.log(`message : ${error}`)
        res.status(500).send({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await BOOK.findByIdAndDelete(id)
        if (!book) {
            return res.status(404).json({ message: "Book not Found" })
        }
        return res.status(200).json({ message: "Delete Is Sucessfully" })
    } catch (error) {
        console.log(`message : ${error}`)
        res.status(500).send({ message: error.message })
    }
})


export default router 