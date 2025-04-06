"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 8091;
app.get("/", (_, res) => {
    res.send(`
    <h2>gRPC Client is running</h2>
    <ul>
      <li><a href="/status">Status</a></li>
      <li><a href="/users">Load users</a></li>
      <li><a href="/login">Login test user</a></li>
    </ul>
  `);
});
app.listen(PORT, () => {
    //runSequence();
    console.log(`Client server running on http://localhost:${PORT}`);
});
