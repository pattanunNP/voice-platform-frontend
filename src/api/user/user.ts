import FETCHER from "@/services/_fetcher";
import { useQuery } from "react-query";

export interface IUserRes {
	user_id: string;
	name: string;
	expires_in: number;
	firstname: string;
	lastname: string;
	email: string;
	current_lang: string;
	avatar_url: string;
	role: string;
	age: number;
	gender: string;
}

const getUser = () => {
	return FETCHER.get<IUserRes>("/user/profile");
};

export const useProfile = () => {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["profile"],
		queryFn: () => getUser(),
		keepPreviousData: true,
		retry: 0,
		staleTime: Infinity,
		cacheTime: Infinity,
	});

	return {
		userdata: data?.data,
		isLoading,
		refetchProfile: refetch,
	};
};