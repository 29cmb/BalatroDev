import { Client, Databases } from 'node-appwrite';

const endpoint: string = process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const project: string = process.env.APPWRITE_PROJECT || "";
const key: string = process.env.APPWRITE_API_KEY || "";

const databaseID: string = process.env.APPWRITE_DATABASE_ID || "";
const guidesCollection: string = process.env.APPWRITE_GUIDES_COLLECTION || "";

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project)
    .setKey(key);

const databases = new Databases(client);

const getGuides = () => {
    return databases.listDocuments(databaseID, guidesCollection);
}

const getGuide = (id: string) => {
    return databases.getDocument(databaseID, guidesCollection, id);
}

export { 
    getGuides,
    getGuide
};