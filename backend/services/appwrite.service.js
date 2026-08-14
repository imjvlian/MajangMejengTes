import { storage, bucketId } from "../config/appwrite.js";

export const deleteAppwriteFile = async (fileId) => {
  if (!fileId) return;

  try {
    await storage.deleteFile(bucketId, fileId);
    console.log(`Deleted Appwrite file ${fileId}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMultipleFiles = async (fileIds = []) => {
  for (const id of fileIds) {
    await deleteAppwriteFile(id);
  }
};