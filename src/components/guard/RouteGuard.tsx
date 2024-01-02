import { ACCESS_TOKEN } from "@/constants";
import { getWithExpiry } from "@/utils/localstorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
	children: JSX.Element;
}

const RouteGuard = ({ children }: Props) => {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);
	const token = getWithExpiry(ACCESS_TOKEN);

	useEffect(() => {
		function authCheck(url: string) {
			const publicPaths = ["auth"];
			const path = url.split("/")[1];

			if (!token && !publicPaths.includes(path)) {
				setAuthorized(false);

				if (!authorized) {
					return null;
				}

				router.push({
					pathname: "/auth/login",
					query: { returnUrl: router.asPath },
				});
			} else {
				setAuthorized(true);
			}
		}

		authCheck(router.pathname);

	}, [token, router, authorized]);

	return children
};

export default RouteGuard;
