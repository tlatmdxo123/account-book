import { useEffect, useState } from "react";
import { PayHistory } from "../types/history";
import { fetchHistories } from "../store/payHistories/api";
import { AxiosResponse } from "axios";

export const usePayHistories = () => {
  const [payHistories, setPayHistories] = useState<PayHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getHistories() {
      setIsLoading(true);
      try {
        const result: AxiosResponse<PayHistory[]> = await fetchHistories();
        setPayHistories(result.data);
      } catch (error) {
        setError((error as Error).message);
      }
      setIsLoading(false);
    }
    getHistories();
  }, []);

  return { payHistories, error, isLoading };
};
