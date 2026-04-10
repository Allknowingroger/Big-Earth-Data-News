import { useState, useEffect, useCallback } from 'react';
import { Newspaper, RefreshCw } from 'lucide-react';

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
}

interface RssColumnProps {
  title: string;
  url: string;
  key?: string;
}

export default function RssColumn({ title, url }: RssColumnProps) {
  const [items, setItems] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRss = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.status !== 'ok') {
        throw new Error(`RSS2JSON error: ${data.message}`);
      }
      const items = data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
      }));
      setItems(items);
    } catch (err) {
      setError(`Failed to load feed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchRss();
  }, [fetchRss]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
          <Newspaper className="w-6 h-6 text-blue-600" />
          {title}
        </h2>
        <button onClick={fetchRss} className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Refresh">
          <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      {loading && <p className="text-gray-500 animate-pulse">Loading...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ul className="space-y-4 flex-grow overflow-y-auto">
        {items.map((item, index) => (
          <li key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 font-medium block leading-tight">
              {item.title}
            </a>
            <p className="text-xs text-gray-400 mt-1">{new Date(item.pubDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
