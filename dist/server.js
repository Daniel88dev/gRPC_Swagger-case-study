"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProto = void 0;
const proto_loader_1 = require("@grpc/proto-loader");
const grpc_js_1 = require("@grpc/grpc-js");
const node_path_1 = __importDefault(require("node:path"));
const userHandlers_1 = require("./handlers/userHandlers");
// Load proto definition
const PROTO_PATH = node_path_1.default.join(__dirname, "/proto/user.proto");
const protoDefinition = (0, proto_loader_1.loadSync)(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
// Loading package definition.
const proto = (0, grpc_js_1.loadPackageDefinition)(protoDefinition);
exports.userProto = proto.user;
const server = new grpc_js_1.Server();
server.addService(proto.user.UserService.service, userHandlers_1.userHandlers);
const PORT = "0.0.0.0:8081";
server.bindAsync(PORT, grpc_js_1.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error("gRPC server error: ", err);
        return;
    }
    console.log(`gRPC server running at ${PORT}`);
});
