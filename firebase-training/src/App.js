import { useState, useEffect } from 'react';
import { db } from './firebaseConnection';
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc} from 'firebase/firestore';

import './App.css';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idpost, setIdPost] = useState('');

  const [posts, setPosts] = useState([]);

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

    const postRef = collection(db, "posts")
    await getDocs(postRef)
    .then((snapshot)=>{
      let lista = []

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          autor: doc.data().autor,
          titulo: doc.data().titulo
        })
      })

      setPosts(lista);

    }).catch((error)=>{
      console.log('[function buscaPost] Error: ', error);
    })

  }

  async function updateData() {
    
    const docRef = doc(db, "posts", idpost);

    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log('Update sucess');
      setIdPost('');
      setTitulo('');
      setAutor('');
    })
    .catch((error) => {
      console.log('[function updateData] Error: ', error)
    })

  }


  
  return (
    <div>
      <h1>React + Firebase</h1>
      <div className='container'>

        <label>ID do Post: </label>
        <input
        type='text'
        placeholder='Ex: 0tCDFtP4mNE2jjoTsdnC'
        value={idpost}
        onChange={(e)=> setIdPost(e.target.value)}
        />

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
        <button onClick={updateData}>Atualizar post</button>

        <ul className='list'>
            {posts.map( (post) =>{
              return(
                <li key={post.id}>
                  <strong>ID: {post.id}</strong> <br/>
                  <span>Título: {post.titulo}</span> <br/>
                  <span>Autor: {post.autor}</span>
                </li>
              )
            })}
        </ul>
      </div>

    </div>
  );
}

export default App;
