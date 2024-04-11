//Importanto o app
import { initializeApp } from 'firebase/app'; 
//Importando o banco de dados
import { getFirestore } from 'firebase/firestore'; //


//Configuração que tem no Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCdQ_xiAzGgX8U1TwoldXmH3dgDPqceKVM",
    authDomain: "curso-9ffb3.firebaseapp.com",
    projectId: "curso-9ffb3",
    storageBucket: "curso-9ffb3.appspot.com",
    messagingSenderId: "878413535101",
    appId: "1:878413535101:web:97c44bd65b9d3d1eda9e14",
    measurementId: "G-5XGMFT77GC"
  };
  
//Vai pegar o app e fazer ele receber a configuração
const firebaseApp = initializeApp(firebaseConfig);

//Agora é só inicializar a configuração. Peguei a configuração acima e depois inicializei com o getFirestore.
const db = getFirestore(firebaseApp);

//Exportando a nossa inicialização da configuração
//Para conectar com o Firestore
export { db };