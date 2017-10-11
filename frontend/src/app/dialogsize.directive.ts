import { Directive, ElementRef, Renderer, HostListener, Input, ViewContainerRef } from '@angular/core';
import { DomHandler } from 'primeng/components/dom/domhandler';
@Directive({
  selector: '[appDialogsize]'
})
export class DialogSizeDirective {
  @Input() dialogWidth: number = 90; //dialog size in percent relative to screen
  private domHandler: DomHandler = new DomHandler();
  constructor(private el: ElementRef, private renderer: Renderer, private _view: ViewContainerRef) {
  }

  @HostListener('onAfterShow') onAfterShow() {
    this.patchOnResize();
    this.resizeWidth();
    this.center();
  }

  center(){
    var container = this.el.nativeElement.children[0];
    var elementWidth = this.domHandler.getOuterWidth(container);
    var elementHeight = this.domHandler.getOuterHeight(container);
    var viewport = this.domHandler.getViewport();
    var x = (viewport.width - elementWidth) / 2;
    var y = 50;
    container.style.left = x + 'px';
    container.style.top = y + 'px';
  }

  resizeWidth(){
    let container = this.el.nativeElement.children[0];
    let viewport = this.domHandler.getViewport();
    let width = viewport.width / 100 * this.dialogWidth;
    container.style.width = width + 'px';
  }
  
  // Monkey patching https://github.com/primefaces/primeng/blob/master/components/dialog/dialog.ts
  patchOnResize() {
    let component = (<any>this._view)._element.component;
    component.onResize = function (event: any) {
      if(this.resizing) {
        let deltaX = event.pageX - this.lastPageX;
        let deltaY = event.pageY - this.lastPageY;
        let containerWidth = this.domHandler.getWidth(this.container);
        // Use getHeight instead of getOuterHeight
        let contentHeight = this.domHandler.getHeight(this.contentContainer);
        let newWidth = containerWidth + deltaX;
        let newHeight = contentHeight + deltaY;
        
        if(newWidth > this.minWidth)
            this.container.style.width = newWidth + 'px';
            
        if(newHeight > this.minHeight)
            this.contentContainer.style.height = newHeight + 'px';
        
        this.lastPageX = event.pageX;
        this.lastPageY = event.pageY;
      }
    }
  }

}
