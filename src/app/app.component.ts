import { Component } from '@angular/core';
import { ChatService } from './providers/chat.service';

// import { inject } from '@angular/core';
// import { Firestore, collection, collectionData } from '@angular/fire/firestore';
// import { Observable, map } from 'rxjs';

interface Item {
	name: string
	// ...
};

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'FireChat';
	// chats: Observable<any[]>;
	// firestore: Firestore = inject(Firestore);

	constructor(public _chatService: ChatService) {

		// const itemCollection = collection(this.firestore, 'chats');

		// this.chats = collectionData(itemCollection)
		// 	.pipe(
		// 		map((resp: any) => {
		// 			console.log(resp);
		// 			return resp;
		// 		})
		// 	);

		// this.item$ = collectionData(collection);
	}
}
