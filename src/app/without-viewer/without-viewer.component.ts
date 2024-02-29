import { Component } from '@angular/core';
declare const Core: any;

@Component({
  selector: 'app-without-viewer',
  templateUrl: 'without-viewer.html',
  styles: [
  ]
})
export class WithoutViewerComponent {

  click() {
    (async function() {
      Core.setWorkerPath('./lib/core');

      const arrayBuffer = await Core.officeToPDFBuffer('./files/legal-contract.docx', {l: "demo:1686757895540:7d86b1ba030000000049491bef43714654d2dec710ec9c728a35106d71"})
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url);
    })()
  }

}
