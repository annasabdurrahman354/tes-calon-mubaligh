import { useAtom } from "jotai";
import api, { handleApiError } from "./api";
import { statistikKediriAtom, statistikKertosonoAtom } from "../atoms/statistikAtom";

export function useStatistik() {
    const [statistikKediri, setStatistikKediri] = useAtom(statistikKediriAtom);
    const [statistikKertosono, setStatistikKertosono] = useAtom(statistikKertosonoAtom);

    const getStatistikKediri = async (): Promise<any> => {
      try {
        const response = await api.get('statistik-kediri');
        setStatistikKediri(response.data);
        return response.data;
      } catch (err) {
        handleApiError(err);
      }
    };
    
    const getStatistikKertosono = async (): Promise<any> => {
      try {
        const response = await api.get('statistik-kertosono');
        setStatistikKertosono(response.data);
        return response.data;
      } catch (err) {
        handleApiError(err);
      }
    };   
  
    return { getStatistikKediri, getStatistikKertosono, statistikKediri, setStatistikKediri, statistikKertosono, setStatistikKertosono }
}
  