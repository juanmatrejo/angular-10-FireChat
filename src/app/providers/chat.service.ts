import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, collection, collectionData, addDoc, query, limit, orderBy, getDocs } from '@angular/fire/firestore';
import { Message } from '../interfaces/message.interface';
import { map } from 'rxjs';
import { Auth, GoogleAuthProvider, TwitterAuthProvider, authState, signInWithPopup, getAuth, OAuthProvider } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	public chats: Message[] = [];

	public userChat: any = {};

	private itemCollection: CollectionReference<Message> | any;

	constructor(private _fireStore: Firestore, private _auth: Auth) {

		const auth = getAuth();
		authState(auth).subscribe(user => {

			if (!user) {

				console.log('not signed');
				return;
			}

			this.userChat.uid = user?.uid;
			this.userChat.name = user?.displayName;
			console.log(user);
		});
	}

	login(provider: string) {

		const auth = getAuth();
		switch (provider) {
			case 'google':

				signInWithPopup(auth, new GoogleAuthProvider()).then(result => console.log(result)).catch(err => console.log(err));

				break;
			case 'twitter':

				signInWithPopup(auth, new TwitterAuthProvider()).then(result => console.log(result)).catch(err => console.log(err));

				break;
			case 'github':

				signInWithPopup(auth, new OAuthProvider('github.com')).then(result => console.log(result)).catch(err => console.log(err));

				break;
			case 'microsoft':

				signInWithPopup(auth, new OAuthProvider('microsoft.com')).then(result => console.log(result)).catch(err => console.log(err));

				break;
			case 'yahoo':

				signInWithPopup(auth, new OAuthProvider('yahoo.com')).then(result => console.log(result)).catch(err => console.log(err));

				break;
		}
	}

	logOut() {

		this._auth.signOut().then(result => console.log(result)).catch(err => console.log(err));
		this.userChat = {};
	}

	loadMessages() {

		this.itemCollection = (collection(this._fireStore, 'chats') as CollectionReference<Message>);

		return collectionData(this.itemCollection)
			.pipe(
				map(async () => {

					const q = query(this.itemCollection, orderBy('date', 'desc'), limit(5));
					const querySnapShot = await getDocs(q);

					this.chats = [];
					querySnapShot.forEach(doc => this.chats.unshift(doc.data() as Message));

					console.log(this.chats);
				})
			);

		// const itemCollection = collection(this.firestore, 'chats');

		// this.chats = collectionData(itemCollection)
		// .pipe(
		// 	map((resp: any) => {
		// 		console.log(resp);
		// 		return resp;
		// 	})
		// );
	}

	addMessage(newMessage: string) {

		let message: Message =
		{
			uid: this.userChat.uid,
			name: this.userChat.name,
			message: newMessage,
			date: new Date().getTime()
		};

		return addDoc(this.itemCollection, message);
	}
}
