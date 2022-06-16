import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, distinct, distinctUntilChanged, fromEvent, map, Observable, tap } from 'rxjs';
import { DocumentService } from '../document/document.service';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private renderer: Renderer2;
  public readonly stickyHeader$: Observable<boolean>;
  public readonly mobileSidebarOpened$ = new BehaviorSubject<boolean>(true);

  constructor(
    private documentService: DocumentService,
    private rendererFactory: RendererFactory2,
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.stickyHeader$ = combineLatest([
      this.documentService.isSmallScreen$,
      fromEvent(this.window, 'scroll'),
    ]).pipe(
      map(([isSmallScreen]) => {
        const scrollPosition = this.window.scrollY;
        if (!isSmallScreen && scrollPosition > 400) {
          return true;
        }
        return false;
      }),
      distinctUntilChanged()
    );

    this.stickyHeader$.pipe(
      untilDestroyed(this)
    ).subscribe(stickyHeader => {
      if (stickyHeader) {
        this.renderer.setStyle(this.document.body, 'padding-top', '80px')
      } else {
        this.renderer.removeStyle(this.document.body, 'padding-top')
      }
    })
  }
}
