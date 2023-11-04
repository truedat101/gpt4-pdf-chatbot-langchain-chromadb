import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Chroma } from 'langchain/vectorstores/chroma';
// import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import {
  JSONLoader,
  JSONLinesLoader,
} from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
import { 
  COLLECTION_NAME,
  TEMPERATURE,
  AZURE_OPENAI_KEY,
  AZURE_OPENAI_TYPE,
  AZURE_OPENAI_VERSION,
  AZURE_OPENAI_DEPLOYMENT,
  AZURE_OPENAI_MODEL,
  AZURE_OPENAI_INSTANCE,
} from '@/config/azureconfig';
/* Name of directory to retrieve your files from */
const filePath = 'docs';

export const run = async () => {
  try {
    const directoryLoader = new DirectoryLoader(filePath, {
      '.pdf': (path) => new PDFLoader(path),
      '.docx': (path) => new DocxLoader(path),
      '.json': (path) => new JSONLoader(path, "/texts"),
      '.jsonl': (path) => new JSONLinesLoader(path, "/html"),
      '.txt': (path) => new TextLoader(path),
      '.csv': (path) => new CSVLoader(path, "text"),
      '.htm': (path) => new UnstructuredLoader(path),
      '.html': (path) => new UnstructuredLoader(path),
      '.ppt': (path) => new UnstructuredLoader(path),
      '.pptx': (path) => new UnstructuredLoader(path),
    });

    const rawDocs = await directoryLoader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);

    console.log('creating vector store...');

    //const embedder = new OpenAIEmbeddings({ maxConcurrency: 1 });
    // XXX
    // const embedder = new OpenAIEmbeddings();
    let config = {
      batchSize: 512,
      azureOpenAIApiKey: AZURE_OPENAI_KEY,
      azureOpenAIApiInstanceName: AZURE_OPENAI_INSTANCE,
      azureOpenAIApiDeploymentName: AZURE_OPENAI_DEPLOYMENT,
      // azureOpenAIApiDeploymentName: 'gpt35turbodeploymentdev1',
      azureOpenAIApiVersion: AZURE_OPENAI_VERSION,
      // azureOpenAIApiVersion: '2022-12-01',
      // azureOpenAIBasePath: 'https://XYZ.openai.azure.com/openai/deployments/',
      modelName: AZURE_OPENAI_MODEL,
      chunkSize: 1000
    };
    const embedder = new OpenAIEmbeddings(config);
    
    await Chroma.fromDocuments(docs, embedder, {
      collectionName: process.env.COLLECTION_NAME,
    });
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();
