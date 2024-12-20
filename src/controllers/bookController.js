import prisma from '../models/Prisma.js'

export const getBook = async (req,res)=>{
    try {
        const books = await prisma.book.findMany();
        if (!books || books.length === 0) {
            return res.status(404).json({message : 'No books found'})
        }
        res.json(books)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'failed to fetch books'});
    }
}

export const addBook = async (req,res)=>{
    try {
        const { book_name, author, publish_date, summary, category_id } = req.body;
        if (!book_name || !author || !publish_date || !summary || !category_id) {
            return res.status(400).json({ message: 'Please provide all required fields!' });
        }
        const book = await prisma.book.create({
            data: {
                book_name: book_name,
                author: author,
                publish_date: new Date(publish_date),
                summary: summary || null,
                category_id: category_id
            }
        })
        res.status(200).json({ message: 'Book added to library', book: book });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to add book.', error: error.message });
    }
}