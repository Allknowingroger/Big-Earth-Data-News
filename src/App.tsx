/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import RssColumn from './components/RssColumn';

export default function App() {
  const feeds = [
    { title: 'Space', url: 'https://bigearthdata.ai/rss/spacerss.xml' },
    { title: 'Technology', url: 'https://bigearthdata.ai/rss/technologyrss.xml' },
    { title: 'AI', url: 'https://bigearthdata.ai/rss/airss.xml' },
    { title: 'Science', url: 'https://bigearthdata.ai/rss/sciencerss.xml' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Big Earth Data News
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest insights from our research feeds.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {feeds.map((feed) => (
          <RssColumn key={feed.url} title={feed.title} url={feed.url} />
        ))}
      </div>
    </div>
  );
}
