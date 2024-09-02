import { uploadFile } from '@/actions/uploadFile';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const file = req.files.file;
      const folder = req.body.folder;
      const response = await uploadFile(file.path, folder);
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to upload file' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
