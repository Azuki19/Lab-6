import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { Songs } from '../types/Song';

const firebaseConfig = {
	apiKey: 'AIzaSyAZvorW2TdM96A0_js_OoKenmnaDVRYmx8',
	authDomain: 'lab-6-c4350.firebaseapp.com',
	projectId: 'lab-6-c4350',
	storageBucket: 'lab-6-c4350.appspot.com',
	messagingSenderId: '317632434291',
	appId: '1:317632434291:web:6f9008d1e4b6a8c964da06',
	measurementId: 'G-655VLKEV3F',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const songDocuments = collection(db, 'songs');

export const addSongs = async (songs: Songs) => {
	try {
		await addDoc(songDocuments, songs);
		console.log('Se añadió');
	} catch (error) {
		console.error(error);
	}
};

export const getSongs = async () => {
	const querySnapshot = await getDocs(songDocuments);
	const songs: Songs[] = [];

	querySnapshot.docs.forEach((doc) => {
		const data: Omit<Songs, 'id'> = doc.data() as any;
		const songData = doc.data() as Songs;
		songs.push(songData);
	});
	console.log(songs);
	return songs;
};
