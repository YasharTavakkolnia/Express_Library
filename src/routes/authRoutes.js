import express, { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../models/Prisma.js';
import { login, register } from '../controllers/authController.js';

const router = Router();

// Register new user
router.post('/register',register)

// Login existing user
router.post('/login',login)

export default router;
