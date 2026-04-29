import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";

const CONTAINER_NAME = "magictrip";
const BLOB_NAME = "trip-data.json";

function getStorageClient(): BlobServiceClient {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!connectionString) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not configured");
  }
  return BlobServiceClient.fromConnectionString(connectionString);
}

async function streamToString(readable: NodeJS.ReadableStream): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(Buffer.from(chunk as Buffer));
  }
  return Buffer.concat(chunks).toString("utf-8");
}

// GET /api/itinerary — load trip data from blob storage
app.http("getItinerary", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "itinerary",
  handler: async (
    _request: HttpRequest,
    context: InvocationContext
  ): Promise<HttpResponseInit> => {
    try {
      const client = getStorageClient();
      const containerClient = client.getContainerClient(CONTAINER_NAME);

      const containerExists = await containerClient.exists();
      if (!containerExists) {
        return { status: 404, jsonBody: { error: "No saved trip data found" } };
      }

      const blobClient = containerClient.getBlobClient(BLOB_NAME);
      const blobExists = await blobClient.exists();
      if (!blobExists) {
        return { status: 404, jsonBody: { error: "No saved trip data found" } };
      }

      const download = await blobClient.download();
      const content = await streamToString(download.readableStreamBody!);

      return {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: content,
      };
    } catch (error) {
      context.error("Error loading trip data:", error);
      return { status: 500, jsonBody: { error: "Failed to load trip data" } };
    }
  },
});

// POST /api/itinerary — save trip data to blob storage
app.http("saveItinerary", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "itinerary",
  handler: async (
    request: HttpRequest,
    context: InvocationContext
  ): Promise<HttpResponseInit> => {
    try {
      const body = await request.json();
      if (!body || typeof body !== "object") {
        return { status: 400, jsonBody: { error: "Invalid request body" } };
      }

      const client = getStorageClient();
      const containerClient = client.getContainerClient(CONTAINER_NAME);
      await containerClient.createIfNotExists();

      const blobClient = containerClient.getBlockBlobClient(BLOB_NAME);
      const content = JSON.stringify({ ...body, savedAt: new Date().toISOString() });

      await blobClient.upload(Buffer.from(content), Buffer.byteLength(content), {
        blobHTTPHeaders: { blobContentType: "application/json" },
      });

      return { status: 200, jsonBody: { success: true } };
    } catch (error) {
      context.error("Error saving trip data:", error);
      return { status: 500, jsonBody: { error: "Failed to save trip data" } };
    }
  },
});
