import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Foysal Ahmed',
        email: 'foysalxahmed@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jane Williams',
        email: 'jane@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users