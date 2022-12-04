import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Upload } from 'tus-js-client';

export interface FileStatus {
  filename: string;
  progress: number;
  hash: string;
  uuid: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  
  private uploadStatus = new Subject<FileStatus[]>();
  uploadProgress = this.uploadStatus.asObservable();

  fileStatusArr: FileStatus[] = [];

  uploadFile(file: File, filename: string) {
    const fileStatus: FileStatus = {filename, progress: 0, hash: '', uuid: ''};
    this.fileStatusArr.push(fileStatus);

    this.uploadStatus.next(this.fileStatusArr);

    const upload = new Upload(file, {
      endpoint: `${environment.apiUrl}/products/upload/product_file//`,
      //endpoint: "https://master.tus.io/files/",
      //uploadUrl: `${environment.apiUrl}/products/upload/product_file/`,
      retryDelays: [0, 3000, 6000, 12000, 24000],
      overridePatchMethod: true,
      chunkSize: Infinity,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiYXZhdGFyIjpudWxsLCJmaXJzdG5hbWUiOiJCdXllciIsImxhc3RuYW1lIjoiQnV5ZXIiLCJlbWFpbCI6ImJ1eWVyQHRoZWtpdGFoLmNvbSIsInVzZXJuYW1lIjoiYnV5ZXIiLCJjb25maXJtZWQiOmZhbHNlLCJ2ZXJpZnlFbWFpbExpbmsiOm51bGwsInJlc2V0UGFzc3dvcmRMaW5rIjpudWxsLCJyb2xlIjoidmVuZG9yIiwiYmlsbGluZ0lkIjpudWxsLCJzdHJpcGVDdXN0b21lcklkIjoiY3VzX005SVB0MUNndURhbE85IiwiYmFubmVkIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMi0wNC0wM1QwNToxMjoyNS4yMzdaIiwidXBkYXRlZEF0IjoiMjAyMi0wNy0yOVQyMDoyOTo0Ny4wMDBaIiwiaWF0IjoxNjY5OTMwMzU2LCJleHAiOjE2NzA1MzUxNTZ9.SMD_KeimLmH6ujP3pNlRiqkQFOEA7_WIJmSFjV-h3tE'
      },
      /*metadata: {
        filename,
        filetype: file.type
      },*/
      onError: async (error) => {
        console.log(error);
        return false;
      },
      onChunkComplete: (chunkSize, bytesAccepted, bytesTotal) => {
        this.fileStatusArr.forEach(value => {
          if (value.filename === filename) {
            value.progress = Math.floor(bytesAccepted / bytesTotal * 100);
            value.uuid = upload?.url?.split('/').slice(-1)[0]!;
          }
        });
        this.uploadStatus.next(this.fileStatusArr);
      },
      onSuccess: async () => {
        this.fileStatusArr.forEach(value => {
          if (value.filename === filename) {
            value.progress = 100;
          }
        });
        this.uploadStatus.next(this.fileStatusArr);
        return true;
      }
    });
    upload.start();
  }}
