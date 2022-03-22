import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Injectable({
	providedIn: 'root'
})
export class DocumentService {

	// BreakpointObserver to check if the screen
	// is smaller than the "sm" screen size
	public isSmallScreen = this.breakpointObserver.isMatched(`(max-width: 576px)`);
	public isSmallScreen$ = this.breakpointObserver.observe(`(max-width: 576px)`).pipe(
    map(breakpointObserver => breakpointObserver.matches)
  );

	constructor(
		private breakpointObserver: BreakpointObserver,
		@Inject(DOCUMENT) private document: Document
	) {
		// Set document title on every route change
		/*this.router.events.pipe(
			filter((e: Event): e is ActivationEnd => e instanceof ActivationEnd),
			filter(activationEnd => activationEnd.snapshot.data.title !== undefined),
			map(activationEnd => activationEnd.snapshot.data.title as string),
			// Replace "{{ Kinus }}" to match to the current Kinus
			map(documentTitle => documentTitle.replace(
				'{{ Kinus }}',
				this.titleCasePipe.transform(
					this.kinusInfosService.kinusInfos.kinus
				))
			),
			untilDestroyed(this)
		).subscribe((routeTitle: string) => this.titleService.setTitle(routeTitle));*/
	}

	/** @description Scroll to the selector corresponding to the errors in the form */
	public scrollToError() {
		const firstElementWithError = this.document
			.querySelector('.ng-invalid[formControlName]')
			?.parentElement?.parentElement?.querySelector('.invalid-feedback');

		this._scrollTo(firstElementWithError!);
	}

	private _scrollTo(el: Element): void {
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}
}
