import FETCHER from "@/services/_fetcher";
import { ClipReview, SentenceReview } from "@/types/review";
import { useMutation } from "react-query";

const postClipReview = async (body: ClipReview) => {
	return FETCHER.post("/review/voice-clip/submit", body);
};

export const usePostClipReview = () => {
	const { mutateAsync: submitClipReview } = useMutation(postClipReview, {
		retry: 1,
	});
	return { submitClipReview };
};

const postSentenceReview = async (body: SentenceReview) => {
	return FETCHER.post("/review/sentence/submit", body);
};

export const usePostSentenceReview = () => {
	const { mutateAsync: submitSentenceReview } = useMutation(
		postSentenceReview,
		{
			retry: 1,
		},
	);
	return { submitSentenceReview };
};
