import { Router, Request, Response } from 'express';
import { UserStore } from './userStore';

const router: Router = Router();

export interface AuthBody {
  username: string;
  password: string;
}

function isValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

function isStrongPassword(password: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

// Register
router.post('/register', (req: Request<{}, {}, AuthBody>, res: Response): void => {
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

  if (UserStore.findUser(username)) {
    res.status(400).json({ error: 'Username already exists' });
    return;
  }

  UserStore.addUser({ username, password });
  res.json({ message: 'User registered successfully', user: { username } });
});

// Login
router.post('/login', (req: Request<{}, {}, AuthBody>, res: Response): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password required' });
    return;
  }

  if (!UserStore.validateUser(username, password)) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  res.json({ message: 'Login successful', user: { username } });
});

// Logout
router.post('/logout', (_, res: Response): void => {
  res.json({ message: 'Logged out (no real session)' });
});

export default router;
// Tanya has invaded this code 