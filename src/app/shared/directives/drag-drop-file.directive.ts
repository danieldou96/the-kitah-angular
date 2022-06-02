import {
  Directive,
  HostBinding,
  HostListener,
  Output,
  EventEmitter,
	Inject
} from "@angular/core";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { WINDOW } from "@ng-web-apis/common";

export interface FileHandle {
  file: File,
  url: SafeUrl
}

@Directive({
  selector: "[appDrag]"
})
export class DragDirective {

  @Output() fileDropped: EventEmitter<File> = new EventEmitter();

  @HostBinding("style.background") private background = "#fff";

  constructor(
		private sanitizer: DomSanitizer,
		@Inject(WINDOW) private window: Window & typeof globalThis
	) { }

  @HostListener("dragover", ["$event"]) public onDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("dragleave", ["$event"]) public onDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.background = "#fff";
  }

  @HostListener('drop', ['$event']) public onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.background = '#fff';
  
    let files: File[] = [];
    for (let i = 0; i < e.dataTransfer!.files.length; i++) {
      const file = e.dataTransfer!.files[i];
      const url = this.sanitizer.bypassSecurityTrustUrl(this.window.URL.createObjectURL(file));
      files.push(file);
      //files.push({ file, url });
    }
    if (files.length > 1) {
      console.error('only one file')
    } else if (files.length == 1) {
			this.fileDropped.emit(files[0]);
		}
  }
}
