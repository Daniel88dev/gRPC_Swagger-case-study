"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.getUserById = exports.createUser = exports.getUsers = exports.getAllUsers = void 0;
const axios_1 = __importDefault(require("axios"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db = "http://localhost:8000/users";
const generateShortId = () => {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
};
// testing for getting all users (need to modify)
const getAllUsers = async () => {
    const users = await (0, axios_1.default)(db);
    if (users.status !== 200) {
        throw new Error("Error fetching users");
    }
    const userEmails = users.data.map((user) => {
        return { id: user.id, email: user.email };
    });
    return userEmails;
};
exports.getAllUsers = getAllUsers;
// get users with offset and limit
const getUsers = async (offset, limit) => {
    const users = await (0, axios_1.default)(`${db}?_sort=email&_start=${offset}&_limit=${limit}`);
    if (users.status !== 200) {
        throw new Error("Error fetching users");
    }
    const formatedUsers = users.data.map((user) => {
        return { id: user.id, email: user.email };
    });
    return formatedUsers;
};
exports.getUsers = getUsers;
// create user to db service/controller
const createUser = async (data) => {
    const users = await (0, axios_1.default)(db);
    if (users.status !== 200) {
        throw new Error("Error fetching users");
    }
    const findEmail = users.data.find((user) => user.email === data.email);
    if (findEmail) {
        throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    const newUser = {
        ...data,
        password: hashedPassword,
        id: generateShortId(),
    };
    const response = await axios_1.default.post(db, newUser);
    if (response.status !== 201) {
        throw new Error("Error creating user");
    }
    return newUser.id;
};
exports.createUser = createUser;
const getUserById = async (id) => {
    const user = await (0, axios_1.default)(`${db}/${id}`);
    if (user.status !== 200) {
        throw new Error("No user found for searched id");
    }
    const formatedUser = {
        id: user.data.id,
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        email: user.data.email,
        company: user.data.company,
    };
    return formatedUser;
};
exports.getUserById = getUserById;
const loginUser = async (email, password) => {
    const result = await (0, axios_1.default)(`${db}/?email=${email}`);
    if (result.status !== 200) {
        throw new Error("No user found for searched email");
    }
    const user = result.data[0];
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    // Generate token in the required format
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
    }, "tajny_klic", { algorithm: "HS256" });
    return token;
};
exports.loginUser = loginUser;
