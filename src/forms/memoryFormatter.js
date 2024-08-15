import { uid } from "uid";

export function formatMemory( title, date, description, photos ) {
    return {
      title: title,
      date: date,
      id: uid(16),
      description,
      photos: photos.filter(photo => photo.trim() !== ''), // Remove empty photo URLs,
      coverPhoto: photos.length > 0 ? photos[0] : ''
    };
}
  