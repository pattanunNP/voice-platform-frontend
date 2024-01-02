import FETCHER from "@/services/_fetcher";
import { useMutation, useQuery } from "react-query";

const postClip = async (body: FormData) => {
	return FETCHER.post("/clip/submit", body, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const usePostClip = () => {
	const { mutateAsync: submitClip } = useMutation(postClip, {
		retry: 1,
	});
	return { submitClip };
};

const getClips = async () => {
	return FETCHER.get(`/clip/random`);
};

export const useClipsFeed = () => {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["clipsFeed"],
		queryFn: () => getClips(),
		keepPreviousData: true,
		retry: 0,
		staleTime: Infinity,
		cacheTime: Infinity,
	});

	return {
		clipsFeed: data?.data?.clips,
		isLoading,
		refetchClipsFeed: refetch,
	};
};
