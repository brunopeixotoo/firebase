import { useState, useEffect } from 'react';
import { db, auth } from './firebaseConnection';
import { doc,
    setDoc,
    collection,
    addDoc,
    getDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc,
    onSnapshot} from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import './App.css';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idpost, setIdPost] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [posts, setPosts] = useState([]);
  const [cadastro, setCadastro] = useState([]);

  useEffect(()=> {

    async function loadPost() {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot)=> {
        let listaPost = []

        snapshot.forEach((doc)=> {
          listaPost.push({
            id:doc.id,
            titulo:doc.data().titulo,
            autor: doc.data().autor
          })
        })
        setPosts(listaPost);
      })
    }

    loadPost();

  }, [])

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

  async function deletePost(id) {
    const docRef = doc(db, "posts", id);

    await deleteDoc(docRef)
    .then(()=>{
      alert(" delete with sucess");
    })
    .catch((error)=>{
      console.log('[function updateData] Error: ', error);
    })

  }

  async function cadastroUser() {

    await createUserWithEmailAndPassword(auth, email, senha)
    .then(()=> {
      console.log('Usuário cadastrado');
      setEmail('');
      setSenha('');
    })
    .catch((error)=> {
      if(error.code === 'auth/weak-password'){
        alert('Senha muito fraca');
      }else if(error.code === 'auth/email-already-in-use'){
        alert('Email já existe!');
      }
    })
  

  }
  
  async function fazerLogin() {
    await signInWithEmailAndPassword(auth, email, senha )
    .then((value)=>{
      console.log('Login com sucesso');
      setEmail('');
      setSenha('');
    })
    .catch((error)=>{
      console.log('Erro ao fazer o login');
    })
  }

  return (
    <div>
      <h1>React + Firebase</h1>

      <div className='container'>
        <h2>Usuários</h2>
        <label>E-mail: </label>
        <input
        placeholder='Ex: anonimo@email.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <label>Senha: </label>
        <input
        placeholder='Mínimo 4 caracteres'
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        />


        <button onClick={cadastroUser}>Cadastrar</button> <br/>
        <button onClick={fazerLogin}>Fazer Login</button> <br/> <br/>

      </div>
      <hr/>

      <div className='container'>
        <h2>Posts</h2>
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
                  <span>Autor: {post.autor}</span> <br/>
                  <button onClick={ () => deletePost(post.id)}>Excluir</button> <br/><br/>
                </li>
              )
            })}
        </ul>
      </div>

    </div>
  );
}

export default App;
