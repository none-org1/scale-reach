import { useState } from "react";
import Modal from "@/components/Modal";
import { Upload, Link as LinkIcon, Film } from "lucide-react";

export default function UploadForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-accent hover:bg-accent-hover text-on-accent px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition text-sm"
      >
        <Upload size={18} />
        New Project
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload Video">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted">Source URL or File</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Paste YouTube, Twitch, or Drive URL..."
                className="w-full bg-bg border border-border-input rounded-lg py-3 pl-4 pr-10 focus:outline-none focus:border-accent transition"
              />
              <LinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            </div>
          </div>

          <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-text-muted hover:border-accent/50 transition">
            <Film size={32} />
            <p className="text-sm">Drag and drop video files here or click to browse</p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text transition"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-accent text-on-accent rounded-lg text-sm font-semibold hover:bg-accent-hover transition">
              Process Video
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
