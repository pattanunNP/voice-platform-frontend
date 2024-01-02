import FETCHER from "@/services/_fetcher";
import { ISentence, ISentenceCreateInput } from "@/types/sentence";
import { useMutation, useQuery } from "react-query";

export interface ISentenceRes {
	sentences: ISentence[];
}

const getSentence = () => {
	return FETCHER.get<ISentenceRes>("/sentence/random");
};

export const useSentenceFeed = () => {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["sentenceFeed"],
		queryFn: () => getSentence(),
		keepPreviousData: true,
		retry: 0,
		staleTime: Infinity,
		cacheTime: Infinity,
	});

	return {
		sentenceFeed: data?.data?.sentences,
		isLoading,
		refetchSentenceFeed: refetch,
	};
};

const createSentence = (body: ISentenceCreateInput) => {
	return FETCHER.post("/sentence/create", body);
};

export const useCreateSentence = () => {
	const { mutateAsync: submitSentence } = useMutation(createSentence, {
		retry: 1,
	});
	return { submitSentence };
};


