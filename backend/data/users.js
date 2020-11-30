import bcrypt from 'bcryptjs'
import speakeasy from 'speakeasy'

const temp_secret = speakeasy.generateSecret()

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    temp_secret,
    isAdmin: true,
  },
  {
    name: 'Angela Winn',
    email: 'angela@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
