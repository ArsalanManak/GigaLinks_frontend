import api from "./api";

export async function uploadFile(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await api.post("/media/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}
