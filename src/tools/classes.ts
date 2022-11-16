import { fabric } from "fabric";
import { Ref, ref } from "vue";
import { useReadPDF } from "@/composables/pdf";

const { PdfReader } = useReadPDF();

// 控制彈窗
export class PopUnit {
    current: Ref<string>;
    constructor() {
        this.current = ref("");
    }

    changePop(popName: string) {
        this.current.value = popName;
    }
}


export class SignUnit {
    sign: Ref<string>;
    editing: Ref<boolean>;
    constructor() {
        this.sign = ref("");
        this.editing = ref(false);
    }

    selectSign(sign: string) {
        this.sign.value = sign;
    }

    addToPDF(pdfReader: InstanceType<typeof PdfReader>) {
        fabric.Image.fromURL(this.sign.value, function (image) {
            image.top = 400;
            image.scaleX = 0.5;
            image.scaleY = 0.5;
            pdfReader.canvas.add(image);
        });
    }
}