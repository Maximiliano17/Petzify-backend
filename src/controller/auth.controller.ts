import { Request, Response } from 'express';
import user, { IUser } from '../models/auth.model';
import jwt from 'jsonwebtoken';

export const signin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const userFind = await user.findOne({ username: username });

        if (!userFind) return res.status(400).json({ status: 400, message: 'User Not Found.' });

        const authPassword: boolean = await userFind.validatePassword(password);

        if (!authPassword) return res.status(400).json({ status: 400, message: 'Error Password Incorrect' });

        const token: string = jwt.sign({ _id: userFind._id }, process.env.TOKEN_SECRET || 'tokentest');

        return res.header('auth-token', token).status(200).json({ status: 200, user: userFind });
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password, role } = req.body;

        const newUser: IUser = await user.create({
            username,
            email,
            password,
            role
        })

        newUser.password = await newUser.encryptPassword(newUser.password);

        const savedUser = await newUser.save();

        const token: string = jwt.sign({ _id: savedUser._id, role }, process.env.TOKEN_SECRET || 'tokentest')

        return res.header('auth-token', token).status(200).json({ status: 200, user: savedUser });
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
}

export const profile = async (req: Request, res: Response) => {
    try {
        const UserFind = await user.findById(req.body.userId);

        if (!UserFind) return res.status(400).json({ status: 400, message: 'User Not Found' });

        return res.status(200).json({ status: 200, user: UserFind });

    } catch (error) {
        return res.status(400).json(error);
    }
}