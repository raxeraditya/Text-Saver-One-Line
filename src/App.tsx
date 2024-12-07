import React from 'react';
import { TextInput } from './components/TextInput';
import { TextList } from './components/TextList';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useTexts } from './hooks/useTexts';
import { ScrollText } from 'lucide-react';

function App() {
  const { texts, isLoading, error, saveText } = useTexts();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8">
            <ScrollText className="text-blue-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Text Saver</h1>
          </div>
          
          {error && <ErrorMessage message={error} />}
          <TextInput onSave={saveText} />
          {isLoading ? <LoadingSpinner /> : <TextList items={texts} />}
        </div>
      </div>
    </div>
  );
}

export default App;