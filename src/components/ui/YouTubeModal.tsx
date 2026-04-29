import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { X, Lock, Plus, Search, Video } from 'lucide-react';

interface YouTubeModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Stable key used to namespace user-added videos in the store, e.g. "poi-1" or "hotel-mitsui-ueno" */
  videoKey: string;
  /** Human-readable location title shown in the modal header */
  title: string;
  /** Curated default video IDs (language-aware, from data.ts). Cannot be removed. */
  defaultVideos: string[];
  /** User-added video IDs from the Zustand store */
  userVideos: string[];
  onAddVideo: (videoId: string) => void;
  onRemoveUserVideo: (videoId: string) => void;
}

export function YouTubeModal({
  isOpen,
  onClose,
  title,
  defaultVideos = [],
  userVideos = [],
  onAddVideo,
  onRemoveUserVideo,
}: YouTubeModalProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [addUrl, setAddUrl] = useState('');
  const [addError, setAddError] = useState('');

  const allVideos = [
    ...defaultVideos.map((id) => ({ id, isDefault: true })),
    ...userVideos.map((id) => ({ id, isDefault: false })),
  ];

  // Auto-select the first video if none selected yet and videos exist
  const displayId = activeVideoId ?? (allVideos.length > 0 ? allVideos[0].id : null);

  if (!isOpen) return null;

  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu\.be\/|[?&]v=|\/embed\/|\/v\/|\/e\/|watch\?v=|watch\?.+&v=)([^#&?]{11}).*/;
    const match = url.match(regExp);
    return match ? match[2] : null;
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');
    const trimmed = addUrl.trim();
    // Accept bare 11-char IDs as well as full URLs
    const id = trimmed.length === 11 && !/\s/.test(trimmed) ? trimmed : extractVideoId(trimmed);
    if (!id) {
      setAddError('Invalid YouTube URL or video ID');
      return;
    }
    if (defaultVideos.includes(id) || userVideos.includes(id)) {
      setAddError('This video is already in the list');
      return;
    }
    onAddVideo(id);
    setActiveVideoId(id);
    setAddUrl('');
  };

  const handleSearch = () => {
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' travel')}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-card w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          <div className="flex items-center gap-2 min-w-0">
            <Video className="w-4 h-4 text-red-500 shrink-0" />
            <h3 className="font-semibold text-base truncate">{title}</h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-1 rounded-full hover:bg-muted shrink-0 ml-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex flex-col gap-4">
          {/* Player */}
          {displayId ? (
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <YouTube
                videoId={displayId}
                opts={{ width: '100%', height: '100%', playerVars: { autoplay: 1 } }}
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm flex-col gap-2">
              <Video className="w-8 h-8 opacity-30" />
              <p>No videos yet — search or paste a URL below</p>
            </div>
          )}

          {/* Playlist thumbnails */}
          {allVideos.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wide">
                Videos ({allVideos.length})
              </p>
              <div className="grid grid-cols-3 gap-2">
                {allVideos.map(({ id, isDefault }) => (
                  <div key={id} className="relative group">
                    <button
                      onClick={() => setActiveVideoId(id)}
                      className={`w-full aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        (activeVideoId === id || (!activeVideoId && id === allVideos[0].id))
                          ? 'border-primary'
                          : 'border-transparent hover:border-muted-foreground'
                      }`}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
                        alt="video thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </button>
                    {isDefault ? (
                      <div
                        className="absolute top-1 right-1 bg-black/60 rounded p-0.5"
                        title="Default video (cannot be removed)"
                      >
                        <Lock className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          onRemoveUserVideo(id);
                          if (activeVideoId === id) setActiveVideoId(null);
                        }}
                        aria-label="Remove video"
                        className="absolute top-1 right-1 bg-black/60 rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add video */}
          <div className="border-t border-border pt-3">
            <p className="text-xs text-muted-foreground mb-1.5">Add a video link</p>
            <form onSubmit={handleAdd} className="flex gap-2">
              <input
                type="text"
                placeholder="Paste YouTube URL or video ID…"
                value={addUrl}
                onChange={(e) => {
                  setAddUrl(e.target.value);
                  setAddError('');
                }}
                className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
              />
              <button
                type="submit"
                aria-label="Add video"
                className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
            {addError && <p className="text-xs text-destructive mt-1">{addError}</p>}
          </div>

          {/* YouTube search fallback */}
          <button
            onClick={handleSearch}
            className="w-full flex items-center justify-center gap-2 bg-secondary/20 text-secondary-foreground py-2.5 rounded-lg text-sm font-medium hover:bg-secondary/30 transition-colors"
          >
            <Search className="w-4 h-4" />
            Search on YouTube
          </button>
        </div>
      </div>
    </div>
  );
}
