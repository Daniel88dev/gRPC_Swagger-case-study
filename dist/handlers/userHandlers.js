"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHandlers = void 0;
const userServices_1 = require("../services/userServices");
const try_catch_1 = require("../util/try-catch");
exports.userHandlers = {
    GetUsers: async (call, callback) => {
        try {
            const { offset, limit } = call.request;
            if (!offset || isNaN(offset) || offset < 0) {
                callback(new Error("Invalid offset"));
                return;
            }
            if (!limit ||
                isNaN(limit) ||
                (limit !== 5 && limit !== 10 && limit !== 25)) {
                callback(new Error("Invalid limit. Only 5, 10, and 25 are allowed"));
                return;
            }
            const { data: users, error: userError } = await (0, try_catch_1.tryCatch)((0, userServices_1.getUsers)(offset, limit));
            if (userError) {
                callback(new Error(userError.message));
                return;
            }
            callback(null, { users });
        }
        catch (err) {
            callback(new Error(err.message));
        }
    },
    CreateUser: async (call, callback) => {
        try {
            const { firstName, lastName, password, email, company } = call.request;
            if (!firstName || !lastName || !password || !email || !company) {
                callback(new Error("Invalid request"));
                return;
            }
            const { data: id, error } = await (0, try_catch_1.tryCatch)((0, userServices_1.createUser)({ firstName, lastName, company, email, password }));
            if (error) {
                callback(new Error(error.message));
                return;
            }
            callback(null, { id });
        }
        catch (err) {
            callback(new Error(err.message));
        }
    },
    GetUserById: async (call, callback) => {
        try {
            const { id } = call.request;
            if (!id) {
                callback(new Error("Invalid id"));
                return;
            }
            const { data: user, error: userError } = await (0, try_catch_1.tryCatch)((0, userServices_1.getUserById)(id));
            if (userError) {
                callback(new Error("User not found"));
                return;
            }
            console.log(user);
            callback(null, { ...user });
        }
        catch (err) {
            callback(new Error(err.message));
        }
    },
    LoginUser: async (call, callback) => {
        try {
            const { email, password } = call.request;
            if (!email || !password) {
                callback(new Error("Invalid email or password"));
                return;
            }
            const { data: token, error: tokenError } = await (0, try_catch_1.tryCatch)((0, userServices_1.loginUser)(email, password));
            if (tokenError) {
                callback(new Error(tokenError.message));
                return;
            }
            if (!token) {
                callback(new Error("Invalid email or password"));
                return;
            }
            callback(null, { token });
        }
        catch (err) {
            callback(new Error(err.message));
        }
    },
};
