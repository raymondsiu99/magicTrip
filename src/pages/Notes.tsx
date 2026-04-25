import React, { useState } from 'react';
import { useTripStore } from '../store/useTripStore';
import { jsPDF } from 'jspdf';
import { CheckSquare, Square, Download, FileText, Package } from 'lucide-react';

export function Notes() {
  const { notes, updateNotes, packingList, addPackingItem, togglePackingItem, itinerary } = useTripStore();
  const [newPackItem, setNewPackItem] = useState('');
  const [activeTab, setActiveTab] = useState<'packing' | 'journal'>('packing');

  const handleAddPackItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackItem) return;
    addPackingItem(newPackItem);
    setNewPackItem('');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("TripFlow: Japan & Korea 2026", 20, 20);
    
    doc.setFontSize(14);
    doc.text("Packing List:", 20, 40);
    let yPos = 50;
    packingList.forEach((item) => {
      doc.setFontSize(12);
      doc.text(`[${item.done ? 'X' : ' '}] ${item.text}`, 20, yPos);
      yPos += 10;
    });

    yPos += 10;
    doc.setFontSize(14);
    doc.text("Journal Notes:", 20, yPos);
    yPos += 10;
    doc.setFontSize(12);
    
    const splitNotes = doc.splitTextToSize(notes, 170);
    doc.text(splitNotes, 20, yPos);

    doc.save("trip-notes.pdf");
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ notes, packingList, itinerary }));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "trip-backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-7.5rem)] animate-in fade-in duration-300">
      
      {/* Tabs */}
      <div className="flex bg-muted p-1 rounded-xl mb-4 shrink-0">
        <button 
          onClick={() => setActiveTab('packing')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex justify-center items-center gap-2 ${activeTab === 'packing' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
        >
          <Package className="w-4 h-4" /> Packing List
        </button>
        <button 
          onClick={() => setActiveTab('journal')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex justify-center items-center gap-2 ${activeTab === 'journal' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
        >
          <FileText className="w-4 h-4" /> Journal
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 bg-card border border-border rounded-xl shadow-sm">
        {activeTab === 'packing' ? (
          <div className="p-4 flex flex-col h-full">
            <h3 className="font-semibold mb-3">Essentials & Gear</h3>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2">
              {packingList.length === 0 && (
                <p className="text-sm text-muted-foreground italic text-center mt-4">Your packing list is empty.</p>
              )}
              {packingList.map(item => (
                <div key={item.id} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                  <button onClick={() => togglePackingItem(item.id)} className="text-primary mt-0.5 shrink-0">
                    {item.done ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 opacity-50" />}
                  </button>
                  <span className={`text-sm ${item.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleAddPackItem} className="flex gap-2 pt-3 border-t border-border shrink-0">
              <input 
                type="text" 
                placeholder="Add item (e.g. Passport, JR Pass)..." 
                value={newPackItem}
                onChange={(e) => setNewPackItem(e.target.value)}
                className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm">Add</button>
            </form>
          </div>
        ) : (
          <div className="p-4 flex flex-col h-full">
            <h3 className="font-semibold mb-3">Travel Journal</h3>
            <textarea
              value={notes}
              onChange={(e) => updateNotes(e.target.value)}
              placeholder="Write your thoughts, reminders, or daily diary here..."
              className="flex-1 w-full bg-background border border-border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        )}
      </div>

      {/* Export Actions */}
      <div className="mt-4 grid grid-cols-2 gap-3 shrink-0">
        <button 
          onClick={exportPDF}
          className="bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 text-secondary-foreground py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <FileText className="w-4 h-4" /> Export PDF
        </button>
        <button 
          onClick={exportJSON}
          className="bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4" /> Backup Data
        </button>
      </div>

    </div>
  );
}
