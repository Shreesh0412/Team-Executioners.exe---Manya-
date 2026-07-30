import { useEffect, useState } from "react";
import {
  getFolders,
  createFolder,
  renameFolder,
  deleteFolder,
} from "../services/folder";
import { Folder } from "../types/folder";

export const useFolders = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const data = await getFolders();
      setFolders(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load folders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const addFolder = async (name: string) => {
    const folder = await createFolder({ name });

    setFolders((prev) => [...prev, folder]);
  };

  const updateFolder = async (id: number, name: string) => {
    const updated = await renameFolder(id, { name });

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? updated : folder
      )
    );
  };

  const removeFolder = async (id: number) => {
    await deleteFolder(id);

    setFolders((prev) =>
      prev.filter((folder) => folder.id !== id)
    );
  };

  return {
    folders,
    loading,
    error,
    refresh: fetchFolders,
    addFolder,
    updateFolder,
    removeFolder,
  };
};