import { useEffect, useState } from "react";
import { PayHistory } from "../types/history";
import { getPayHistories } from "../utils/api";

export const usePayHistories = () => {
  const [payHistories, setPayHistories] = useState<PayHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchHistories() {
      setIsLoading(true);
      try {
        const result = await getPayHistories();
        setPayHistories(result);
      } catch (error) {
        setError((error as Error).message);
      }
      setIsLoading(false);
    }
    fetchHistories();
  }, []);

  return { payHistories, error, isLoading };
};
