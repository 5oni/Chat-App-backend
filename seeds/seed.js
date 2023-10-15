require('../config')
let User = require('../models/user')



const seedUsers = () => {
    let user = User.findOne()
    if (user) {
        console.log("!!Users Already seeded!!")
        return
    }
    // Inserting users with password 123456
    let insertUsers = [
        {
            name: "Admin",
            email: 'admin@riktamtech.com',
            userName: 'riktamtechAdmin',
            role: "ADMIN",
            password: "sKLwseYbZi9A2U1Dz4nv9ksdFZHKrDc6Eh9tt4VQPY3aKkQJaeT5sAzrqfdv4lg21MDZgSk6PUv+mZap/TEpfQ==",
            salt: "oG+56KFsmqbFNoqZTfesyA==",
        },
        {
            name: "Sunil Soni",
            email: 'sunil@riktamtech.com',
            userName: 'sunilsoni',
            role: "USER",
            password: "sKLwseYbZi9A2U1Dz4nv9ksdFZHKrDc6Eh9tt4VQPY3aKkQJaeT5sAzrqfdv4lg21MDZgSk6PUv+mZap/TEpfQ==",
            salt: "oG+56KFsmqbFNoqZTfesyA==",
        },
        {
            name: "Anshul Kumar",
            email: 'anshul@riktamtech.com',
            userName: 'anshulkumar',
            role: "USER",
            password: "sKLwseYbZi9A2U1Dz4nv9ksdFZHKrDc6Eh9tt4VQPY3aKkQJaeT5sAzrqfdv4lg21MDZgSk6PUv+mZap/TEpfQ==",
            salt: "oG+56KFsmqbFNoqZTfesyA==",
        },
        {
            name: "Aditya Singh",
            email: 'aditya@riktamtech.com',
            userName: 'adityaSingh',
            role: "USER",
            password: "sKLwseYbZi9A2U1Dz4nv9ksdFZHKrDc6Eh9tt4VQPY3aKkQJaeT5sAzrqfdv4lg21MDZgSk6PUv+mZap/TEpfQ==",
            salt: "oG+56KFsmqbFNoqZTfesyA==",
        },
        {
            name: "Yash Jangid",
            email: 'yash@riktamtech.com',
            userName: 'yashJi',
            role: "USER",
            password: "sKLwseYbZi9A2U1Dz4nv9ksdFZHKrDc6Eh9tt4VQPY3aKkQJaeT5sAzrqfdv4lg21MDZgSk6PUv+mZap/TEpfQ==",
            salt: "oG+56KFsmqbFNoqZTfesyA==",
        }
    ]
    User.create(insertUsers).then(res => {
        console.log("Users Seeded", res)
    }).catch(err => {
        console.log("Error while seeding Users", err)
    })
}


seedUsers()