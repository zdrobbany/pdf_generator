import { Component, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
// import $ from 'jquery';
// import { element } from 'protractor';
// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
// import { htmlToPdfmake } from 'html-to-pdfmake';
// import * as html2pdf from 'html2pdf.js';


@Component({

  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss']

})
export class AppComponent {
  title = 'htmltopdf';
  
  @ViewChild('pdfTable', {static: false})
  pdfTable!: ElementRef;
  /* 
  // Pure jsPDF
  public downloadAsPDF() {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.html(this.pdfTable.nativeElement, {
      callback: (pdf => {
        doc.save("test.pdf");
      })
    })
  }
  */
  /*
  // mMltiple page pdf
  */
  public downloadAsPDF() {
    // let elements: NodeListOf<Element> = document.getElementsByClassName("topnav")[0];
    // let classes: DOMTokenList = elements[0].classList;
    // return classes.toggle("responsive");
    var HTML_Width = document.getElementsByClassName("canvas_div_pdf")[0].clientWidth;
    var HTML_Height = document.getElementsByClassName("canvas_div_pdf")[0].clientHeight;
    console.log('width: ', HTML_Width, ", height: ", HTML_Height);
		var top_left_margin = 15;
		var PDF_Width = HTML_Width+(top_left_margin*2);
		var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
		var canvas_image_width = HTML_Width;
		var canvas_image_height = HTML_Height;
		var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
    // var htmlEls: HTMLElement | null = document.getElementsByClassName("canvas_div_pdf");;
    var htmlEl= (<HTMLScriptElement[]><any>document.getElementsByClassName("canvas_div_pdf"))[0]
    if (htmlEl){
      console.log('success: ',htmlEl)
      const html2 = htmlEl;
      html2canvas(html2,{allowTaint:true}).then(function(canvas) {
      canvas.getContext('2d');
      console.log(canvas.height+"  "+canvas.width);
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
      for (var i = 1; i <= totalPDFPages; i++) { 
        pdf.addPage([PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
      }
      pdf.save("HTML-Document.pdf");
      });
    } else {console.log('failed')}
  }
}