import { Component } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: ['.buttonYahoo { background-color: whitesmoke; border: thin solid slateblue; color: slateblue; } .buttonYahoo:hover { background-color: slateblue; color: whitesmoke; }']
})
export class LoginComponent {

	constructor(private _chatService: ChatService) {
	}

	login(provider: string) {

		this._chatService.login(provider);
	}
}
