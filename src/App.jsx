import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
function App(){
  const [word,setWord]=useState(null);
  const [inputWord,setInputWord]=useState('');
  const [error,setError]=useState('');
  const fetchDictionary=async(query)=>{
    try{
      const {data}=await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
      setWord(data[0]);
      setError('');
    }catch(err){
      setError('Word not found. Please try another search.');
      setWord(null);
    }
  };
  const searchForWord=()=>{
    if(inputWord.trim()!==''){
      fetchDictionary(inputWord);
    }else{
      setError('Please enter a word to search.');
    }
  };
  return(
    <div className="container">
      <h1>Digital Dictionary</h1>
      <div className="inner-container">
        <input type="text" className="inp" value={inputWord} onChange={(e) => setInputWord(e.target.value)} placeholder="Enter a word..."/>
        <button className="btn" onClick={searchForWord}> Search 🔍</button>
        <div className="word-info">
          {error&&<p className="error">{error}</p>}
          {word&&(
            <>
              <p>Word: {word.word} <i>{word.meanings[0]?.partOfSpeech || 'N/A'}</i></p>
              <p>Meaning: {word.meanings[0]?.definitions[0]?.definition || 'N/A'}</p>
              <p>Example: {word.meanings[0]?.definitions[0]?.example || 'No example available'}</p>
              <p>🔊: {word.phonetics[0]?.audio ? (<a href={word.phonetics[0].audio} target="_blank" rel="noopener noreferrer">Listen</a>):('No audio available')}</p>
              <p>©:{' '}{word.license?.url?(<a href={word.license.url} target="_blank" rel="noopener noreferrer">License Info</a>):('No license info available')}</p>
              <p><i>See more:</i>{' '}{word.sourceUrls?.[0]?(<a href={word.sourceUrls[0]} target="_blank" rel="noopener noreferrer">{word.sourceUrls[0]}</a>):('No source URL available')}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;