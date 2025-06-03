import fs from 'fs';
import path from 'path';
import { UserStore } from '../src/userStore';
import { AuthBody } from '../src/auth';

const USERS_FILE_PATH = path.join(__dirname, '../users.json');

beforeEach(() => {
  fs.writeFileSync(USERS_FILE_PATH, '[]', 'utf-8');
});

describe('UserStore', () => {
  it('should return an empty array when no users exist', () => {
    const users = UserStore.getAllUsers();
    expect(users).toEqual([]);
  });

  it('should add a new user', () => {
    const newUser: AuthBody = { username: 'testuser@example.com', password: 'SecurePass123#' };
    UserStore.addUser(newUser);

    const users = UserStore.getAllUsers();
    expect(users.length).toBe(1);
    expect(users[0]).toEqual(newUser);
  });

  it('should find an existing user by username', () => {
    const newUser: AuthBody = { username: 'testuser@example.com', password: 'SecurePass123#' };
    UserStore.addUser(newUser);

    const foundUser = UserStore.findUser('testuser@example.com');
    expect(foundUser).toEqual(newUser);
  });

  it('should validate user with correct credentials', () => {
    const newUser: AuthBody = { username: 'testuser@example.com', password: 'SecurePass123#' };
    UserStore.addUser(newUser);

    const validatedUser = UserStore.validateUser('testuser@example.com', 'SecurePass123#');
    expect(validatedUser).toEqual(newUser);
  });

  it('should not validate user with incorrect password', () => {
    const newUser: AuthBody = { username: 'testuser@example.com', password: 'SecurePass123#' };
    UserStore.addUser(newUser);

    const validatedUser = UserStore.validateUser('testuser@example.com', 'wrongpass');
    expect(validatedUser).toBeUndefined();
  });

  it('should not find non-existing user', () => {
    const user = UserStore.findUser('nonuser@example.com');
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
