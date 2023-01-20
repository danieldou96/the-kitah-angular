import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { EScreenSize } from 'src/app/shared/models/screen-size';

@Injectable({
	providedIn: 'root'
})
export class DocumentService {

	public readonly isMobile$ = this.breakpointObserver.observe(
		`(max-width: ${EScreenSize.md}px)`
	).pipe(
		map(breakpointObserver => breakpointObserver.matches),
		shareReplay(1)
	);
	public readonly isTablet$ = this.breakpointObserver.observe(
		`(min-width: ${EScreenSize.md}px) and (max-width: ${EScreenSize.lg}px)`
	).pipe(
		map(breakpointObserver => breakpointObserver.matches),
		shareReplay(1)
	);
	public readonly isDesktop$ = this.breakpointObserver.observe(
		`(min-width: ${EScreenSize.lg}px)`
	).pipe(
		map(breakpointObserver => breakpointObserver.matches),
		shareReplay(1)
	);

	public get isMobile(): boolean {
		return this.breakpointObserver.isMatched(`(max-width: ${EScreenSize.md}px)`);
	}
	public get isTablet(): boolean {
		return this.breakpointObserver.isMatched(`(min-width: ${EScreenSize.md}px) and (max-width: ${EScreenSize.lg}px)`);
	}
	public get isDesktop(): boolean {
		return this.breakpointObserver.isMatched(`(min-width: ${EScreenSize.lg}px)`);
	}

	constructor(
		private breakpointObserver: BreakpointObserver,
		@Inject(DOCUMENT) private document: Document
	) { }

	/** @description Scroll to the selector corresponding to the errors in the form */
	public scrollToError() {
		const firstElementWithError = this.document
			.querySelector('.ng-invalid[formControlName]');

		this._scrollTo(firstElementWithError!);
	}

	private _scrollTo(el: Element): void {
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}
}
