import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Thread, ThreadsService } from "../../Services/threads.service";
import { MessagesComponent } from "../Messages/messages.component";
import { Message, MessagesService } from "../../Services/messages.service";
import { FormsModule } from "@angular/forms";
import { UserService } from "../../Services/user.service";

@Component({
    selector: "app-threads",
    standalone: true,
    imports: [CommonModule, MessagesComponent, FormsModule],
    templateUrl: "./threads.component.html",
    styleUrl: "./threads.component.css",
})
export class ThreadsComponent implements OnInit {
    threads!: Thread[];
    actualThread!: Thread;
    messages!: Message[];
    @Input()
    message!: string;
    newThreadName!: string;

    constructor(
        public threadsService: ThreadsService,
        public messagesService: MessagesService,
        public userService: UserService
    ) {}

    selectThread(thread: Thread) {
        this.actualThread = thread;
        this.messagesService
            .getMessagesByThreadId(thread.id)
            .subscribe((messages: any) => {
                this.messages = messages;
                console.log(this.messages);
            });
    }

    createNewThread() {
        // Suppose que vous avez une méthode createThread dans threadsService
        this.threadsService.createThread({
            // Propriétés nécessaires pour créer un nouveau thread
            // Par exemple, le nom du thread, l'auteur, etc.
            label: this.newThreadName
        }).subscribe(
            (newThread: any) => {
                // Une fois le thread créé, mettez à jour la liste des threads
                this.threads.push(newThread);
                // Sélectionnez le nouveau thread
                this.selectThread(newThread);
                this.newThreadName = "";
            },
            (error: any) => {
                // Gérez les erreurs ici
                console.error(error);
            }
        );
    }
    

    ngOnInit() {
        this.threadsService.getThreads().subscribe((threads: any) => {
            this.threads = threads;
            console.log(this.threads);
            this.selectThread(this.threads[0]);
        });
    }

    sendMessage() {
        this.messagesService
            .createMessage({
                content: this.message,
                authorId: this.userService.user?.username,
                threadId: this.actualThread.id,
                date: new Date().toISOString()
            })
            .subscribe((message: any) => {
                this.messages.push(message);
                this.message = "";
            });
    }

    deleteMessage(messageId: string) {
        // Utilisation du service messagesService pour supprimer le message
        this.messagesService
            .deleteMessage(messageId)
            // Utilisation d'un observable pour gérer la réponse asynchrone
            .subscribe(() => {
                // Suppression du message du tableau messages
                this.messages = this.messages.filter(message => message.id !== messageId);
            });
    }
    
}
