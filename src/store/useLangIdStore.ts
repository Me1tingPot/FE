import {create} from 'zustand';

interface LangIdState {
  langId: string | null;
  setLangId: (langId: string) => void;
}

const useLangIdStore = create<LangIdState>(set => ({
  langId: null,
  setLangId: langId => {
    set({langId});
  },
}));

export default useLangIdStore;
