import React, { useState, useEffect, useRef } from 'react';
import { useTripStore } from '../store/useTripStore';
import { format, parseISO } from 'date-fns';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MapPin, CheckCircle, Circle, GripVertical, Video, Plus } from 'lucide-react';
import { pois } from '../data';
import { YouTubeModal } from '../components/ui/YouTubeModal';
import { useLocalise } from '../lib/utils';

export function Itinerary() {
  const { itinerary, updateDay, completedItems, toggleCompletedItem } = useTripStore();
  const [selectedDate, setSelectedDate] = useState<string>(itinerary[0].date);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [newItemText, setNewItemText] = useState('');
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const L = useLocalise();

  const currentDay = itinerary.find(d => d.date === selectedDate) || itinerary[0];
  
  // Combine POIs and custom items for drag and drop
  const getListItems = () => {
    const items: Array<{ id: string, type: 'poi' | 'custom', content: any }> = [];
    currentDay.pois.forEach((poiId: number, index: number) => {
      const poi = pois.find(p => p.id === poiId);
      if (poi) items.push({ id: `poi-${poiId}-${index}`, type: 'poi', content: poi });
    });
    currentDay.customItems.forEach((item, index: number) => {
      items.push({ id: `custom-${index}`, type: 'custom', content: item });
    });
    return items;
  };

  const [listItems, setListItems] = useState(getListItems());

  useEffect(() => {
    setListItems(getListItems());
  }, [selectedDate, itinerary]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(listItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setListItems(items);
    
    // Update store (simplified logic for this demo, just storing it back as separate arrays based on order)
    const newPois: number[] = [];
    const newCustom: string[] = [];
    
    items.forEach(item => {
      if (item.type === 'poi') newPois.push(item.content.id);
      if (item.type === 'custom') newCustom.push(item.content);
    });
    
    updateDay(selectedDate, { ...currentDay, pois: newPois, customItems: newCustom });
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText) return;
    
    updateDay(selectedDate, { 
      ...currentDay, 
      customItems: [...currentDay.customItems, newItemText] 
    });
    setNewItemText('');
  };

  const openVideo = (query: string) => {
    setCurrentSearchQuery(query);
    setVideoModalOpen(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7.5rem)] animate-in fade-in duration-300">
      {/* Date Selector / Interactive Calendar (Horizontal Scroll) */}
      <div className="bg-card border-b border-border shadow-sm py-3 px-2 z-10">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto hide-scrollbar gap-2 px-2 snap-x"
        >
          {itinerary.map((day) => {
            const isSelected = selectedDate === day.date;
            const dateObj = parseISO(day.date);
            return (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className={`flex flex-col items-center justify-center min-w-[4rem] p-2 rounded-xl snap-center transition-all ${
                  isSelected ? 'bg-primary text-primary-foreground shadow-md transform scale-105' : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                <span className="text-xs font-medium uppercase">{format(dateObj, 'EEE')}</span>
                <span className="text-lg font-bold">{format(dateObj, 'd')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Day Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-foreground">{L(currentDay.title)}</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {L(currentDay.city)}
            {currentDay.hotel && <span className="ml-2 bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full text-xs">{L(currentDay.hotel)}</span>}
          </p>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="day-items">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {listItems.map((item, index) => {
                  const isCompleted = completedItems[selectedDate]?.includes(item.id);
                  
                  return (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`bg-card border border-border p-3 rounded-xl shadow-sm flex items-start gap-3 transition-opacity ${isCompleted ? 'opacity-60' : ''}`}
                        >
                          <div {...provided.dragHandleProps} className="mt-1 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-5 h-5" />
                          </div>
                          
                          <button onClick={() => toggleCompletedItem(selectedDate, item.id)} className="mt-1 text-primary">
                            {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                          </button>
                          
                          <div className="flex-1 min-w-0">
                            {item.type === 'poi' ? (
                              <>
                                <h4 className={`font-semibold text-sm ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                  {L(item.content.name)}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{L(item.content.desc)}</p>
                                <button 
                                  onClick={() => openVideo(item.content.youtubeSearchQuery)}
                                  className="mt-2 text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded flex items-center gap-1 font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                >
                                  <Video className="w-3 h-3" /> Watch Video
                                </button>
                              </>
                            ) : (
                              <h4 className={`font-medium text-sm pt-0.5 ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                {L(item.content)}
                              </h4>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <form onSubmit={handleAddItem} className="flex gap-2 pt-2 border-t border-border mt-6">
          <input 
            type="text" 
            placeholder="Add new activity..." 
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
          />
          <button type="submit" className="bg-secondary text-secondary-foreground p-2 rounded-lg hover:bg-secondary/80 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </form>
      </div>

      <YouTubeModal 
        isOpen={videoModalOpen} 
        onClose={() => setVideoModalOpen(false)} 
        searchQuery={currentSearchQuery} 
      />
    </div>
  );
}
