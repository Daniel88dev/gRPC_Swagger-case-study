"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userClient = void 0;
const path_1 = __importDefault(require("path"));
const grpc_js_1 = require("@grpc/grpc-js");
const proto_loader_1 = require("@grpc/proto-loader");
const PROTO_PATH = path_1.default.join(__dirname, "./proto/user.proto");
const packageDefinition = (0, proto_loader_1.loadSync)(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const protoDescriptor = (0, grpc_js_1.loadPackageDefinition)(packageDefinition);
const userPackage = protoDescriptor.user;
exports.userClient = new userPackage.UserService("localhost:8081", grpc_js_1.credentials.createInsecure());
