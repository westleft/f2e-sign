import { ref, onMounted } from "vue";

export function useCanvas() {
    const cannvasDOM = ref()

    class CanvasUnit {
        private isPainting: boolean;
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D | null;

        constructor(canvas: HTMLCanvasElement) {
            this.isPainting = false;
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            this.ctx!.lineWidth = 4;
            this.ctx!.strokeStyle = "#000000";
            this.ctx!.lineCap = "round";

            this.addEvent();
        }

        // 取得滑鼠 / 手指在畫布上的位置
        private getPaintPosition = (e: MouseEvent | TouchEvent) => {
            const canvasSize = this.canvas.getBoundingClientRect();

            if (e instanceof MouseEvent) {
                return {
                    x: e.clientX - canvasSize.left,
                    y: e.clientY - canvasSize.top,
                };
            } else {
                return {
                    x: e.touches[0].clientX - canvasSize.left,
                    y: e.touches[0].clientY - canvasSize.top,
                };
            }
        }

        // 開始繪圖時，將狀態開啟
        private startPosition = (e: Event) => {
            e.preventDefault();
            this.isPainting = true;
        }

        // 結束繪圖時，將狀態關閉，並產生新路徑
        private finishedPosition = () => {
            this.isPainting = false;
            this.ctx!.beginPath();
        }

        // 繪圖過程
        private draw = (e: MouseEvent | TouchEvent) => {
            e.preventDefault();
            if (!this.isPainting) return;

            const paintPosition = this.getPaintPosition(e);

            // 移動到滑鼠位置並產生圖案
            this.ctx!.lineTo(paintPosition.x, paintPosition.y);
            this.ctx!.stroke();
        }

        public changeStrokeColor = (color: string) => {
            this.ctx!.strokeStyle = color;
        }

        // 重新設定畫布
        public reset = () => {
            this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // 儲存圖片
        public saveImage = () => {
            const newImg = this.canvas.toDataURL("image/png");
            return newImg;
        }

        private addEvent() {
            // event listener 電腦板
            this.canvas.addEventListener("mousedown", this.startPosition);
            this.canvas.addEventListener("mouseup", this.finishedPosition);
            this.canvas.addEventListener("mouseleave", this.finishedPosition);
            this.canvas.addEventListener("mousemove", this.draw);

            // event listener 手機板
            this.canvas.addEventListener("touchstart", this.startPosition);
            this.canvas.addEventListener("touchend", this.finishedPosition);
            this.canvas.addEventListener("touchcancel", this.finishedPosition);
            this.canvas.addEventListener("touchmove", this.draw);
        }

    }

    return { CanvasUnit, cannvasDOM };
}