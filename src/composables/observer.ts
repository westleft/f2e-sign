import { observerOptions } from "@/interfaces/"
import { ref } from "vue";
import type { Ref } from "vue";

export function useIntersectionObserver() {
    const showAnimation: Ref<boolean> = ref(false); 
    const pageDOM = ref() as Ref<HTMLElement>;

    // 參數 activeCallback：進入時觸發
    // 參數 leaveCallback ：離開時觸發
    function createObserver(options: observerOptions, activeCallback: Function, leaveCallback?: Function ) {
        return new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
            entries.forEach((item) => {
                if (item.isIntersecting) {
                    activeCallback()
                } else {
                    if (leaveCallback === undefined) return
                    leaveCallback()
                }
            });
        }, options)
    }

    return { showAnimation, pageDOM, createObserver }
}