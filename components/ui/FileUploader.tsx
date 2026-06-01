import React, { useState } from "react";
import { uploadFile } from "../../lib/upload";

export default function FileUploader({ onUploaded }: { onUploaded?: (url: string) => void }) {
  const [loading, setLoading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setLoading(true);
    try {
      const res = await uploadFile(f);
      onUploaded?.(res.url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFile} />
      {loading && <div className="text-sm text-gray-500">Uploading...</div>}
    </div>
  );
}
