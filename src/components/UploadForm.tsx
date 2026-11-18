import { useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { Upload, Link as LinkIcon, Film, CheckCircle } from "lucide-react";

export default function UploadForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = () => {
    if (!url) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsModalOpen(false);
      setUrl("");
    }, 2500);
  };

  return (
    <>
      <Button variant="primary" size="md" icon={<Upload size={18} />}>
        New Project
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          if (!isProcessing) setIsModalOpen(false);
        }}
        title="Upload Video"
        description="Paste a URL or drop a file to start repurposing."
        footer={
          <>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsModalOpen(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              loading={isProcessing}
              onClick={handleSubmit}
              disabled={!url}
            >
              {isProcessing ? "Processing..." : "Process Video"}
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Source URL or File</label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube, Twitch, or Drive URL..."
                className="w-full bg-bg border border-border-input rounded-lg py-3 pl-4 pr-10 text-sm focus:outline-none focus:border-accent transition"
              />
              <LinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            </div>
          </div>

          <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-text-muted hover:border-accent/50 transition cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-surface-hover flex items-center justify-center">
              <Film size={28} className="text-accent" />
            </div>
            <p className="text-sm">Drag and drop video files here or click to browse</p>
            <p className="text-xs text-text-muted">Supports MP4, MOV, WebM up to 2GB</p>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 flex items-start gap-2">
            <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <p className="text-xs text-text-muted">
              Your video will be processed privately. We never store your content after processing.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}