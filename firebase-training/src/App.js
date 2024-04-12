import { useState, useEffect } from 'react';
import { db } from './firebaseConnection';
import { doc, setDoc, collection, addDoc, getDoc} from 'firebase/firestore';

import './App.css';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');



  async function handleAdd() {
  
    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor
    })
    .then(()=>{
      console.log('Dados registrados no banco');
      setAutor('');
      setTitulo('');
    })
    .catch((error)=>{
      console.log('[function handleAdd] Error: ', error);
    })


  }

  async function buscaPost() {
    
    const postRef = doc(db, "posts", "0tCDFtP4mNE2jjoTsdnC");

    await getDoc(postRef)
    .then((snapshot)=>{
      setTitulo(snapshot.data().titulo);
      setAutor(snapshot.data().autor);
    })
    .catch((error)=>{
      console.log('[function buscaPost] Error: ', error);
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
        <button onClick={buscaPost}>Buscar posts</button>
      </div>

    </div>
  );
}

export default App;
