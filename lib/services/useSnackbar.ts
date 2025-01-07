import { useAtom, useAtomValue } from 'jotai';
import { snackbarAtom } from '../atoms/snackbarAtom';

export function useSnackbar() {
  const [snackbar, setSnackbar] = useAtom(snackbarAtom);

  const snackbarMessage = useAtomValue(snackbarAtom).message;
  const snackbarVisibility = useAtomValue(snackbarAtom).visible;

  const hideSnacbar = () =>{
    setSnackbar({message: '', visible: false})
  }

  const newSnackbar = (message: string) =>{
    setSnackbar({message: message, visible: true})
}

  return { hideSnacbar, newSnackbar, snackbarMessage, snackbarVisibility };
}
