import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import WebViewer, {WebViewerInstance, Core} from "@pdftron/webviewer";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit {
  wvInstance?: WebViewerInstance;
  
  @ViewChild('viewer') viewer!: ElementRef;
  
  @Output() coreControlsEvent:EventEmitter<string> = new EventEmitter();

  private documentLoaded$: Subject<void>;
  selectedOption: any;
  options: any;
   
  constructor() {
    this.documentLoaded$ = new Subject<void>();

  }


  private copyTool: boolean = false;
  private officeEditor: Core.Document.OfficeEditor | undefined = undefined;

  paste = () => {
    if(!this.copyTool) return;

    this.copyTool = false;
    this.officeEditor?.pasteText(false)
  }

  onChangeofOptions = async (selected: any) => {
    await navigator.clipboard.writeText(selected)
    this.copyTool = true;
    alert(`${selected} copied to clipboard`)
  }

  ngAfterViewInit(): void {

    WebViewer({
      path: '../lib',
      initialDoc: '../files/Test.docx',
      enableOfficeEditing: true,
    }, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;

      this.coreControlsEvent.emit(instance.UI.LayoutMode.Single);

      const { documentViewer } = instance.Core;

      documentViewer.addEventListener('mouseLeftUp', async evt => {
        this.paste();
      });

      documentViewer.addEventListener('documentLoaded', () => {
        this.officeEditor = documentViewer.getDocument().getOfficeEditor();
      });
    })
  }
}
