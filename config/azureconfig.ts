/*

COLLECTION_NAME='mypdf-vectors'
TEMPERATURE=0.0
# This doesn't seem to work
# AZURE_OPENAI_BASE=
AZURE_OPENAI_KEY=XYZAPIKEY
AZURE_OPENAI_TYPE=azure
# Try also: 2023-03-15-preview
AZURE_OPENAI_VERSION=2023-06-01-preview
AZURE_OPENAI_DEPLOYMENT=MYDEPLOYMENT_NAME
AZURE_OPENAI_MODEL=gpt-35-turbo
AZURE_OPENAI_INSTANCE=MYINSTANCE_NAME

*/
if (!process.env.COLLECTION_NAME) {
    throw new Error('Missing ChromaDB COLLECTION_NAME in .env file');
}
const COLLECTION_NAME = process.env.COLLECTION_NAME ?? '';

if (!process.env.TEMPERATURE) {
    throw new Error('Missing ChromaDB TEMPERATURE in .env file');
}
const TEMPERATURE = process.env.TEMPERATURE;

if (!process.env.AZURE_OPENAI_KEY) {
    throw new Error('Missing ChromaDB AZURE_OPENAI_KEY in .env file');
}
const AZURE_OPENAI_KEY = process.env.AZURE_OPENAI_KEY;

if (!process.env.AZURE_OPENAI_TYPE) {
    throw new Error('Missing ChromaDB AZURE_OPENAI_TYPE in .env file');
}
const AZURE_OPENAI_TYPE = process.env.AZURE_OPENAI_TYPE;

if (!process.env.AZURE_OPENAI_VERSION) {
    throw new Error('Missing ChromaDB AZURE_OPENAI_VERSION in .env file');
}
const AZURE_OPENAI_VERSION = process.env.AZURE_OPENAI_VERSION;

if (!process.env.AZURE_OPENAI_DEPLOYMENT) {
    throw new Error('Missing ChromaDB AZURE_OPENAI_DEPLOYMENT in .env file');
}
const AZURE_OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT;

if (!process.env.AZURE_OPENAI_MODEL) {
    throw new Error('Missing ChromaDB AZURE_OPENAI_MODEL in .env file');
}
const AZURE_OPENAI_MODEL = process.env.AZURE_OPENAI_MODEL;

if (!process.env.AZURE_OPENAI_INSTANCE) {
    throw new Error('Missing ChromaDB AZURE_OPENAI_INSTANCE in .env file');
}
const AZURE_OPENAI_INSTANCE = process.env.AZURE_OPENAI_INSTANCE;
export { 
    COLLECTION_NAME,
    TEMPERATURE,
    AZURE_OPENAI_KEY,
    AZURE_OPENAI_TYPE,
    AZURE_OPENAI_VERSION,
    AZURE_OPENAI_DEPLOYMENT,
    AZURE_OPENAI_MODEL,
    AZURE_OPENAI_INSTANCE,
};