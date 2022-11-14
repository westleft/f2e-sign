import { Ref, ref } from "vue";

interface State {
    files: [];
}

interface FileArr {
    file: File;
}

export default {
    namespaced: true,
    state: {
        files: [],
    },
    mutations: {
        setFile(state: State, arr: FileArr) {
            (state.files as FileArr[]).push(arr);
            console.log(state);
        }
    },
    actions: {
        setFile({ commit }: any, arr: FileArr) {
            console.log(arr);
            commit("setFile", arr);
        }
    },
    getters: {
        getFiles(state: State) {
            return state.files;
        }
    }
};

