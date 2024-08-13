import { uid } from "uid";

export function formatMemory({ name, date, description, photos }) {
    return {
      name,
      date: new Date(date).toISOString(), // Format the date as ISO string
      id: uid(16),
      description,
      photos: photos.filter(photo => photo.trim() !== ''), // Remove empty photo URLs,
      coverPhoto: photos.length > 0 ? photos[0] : ''
    };
}
  