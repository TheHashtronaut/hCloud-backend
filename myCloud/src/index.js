"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', auth_1.default);
app.get('/', (req, res) => {
    res.send("Hello from the backend!");
});
const PORT = 5982;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
