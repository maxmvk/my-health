import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  OnDestroy,
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {selectorTabsIsVisible} from '../../../../../../store';
import {ChatbotService} from 'src/app/shared/services';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollframe', {static: false}) scrollFrameRef: ElementRef;
  @ViewChildren('item') itemElements: QueryList<ElementRef>;

  tabsIsVisible$: Observable<boolean>;

  userInput: string = '';
  currentDate: number = Date.now();

  private scrollContainer: HTMLElement;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store,
    public chatbotService: ChatbotService
  ) {
  }

  ngOnInit(): void {
    this.tabsIsVisible$ = this.store.pipe(select(selectorTabsIsVisible));
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
