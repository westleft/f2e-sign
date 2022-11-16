import * as pdfjsLib from 'pdfjs-dist';
import { fabric } from "fabric";

import { jsPDF } from "jspdf";
import { onMounted } from 'vue';

export function useReadPDF() {
    const Base64Prefix = "data:application/pdf;base64,";

    pdfjsLib.GlobalWorkerOptions.workerSrc = "../plugin/build/pdf.worker.js";

    class PdfReader {
        canvas: any
        constructor(canvas: any){
            this.canvas = canvas;
        }

        readBlob = (blob: Blob) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.addEventListener("load", () => resolve(reader.result));
                reader.addEventListener("error", reject);
                reader.readAsDataURL(blob);
            });
        }

        printPDF = async (pdfData: File) => {
            const dataStr = await this.readBlob(pdfData);
            const data = atob((dataStr as string).substring(Base64Prefix.length));
    
            // Using DocumentInitParameters object to load binary data.
            const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
            const pdfPage = await pdfDoc.getPage(1);
    
            const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
    
            // 控制顯示PDF的寬高
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
                canvasContext: context,
                viewport,
            };
            const renderTask = pdfPage.render(renderContext as any);
    
            // 回傳做好的canvas
            return renderTask.promise.then(() => canvas);
        }

        pdfToImage = async (pdfData: HTMLCanvasElement) => {
            const scale = 1 / window.devicePixelRatio;
            return new fabric.Image(pdfData, {
                scaleX: scale,
                scaleY: scale,
            });
        }

        pdfEvent = async (file: File) => {
            this.canvas.requestRenderAll();
            console.log(file)
            const pdfData = await this.printPDF(file);
            const pdfImage = await this.pdfToImage(pdfData);
    
            // 調整canvas大小
            this.canvas.setWidth((pdfImage.width as number) / window.devicePixelRatio);
            this.canvas.setHeight((pdfImage.height as number) / window.devicePixelRatio);
            this.canvas.setBackgroundImage(pdfImage, this.canvas.renderAll.bind(this.canvas));
        } 
    }

    return { PdfReader }
}


export function usePdfDownloader(){
    const pdf = new jsPDF();

    function downloadPDF(canvas: HTMLCanvasElement){
    // 將 canvas 存為圖片
        const image = canvas.toDataURL("image/png");

        // 設定背景在 PDF 中的位置及大小
        const width = pdf.internal.pageSize.width;
        const height = pdf.internal.pageSize.height;

        pdf.addImage(image, "png", 0, 0, width, height);
    
        // 將檔案取名並下載
        pdf.save("download.pdf");
    }

    return { downloadPDF }
}