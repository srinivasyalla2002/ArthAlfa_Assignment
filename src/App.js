import React, { useState, useEffect } from 'react';
import './App.css';

const TextEditor: React.FC = () => {
  const [text, setText] = useState('');
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const wordsArray = text.match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(wordsArray.map(word => word.toLowerCase()));

    setWordCount(wordsArray.length);
    setUniqueWordCount(uniqueWords.size);

    const characters = text.replace(/\s+/g, '').replace(/[^\w]/g, '');
    setCharCount(characters.length);
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleReplace = () => {
    if (searchString.trim()) {
      const newText = text.replaceAll(searchString, replaceString);
      setText(newText);
    }
  };

  return (
    <div className="container">
      <h1>Text Editor with Real-time Statistics</h1>
      <textarea
        className="textarea"
        value={text}
        onChange={handleTextChange}
        placeholder="Type or paste your text here..."
      ></textarea>
      <div className="statistics">
        <p>Word Count: {wordCount}</p>
        <p>Unique Word Count: {uniqueWordCount}</p>
        <p>Character Count (Excluding Spaces and Punctuation): {charCount}</p>
      </div>

      <div className="replace-section">
        <input
          type="text"
          className="input-field"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search word"
        />
        <input
          type="text"
          className="input-field"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
          placeholder="Replace with"
        />
        <button className="replace-button" onClick={handleReplace}>
          Replace All
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
