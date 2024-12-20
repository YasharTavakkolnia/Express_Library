import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../models/Prisma.js';


export const register  = async(req,res)=>{
    try {
        const { username, password, role } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role
            }
        });

        console.log(`User ${username} has been registered`);

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error during registration' });
    }

}
export const login  = async(req,res)=>{
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const passwordValid = bcrypt.compareSync(password, user.password);
        if (!passwordValid) {
            return res.status(401).send({ message: "Invalid password" });
        }

        console.log(user);

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send token as response
        res.json({ token });

    } catch (error) {
        console.log(error.message);
        res.sendStatus(503);  // Service unavailable
    }

}