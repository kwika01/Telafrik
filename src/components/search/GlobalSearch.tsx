import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GlobalSearchProps {
  size?: 'default' | 'lg';
  placeholder?: string;
}

const GlobalSearch = ({ size = 'default', placeholder = 'Search companies, investors, founders...' }: GlobalSearchProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const sizeClasses = {
    default: 'h-11 text-sm',
    lg: 'h-14 text-base',
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className={`text-muted-foreground ${size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`w-full ${sizeClasses[size]} pl-11 pr-4 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-border bg-muted px-2 text-xs text-muted-foreground">
          ⌘K
        </kbd>
      </div>
    </form>
  );
};

export default GlobalSearch;
