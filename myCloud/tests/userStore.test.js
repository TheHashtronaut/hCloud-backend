"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const userStore_1 = require("../src/userStore");
const USERS_FILE_PATH = path_1.default.join(__dirname, '../users.json');
beforeEach(() => {
    fs_1.default.writeFileSync(USERS_FILE_PATH, '[]', 'utf-8');
});
describe('UserStore', () => {
    it('should return an empty array when no users exist', () => {
        const users = userStore_1.UserStore.getAllUsers();
        expect(users).toEqual([]);
    });
    it('should add a new user', () => {
        const newUser = { username: 'testuser@example.com', password: 'SecurePass123#' };
        userStore_1.UserStore.addUser(newUser);
        const users = userStore_1.UserStore.getAllUsers();
        expect(users.length).toBe(1);
        expect(users[0]).toEqual(newUser);
    });
    it('should find an existing user by username', () => {
        const newUser = { username: 'testuser@example.com', password: 'SecurePass123#' };
        userStore_1.UserStore.addUser(newUser);
        const foundUser = userStore_1.UserStore.findUser('testuser@example.com');
        expect(foundUser).toEqual(newUser);
    });
    it('should validate user with correct credentials', () => {
        const newUser = { username: 'testuser@example.com', password: 'SecurePass123#' };
        userStore_1.UserStore.addUser(newUser);
        const validatedUser = userStore_1.UserStore.validateUser('testuser@example.com', 'SecurePass123#');
        expect(validatedUser).toEqual(newUser);
    });
    it('should not validate user with incorrect password', () => {
        const newUser = { username: 'testuser@example.com', password: 'SecurePass123#' };
        userStore_1.UserStore.addUser(newUser);
        const validatedUser = userStore_1.UserStore.validateUser('testuser@example.com', 'wrongpass');
        expect(validatedUser).toBeUndefined();
    });
    it('should not find non-existing user', () => {
        const user = userStore_1.UserStore.findUser('nonuser@example.com');
        expect(user).toBeUndefined();
    });
    it('should reject invalid email format', () => {
        const invalidEmail = 'testuserexample.com';
        const isValid = /\S+@\S+\.\S+/.test(invalidEmail);
        expect(isValid).toBe(false);
    });
    it('should accept valid email format', () => {
        const validEmail = 'testuser@example.com';
        const isValid = /\S+@\S+\.\S+/.test(validEmail);
        expect(isValid).toBe(true);
    });
    it('should reject passwords without uppercase letters', () => {
        const password = 'securepassword123#';
        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
        expect(isValid).toBe(false);
    });
    it('should reject passwords without lowercase letters', () => {
        const password = 'SECUREPASSWORD123#';
        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
        expect(isValid).toBe(false);
    });
    it('should reject passwords without numbers', () => {
        const password = 'SecurePassword#';
        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
        expect(isValid).toBe(false);
    });
    it('should reject passwords without special symbols', () => {
        const password = 'SecurePassword123';
        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
        expect(isValid).toBe(false);
    });
    it('should accept secure password with uppercase, lowercase, number, and symbol', () => {
        const password = 'SecurePass123#';
        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
        expect(isValid).toBe(true);
    });
});
