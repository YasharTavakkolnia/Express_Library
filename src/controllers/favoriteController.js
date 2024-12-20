import prisma from "../models/Prisma.js";

// Add a favorite book
export const addFavorite = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });
        const book = await prisma.book.findUnique({
            where: { id: parseInt(bookId) }
        });

        if (!user || !book) {
            return res.status(404).json({ message: 'User or book not found' });
        }

        const favorite = await prisma.favoriteBook.create({
            data: {
                user: {
                    connect: { id: parseInt(userId) }
                },
                book: {
                    connect: { id: parseInt(bookId) }
                }
            }
        });

        res.status(200).json({ message: 'Book added to favorites', favorite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add book to favorites', error: error.message });
    }
};

// Get user's favorite books
export const getFavorite = async (req, res) => {
    try {
        const { userId } = req.params;

        const userWithFavorites = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            include: {
                FavoriteBooks: {
                    include: {
                        book: {
                            select: {
                                book_name: true
                            }
                        }
                    }
                }
            }
        });

        if (!userWithFavorites) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (userWithFavorites.FavoriteBooks.length === 0) {
            return res.status(200).json({ message: 'No favorite books found for this user' });
        }

        const favorites = userWithFavorites.FavoriteBooks.map(fav => ({
            username: userWithFavorites.username,
            book_name: fav.book.book_name
        }));

        res.status(200).json({ favorites });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch user favorites', error: error.message });
    }
};

// Delete a favorite book
export const deleteFavorite = async (req, res) => {
    try {
        const { favoriteId } = req.params;

        const favorite = await prisma.favoriteBook.findUnique({
            where: { id: parseInt(favoriteId) }
        });

        if (!favorite) {
            return res.status(404).json({ message: 'Favorite record not found' });
        }

        await prisma.favoriteBook.delete({
            where: { id: parseInt(favoriteId) }
        });

        res.status(200).json({ message: 'Favorite record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete favorite record', error: error.message });
    }
};
