import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { GoldButton } from '../ui/GoldButton';

interface MediaUploaderProps {
  onUploadSuccess: () => void;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'image',
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const uploadFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) return;

    setLoading(true);
    try {
      const fileName = `${Date.now()}-${formData.file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('session-media')
        .upload(fileName, formData.file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('session-media')
        .getPublicUrl(fileName);

      await supabase.from('session_media').insert({
        title: formData.title,
        description: formData.description,
        type: formData.type,
        storage_path: fileName,
        public_url: urlData.publicUrl,
        is_published: false,
      });

      setFormData({ title: '', description: '', type: 'image', file: null });
      onUploadSuccess();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={uploadFile} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border rounded text-sm"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <select
          className="p-2 border rounded text-sm"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="image">Image</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>
      </div>
      <textarea
        placeholder="Description"
        className="p-2 border rounded text-sm"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <input
        type="file"
        className="text-xs"
        onChange={handleFileChange}
        required
      />
      <GoldButton type="submit" className="w-fit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Media'}
      </GoldButton>
    </form>
  );
};
