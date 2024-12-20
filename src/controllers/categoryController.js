import prisma from '../models/Prisma.js'


export const getCategory = async (req,res)=>{
    try {
        const category = await prisma.category.findMany()
        if (!category || category.length === 0) {
            return res.status(404).json({message : 'No category found'})
        }
            res.json(category);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'There is no category' });

    }
}

export const addCategory = async(req,res)=>{
try {
    const {name} = req.body
    if (!name) {
        return res.status(400).json({ message: 'Please enter category name' });
    }
    const category = await prisma.category.create({
        data: {
            name: name
        }
    });
    res.status(201).json(category);
    
} catch (error) {
    
    console.log(error);
    res.status(500).json({ error: 'Server error' });

}
}