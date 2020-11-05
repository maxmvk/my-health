import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, OnDestroy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {selectorWindowInnerWidth} from 'src/app/shared/store/selectors';
import {takeUntil} from 'rxjs/operators';
import {ChatbotService} from 'src/app/shared/services';

@Component({
  selector: 'app-chatbot-modal',
  templateUrl: './chatbot-modal.component.html',
  styleUrls: ['./chatbot-modal.component.scss']
})
export class ChatbotModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollframe', {static: false}) scrollFrameRef: ElementRef;
  @ViewChildren('item') itemElements: QueryList<ElementRef>;

  userInput: string = '';
  currentDate: number = Date.now();

  private scrollContainer: HTMLElement;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<ChatbotModalComponent>,
    private store$: Store,
    public chatbotService: ChatbotService
  ) {
  }

  ngOnInit(): void {
    this.store$
      .pipe(
        select(selectorWindowInnerWidth),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((width: number) => {
        switch (true) {
          case width > 991:
            this.dialogRef.updatePosition({right: '30px', bottom: '30px'});
            break;
          case width > 767 && width <= 991:
            this.dialogRef.updatePosition({right: '30px', bottom: '53px'});
            break;
          case width <= 767: {
            this.dialogRef.close();
          }
        }
      });
  }

  ngAfterViewInit(): void {
    this.scrollContainer = this.scrollFrameRef.nativeElement;
    this.itemElements.changes
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(_ => this.onItemElementsChanged());
  }

  onPostLexText(message: string): void {
    if (message.length < 1) {
      return;
    }
    this.userInput = '';
    this.chatbotService.postLexText(message);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  private onItemElementsChanged(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
