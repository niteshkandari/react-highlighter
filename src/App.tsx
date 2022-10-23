import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [changedText, setChangedText] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search === ''){
      setChangedText('');
      setText('');
    }
  }, [search]);

  useEffect(() => {
    setChangedText(text);
  }, [text]);

  useEffect(() => {
    if (search) debouncer();
  }, [search]);

  const highlighthandler = () => {
    if (search.length < 1) return;
    if (search.length > 1) {
      const old = changedText.split(' ');
      const indexes: any = [];
      let changed = [];
      Array.from(old, (ele, key) => ele.includes(search) && indexes.push(key));
      changed = old.map((i: any, key) => {
        if (indexes.includes(key)) {
          return i.replaceAll(
            search,
            `<span style='color:white;background:black'>${search}</span>`
          );
        } else return '';
      });
      if (changed) setChangedText(changed.join(' '));
    } else {
      const old = changedText.split(' ');
      let newOld: any;
      let c = 0;
      while (c <= search.length - 1) {
        newOld = old
          .map((item) => {
            return item
              .split('')
              .map((char) => {
                if (char === search.charAt(c)) {
                  return `<span style='color:white;background:black'>${char}</span>`;
                } else return char;
              })
              .join('');
          })
          .join(' ');
        c++;
      }
      setChangedText(newOld);
    }
  };

  const delayer = function (callback: () => void, delay: number) {
    let timer: any;
    return function () {
      // let _this = this ;
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback();
        // callback.apply(_this);
      }, delay);
    };
  };

  let debouncer = delayer(highlighthandler, 1500);
  return (
    <div className="box">
    <div
      style={{
        textAlign: 'center',
        color: 'white',
        textTransform: 'uppercase',
      }}
    >
      text highlighter
    </div>
    <textarea
      className="source-text"
      value={text}
      placeholder="type....."
      onChange={(e) => setText(e.target.value)}
    />
    <input
      className="search-term"
      value={search}
      placeholder={'search'}
      onChange={(e) => setSearch(e.target.value)}
    />

    <div
      className="result"
      dangerouslySetInnerHTML={{ __html: changedText }}
    />
  </div>
  );
}

export default App;
