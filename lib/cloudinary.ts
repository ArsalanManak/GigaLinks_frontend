const CLOUDINARY_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD || "your-cloud-name";
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload`;

export function cloudinaryURL(publicId: string, opts: string = "") {
  if (!publicId) return "";
  // opts can hold transformation strings like "c_fill,w_1200,h_600"
  const t = opts ? `${opts}/` : "";
  return `${CLOUDINARY_BASE}/${t}${publicId}`;
}

export default cloudinaryURL;
