import fs from 'fs';
import path from 'path';
import { AuthBody } from './auth';

const USERS_FILE_PATH = path.join(__dirname, '../users.json');

export class UserStore {
  private static readFile(): AuthBody[] {
    if (!fs.existsSync(USERS_FILE_PATH)) return [];
    const data = fs.readFileSync(USERS_FILE_PATH, 'utf-8');
    return JSON.parse(data || '[]');
  }

  private static writeFile(users: AuthBody[]): void {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');
  }

  static getAllUsers(): AuthBody[] {
    return this.readFile();
  }

  static addUser(user: AuthBody): void {
    const users = this.readFile();
    users.push(user);
    this.writeFile(users);
  }

  static findUser(username: string): AuthBody | undefined {
    const users = this.readFile();
    return users.find((user) => user.username === username);
  }

  static validateUser(username: string, password: string): AuthBody | undefined {
    const users = this.readFile();
    return users.find((user) => user.username === username && user.password === password);
  }
}
