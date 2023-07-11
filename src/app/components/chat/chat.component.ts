import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styles: [
	]
})
export class ChatComponent implements OnInit {

	message: string = '';
	element: any;

	constructor(public _chatService: ChatService) {

		_chatService.loadMessages().subscribe(() => {

			setTimeout(() => {

				this.element.scrollTop = this.element.scrollHeight;
			}, 1000);
		});
	}

	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.

		this.element = document.getElementById('app-mensajes');
	}

	send() {

		if (this.message.trim().length > 0) {

			this._chatService.addMessage(this.message)
				.then(() => {

					this.message = '';
					console.log('Message sent.')
				})
				.catch((err) => console.error('Error sending message.', err))
		}
	}
}
