const express = require('express');
const router = express.Router();

// Validation function
const validateUserData = (req, res, next) => {
    const { firstName, lastName, password, email, phoneNumber } = req.body;

    // Validate First Name and Last Name
    if (!/^[A-Z]/.test(firstName)) {
        return next({ status: 400, message: "First name must start with a capital letter." });
    }
    if (!/^[A-Z]/.test(lastName)) {
        return next({ status: 400, message: "Last name must start with a capital letter." });
    }

    // Validate Password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
    if (!passwordRegex.test(password)) {
        return next({ status: 400, message: "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character." });
    }

    // Validate Email
    if (!/@/.test(email)) {
        return next({ status: 400, message: "Email must contain '@' symbol." });
    }

    // Validate Phone Number
    if (!/^\d{10,}$/.test(phoneNumber)) {
        return next({ status: 400, message: "Phone number must be at least 10 digits long." });
    }

    next();
};

// User registration route
router.post('/', validateUserData, (req, res) => {
    res.status(201).json({ message: "User registered successfully" });
});

module.exports = router;
