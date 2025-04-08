import {users} from '../interface/user.interface'
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const generateToken = (user: users): string => {
    return jwt.sign({id: user.id, email: user.email, role: user.roleId}, JWT_SECRET, {expiresIn: '8h'})
}

