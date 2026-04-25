import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { X, Search } from 'lucide-react';

interface YouTubeModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
}

export function YouTubeModal({ isOpen, onClose, searchQuery }: YouTubeModalProps) {
  const [videoId, setVideoId] = useState<string>('');
  const [inputUrl, setInputUrl] = useState('');

  if (!isOpen) return null;

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractVideoId(inputUrl);
    if (id) {
      setVideoId(id);
    } else {
      alert("Invalid YouTube URL");
    }
  };

  const handleQuickSearch = () => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-card w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h3 className="font-semibold text-lg">Watch Video</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          {videoId ? (
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <YouTube 
                videoId={videoId} 
                opts={{ width: '100%', height: '100%', playerVars: { autoplay: 1 } }} 
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4 text-muted-foreground text-sm flex-col gap-2">
              <Search className="w-8 h-8 opacity-50" />
              <p>No video selected</p>
            </div>
          )}

          <form onSubmit={handleUrlSubmit} className="flex gap-2 mb-4">
            <input 
              type="text" 
              placeholder="Paste YouTube URL here..." 
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
            />
            <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
              Load
            </button>
          </form>

          <button 
            onClick={handleQuickSearch}
            className="w-full flex items-center justify-center gap-2 bg-secondary/20 text-secondary-foreground py-3 rounded-lg text-sm font-medium hover:bg-secondary/30 transition-colors"
          >
            <Search className="w-4 h-4" />
            Quick YouTube Search: "{searchQuery}"
          </button>
        </div>
      </div>
    </div>
  );
}
