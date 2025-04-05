import { loadSync } from "@grpc/proto-loader";
import {
  Server,
  ServerCredentials,
  loadPackageDefinition,
} from "@grpc/grpc-js";
import path from "node:path";

// Load proto definition
const PROTO_PATH = path.join(__dirname, "/proto/user.proto");
const protoDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = loadPackageDefinition(protoDefinition) as any;
const userProto = proto.user;

const server = new Server();

const PORT = "0.0.0.0:8081";

server.bindAsync(PORT, ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error("gRPC server error: ", err);
    return;
  }
  console.log(`gRPC server running at ${PORT}`);
});
