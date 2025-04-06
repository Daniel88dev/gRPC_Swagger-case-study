import { loadSync } from "@grpc/proto-loader";
import {
  Server,
  ServerCredentials,
  loadPackageDefinition,
} from "@grpc/grpc-js";
import path from "node:path";
import { userHandlers } from "./handlers/userHandlers";
import { ProtoGrpcType } from "./proto/user";

// Load proto definition
const PROTO_PATH = path.join(__dirname, "/proto/user.proto");
const protoDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Loading package definition.
const proto = loadPackageDefinition(protoDefinition) as any as ProtoGrpcType;
export const userProto = proto.user;

const server = new Server();

server.addService(proto.user.UserService.service, userHandlers);

const PORT = "0.0.0.0:8081";

server.bindAsync(PORT, ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error("gRPC server error: ", err);
    return;
  }
  console.log(`gRPC server running at ${PORT}`);
});
