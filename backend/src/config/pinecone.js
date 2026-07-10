import { Pinecone } from "@pinecone-database/pinecone";
import config from "./config.js";

const pinecone = new Pinecone({
    apiKey: config.PINECONE_API_KEY,
});

if (!config.PINECONE_INDEX) {
    throw new Error("PINECONE_INDEX is not defined in environment variables");
}

const baseIndex = pinecone.index({
    name: config.PINECONE_INDEX,
    ...(config.PINECONE_HOST ? { host: config.PINECONE_HOST } : {}),
});

export const pineconeIndex = config.PINECONE_NAMESPACE
    ? baseIndex.namespace(config.PINECONE_NAMESPACE)
    : baseIndex;

export default pinecone;