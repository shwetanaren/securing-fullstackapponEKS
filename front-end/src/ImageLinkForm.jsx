import React, { useState } from 'react';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  const [jsToEval, setJsToEval] = useState('');

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <p>
        {'Detect faces in the pictures. Enter an URL to test it out !!'}
      </p>
      <div>
        <input onChange={onInputChange} type='text' placeholder="enter the image URL" />
        <button onClick={onButtonSubmit}> Detect</button>
      </div>
      {/* --- Simple eval() vulnerability for SAST testing --- */}
      <div style={{ marginTop: 20 }}>
        <label>Eval Demo: Type JS code and run it!</label>
        <input
          type="text"
          value={jsToEval}
          onChange={e => setJsToEval(e.target.value)}
          placeholder="Type: alert(1)"
          style={{ marginLeft: 10 }}
        />
        <button
          onClick={() => eval(jsToEval)} // DANGEROUS: Do not use in production!
          style={{ marginLeft: 10, color: 'white', background: 'red' }}
        >
          Run Eval
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;