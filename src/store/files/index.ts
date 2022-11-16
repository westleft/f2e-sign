import { Ref, ref } from "vue";

interface State {
    files: [];
    signs: [];
}

interface FileObj {
    file: File;
}

interface SignObj {
    sign: string;
}

export default {
    namespaced: true,
    state: {
        files: [],
        signs: []
    },
    mutations: {
        setFile(state: State, arr: FileObj) {
            (state.files as FileObj[]).push(arr);
        },
        setSign(state: State, arr: SignObj) {
            (state.signs as SignObj[]).push(arr);
        }
    },
    actions: {
        setFile({ commit }: any, arr: FileObj) {
            commit("setFile", arr);
        },
        setSign({ commit }: any, arr: SignObj) {
            commit("setSign", arr);
        },
    },
    getters: {
        getFiles(state: State) {
            return state.files;
        },
        getSigns(state: State) {
            return state.signs;
        }
    }
};

