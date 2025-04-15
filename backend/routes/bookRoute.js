import express from "express";
import { BOOK } from "../models/bookModel.js";
const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        if (!title?.trim() || !author?.trim() || !publishYear) {
            return res.status(400).send({ message: "Kindly please send all required fields" });
        }

        const newBook = {
            title: title.trim(),
            author: author.trim(),
            publishYear: Number(publishYear),
        };

        const book = await BOOK.create(newBook);
        return res.status(201).send({
            message: "Book is successfully updated",
            data: book
        });
    } catch (error) {
        console.error("Error creating book:", error.message);
        return res.status(500).send({ message: "Server error", error: error.message });
    }
});

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

router.put('/:id', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (!title?.trim() || !author?.trim() || !publishYear) {
            return res.status(400).send({ message: "Kindly please send all required fields" });
        }
        const {id} = req.params;
        const result = await BOOK.findByIdAndUpdate(
            id,
            { title, author, publishYear },
            { new: true } // return the updated document
        );
        if(!result){
            return res.status(404).send({ message: "Book Is Not Found" });
        }
        return res.status(200).send({message : "Book Is Sucessfully Updated"})
    } catch (error) {
        console.log(`message : ${error}`)
        res.status(500).send({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const book = await BOOK.findByIdAndDelete(id)
        if(!book){
            return res.status(404).json({message: "Book not Found"})
        }
        return res.status(200).json({message: "Delete Is Sucessfully"})
    } catch (error) {
        console.log(`message : ${error}`)
        res.status(500).send({ message: error.message })
    }
})


export default router 