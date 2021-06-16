import axios from 'axios';
import { MediaContent } from '@/utils/media_content';

const BACKEND_URL = 'http://localhost:8081';

// Ping the backend for the updated content
export const getMedia = async (
  media: string,
  query: string
): Promise<MediaContent> => {
  return await axios
    .create({
      baseURL: BACKEND_URL
    })
    .get(`/${media}/${query}`);
};
