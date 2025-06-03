"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const USERS_FILE_PATH = path_1.default.join(__dirname, '../users.json');
class UserStore {
    static readFile() {
        if (!fs_1.default.existsSync(USERS_FILE_PATH))
            return [];
        const data = fs_1.default.readFileSync(USERS_FILE_PATH, 'utf-8');
        return JSON.parse(data || '[]');
    }
    static writeFile(users) {
        fs_1.default.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');
    }
    static getAllUsers() {
        return this.readFile();
    }
    static addUser(user) {
        const users = this.readFile();
        users.push(user);
        this.writeFile(users);
    }
    static findUser(username) {
        const users = this.readFile();
        return users.find((user) => user.username === username);
    }
    static validateUser(username, password) {
        const users = this.readFile();
        return users.find((user) => user.username === username && user.password === password);
    }
}
exports.UserStore = UserStore;
