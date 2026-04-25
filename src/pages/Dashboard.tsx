import React, { useState } from 'react';
import { useTripStore } from '../store/useTripStore';
import { differenceInDays, parseISO } from 'date-fns';
import { Wallet, Plane, Ship, Hotel, ChevronRight, Plus } from 'lucide-react';

export function Dashboard() {
  const { itinerary, budget, expenses, addExpense } = useTripStore();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDesc, setExpenseDesc] = useState('');

  const startDate = parseISO(itinerary[0].date);
  const daysUntil = differenceInDays(startDate, new Date());
  
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = budget - totalSpent;

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseAmount || !expenseDesc) return;
    
    addExpense({
      date: new Date().toISOString(),
      amount: parseFloat(expenseAmount),
      description: expenseDesc
    });
    setExpenseAmount('');
    setExpenseDesc('');
    setShowAddExpense(false);
  };

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-300">
      {/* Countdown Card */}
      <div className="bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <h2 className="text-sm font-medium opacity-90 uppercase tracking-wider mb-1">Next Adventure</h2>
        <div className="text-4xl font-bold mb-2">{daysUntil > 0 ? `${daysUntil} Days` : 'It\'s Time!'}</div>
        <p className="text-sm opacity-80">Japan & South Korea 2026</p>
      </div>

      {/* Budget Tracker */}
      <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Wallet className="w-5 h-5 text-secondary" />
            Budget Tracker
          </h3>
          <button 
            onClick={() => setShowAddExpense(!showAddExpense)}
            className="text-primary hover:bg-primary/10 p-1 rounded-full transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        {showAddExpense && (
          <form onSubmit={handleAddExpense} className="mb-4 space-y-3 bg-muted p-3 rounded-lg animate-in slide-in-from-top-2">
            <input 
              type="number" 
              placeholder="Amount (CND$)" 
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
            />
            <input 
              type="text" 
              placeholder="Description" 
              value={expenseDesc}
              onChange={(e) => setExpenseDesc(e.target.value)}
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
            />
            <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded text-sm font-medium">Add Expense</button>
          </form>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Remaining</span>
            <span className="font-bold text-lg">CND${remainingBudget.toFixed(2)}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="bg-secondary h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.min((totalSpent / budget) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Spent: ${totalSpent.toFixed(2)}</span>
            <span>Total: ${budget.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-3">
        <h3 className="font-semibold px-1">Quick Links</h3>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center p-4 bg-card border border-border rounded-xl shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
            <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary">
              <Hotel className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">Accommodations</h4>
              <p className="text-xs text-muted-foreground">4 Hotels Booked</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="flex items-center p-4 bg-card border border-border rounded-xl shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
            <div className="bg-secondary/20 p-3 rounded-full mr-4 text-secondary-foreground">
              <Plane className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">Flights</h4>
              <p className="text-xs text-muted-foreground">Kansai → Fukuoka, Busan → Tokyo</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>

          <div className="flex items-center p-4 bg-card border border-border rounded-xl shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
            <div className="bg-blue-500/10 p-3 rounded-full mr-4 text-blue-600 dark:text-blue-400">
              <Ship className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">Ferry Tickets</h4>
              <p className="text-xs text-muted-foreground">Camellia Line (Fukuoka → Busan)</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
