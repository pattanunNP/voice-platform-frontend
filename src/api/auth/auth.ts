import { ACCESS_TOKEN } from "@/constants";
import { auth } from "@/utils/firebase";
import { setWithExpiry } from "@/utils/localstorage";
import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";

export async function customClaimsSign(customToken: string) {
	const result = await signInWithCustomToken(auth, customToken);
	const tokenResult = await result.user.getIdTokenResult(true);
	return tokenResult;
}

export async function sessionLogin(customToken: string) {
	const sessionCookie = await axios.get(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/session`,
		{
			params: {
				idtoken: customToken,
			},
		},
	);

	const session = sessionCookie.data;
	setWithExpiry(ACCESS_TOKEN, session.token, 60 * 60 * 24 * 5 * 100);
}
