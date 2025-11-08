import React from 'react';
import { Train } from 'lucide-react';

export const ApiKeyInput = ({ apiKey, setApiKey, setShowApiInput }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center gap-2 mb-4">
          <Train className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold">日本首都圏電鉄地図</h1>
        </div>
        <p className="text-gray-600 mb-4">
          Google Maps APIキーを入力してください。
        </p>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Google Maps API Key"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-500 mb-4">
          APIキーは{' '}
          <a
            href="https://developers.google.com/maps/documentation/javascript/get-api-key"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Google Cloud Console
          </a>
          で発行できます。
        </p>
        <button
          onClick={() => {
            if (apiKey.trim()) {
              setShowApiInput(false);
            } else {
              alert('APIキーを入力してください。');
            }
          }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          開始
        </button>
      </div>
    </div>
  );
};
