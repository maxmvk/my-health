import {Injectable} from '@angular/core';
import {INITIAL_CHATBOT_OPTIONS} from '../app.config';
import {MessageInterface} from '../models';
import {LexRuntime} from 'aws-sdk';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private lex: LexRuntime;
  private lexState: string = 'Hi! This is your personal assistant. Can we help you with one of the following?';

  messages: MessageInterface[] = [];

  constructor(
  ) {
    this.messages.push({
      content: this.lexState,
      sender: 'bot-message',
      attachments: INITIAL_CHATBOT_OPTIONS
    });
  }

  postLexText(message: string): void {
    const params = {
      botAlias: '\$LATEST',
      botName: 'MLOS_ProofOfConcept',
      inputText: '',
      userId: 'User'
    };

    this.lex = new LexRuntime(environment.lexRuntimeSettings);
    params.inputText = message;

    this.lex.postText(params, (err, data) => {
      err ? this.lexState = 'The server is not responding. Try later.'
        : this.lexState = data.message;

      this.messages.push({
        content: message,
        sender: 'user-message'
      });

      setTimeout(() => this.messages.push({
        content: this.lexState,
        sender: 'bot-message',
        attachments: data?.responseCard?.genericAttachments[0]
      }), 500);
    });
  }
}
