"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userStore_1 = require("./userStore");
const router = (0, express_1.Router)();
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
function isStrongPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}
// Register
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: 'Username and password required' });
        return;
    }
    if (!isValidEmail(username)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
    }
    if (!isStrongPassword(password)) {
        res.status(400).json({
            error: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
        });
        return;
    }
    if (userStore_1.UserStore.findUser(username)) {
        res.status(400).json({ error: 'Username already exists' });
        return;
    }
    userStore_1.UserStore.addUser({ username, password });
    res.json({ message: 'User registered successfully', user: { username } });
});
// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: 'Username and password required' });
        return;
    }
    if (!userStore_1.UserStore.validateUser(username, password)) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }
    res.json({ message: 'Login successful', user: { username } });
});
// Logout
router.post('/logout', (_, res) => {
    res.json({ message: 'Logged out (no real session)' });
});
exports.default = router;
