import { Injectable } from '@angular/core';
import { Observable, scan, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Upload } from 'tus-js-client';
import { AuthService } from '../../authentication/auth.service';

export interface FileStatus {
  filename: string;
  progress: number;
  hash: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  
  private _uploadStatus$ = new Subject<Partial<FileStatus>>();
  public fileStatus$: Observable<Partial<FileStatus>> = this._uploadStatus$.pipe(
    scan((acc, delta) => ({ ...(!!acc && acc), ...delta }))
  );

  constructor(private authService: AuthService) {}

  uploadFile(file: File, filename: string) {
    const fileStatus: FileStatus = { filename, progress: 0, hash: '', path: '' };
    this._uploadStatus$.next(fileStatus);

    const upload = new Upload(file, {
      endpoint: `${environment.apiUrl}/uploads/files/`,
      retryDelays: [0, 3000, 6000, 12000, 24000],
      //chunkSize: 99000000,
      chunkSize: 1000000,
      headers: { Authorization: `Bearer ${this.authService.loggedInUser?.token}` },
      metadata: { filename, filetype: file.type },
      onError: error => {
        console.log(error);
        return false;
      },
      onChunkComplete: (_chunkSize: number, bytesAccepted: number, bytesTotal: number) => {
        this._uploadStatus$.next({
          progress: Math.floor(bytesAccepted / bytesTotal * 100),
          path: upload?.url?.replace(`${environment.apiUrl}/uploads/`, '')
        });
      },
      onSuccess: async () => {
        this._uploadStatus$.next({ progress: 100 });
        return true;
      }
    });
    upload.start();
  }}
