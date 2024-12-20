import express, { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import {getBook,addBook} from '../controllers/bookController.js';
import {addCategory,getCategory} from '../controllers/categoryController.js';
import { addFavorite, getFavorite,deleteFavorite } from '../controllers/favoriteController.js';
const router = express.Router();

// this is the main
router.get('/',getBook)

// only admin can add new book in website
router.post('/addbook',authMiddleware,adminMiddleware,addBook)

// show all categories
router.get('/category',getCategory)

// only admin can add category in website
router.post("/addCategory", authMiddleware, adminMiddleware,addCategory)

// user can add a book in favorite books section in profile
router.post('/addFavorite', authMiddleware,addFavorite)
// get all favorite books of a user
router.get('/favorite/:userId', authMiddleware,getFavorite)
// delete favorite books of a user
router.delete('/deleteFavorite/:favoriteId', authMiddleware, deleteFavorite);

export default router;
