import { useState, useEffect } from 'react';
import { db } from './firebaseConnection';
import { doc, setDoc} from 'firebase/firestore';

import './App.css';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');



  async function handleAdd() {
    await setDoc(doc(db, "posts", "12345"), {
      título: titulo,
      autor: autor
    })
    .then(()=>{
      console.log('Dados registrados no banco');
    })
    .catch((error)=>{
      console.log('[function handleAdd] Error: ', error);
    })
  }
  
  
  return (
    <div>
      <h1>React + Firebase</h1>
      <div className='container'>
        <label>Título</label>
        <input 
        type='text'
        placeholder='Digite o título'
        value={titulo}
        onChange={ (e) => setTitulo(e.target.value)}
      />

        <label>Autor:</label>
        <input
        type='text' 
        placeholder='Ex: Matheus'
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}>Cadastrar</button>
      </div>

    </div>
  );
}

export default App;
