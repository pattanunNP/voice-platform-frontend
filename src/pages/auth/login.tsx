import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { VscLoading } from "react-icons/vsc";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

import LandingNavbar from "@/components/navbar/landingnavbar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { customClaimsSign, sessionLogin } from "@/api/auth/auth";
import { useRouter } from "next/router";

const imageSlider = [
	{
		id: 1,
		tagline: "Unleash the Power of Voice Synthesis in Your Ads!",
		src: "/images/1.png",
	},
	{
		id: 2,
		tageline:
			"Elevate Your Brand with Crystal Clear Messages – Voice Synthesis Redefined.",
		src: "/images/2.png",
	},
	{
		id: 3,
		tageline:
			"Transform Words into Impact: Experience the Future of Advertising Voice.",
		src: "/images/3.png",
	},
	{
		id: 4,
		tageline:
			"Amplify Your Message Seamless Voice Synthesis for Unforgettable Ads.",
		src: "/images/4.png",
	},
	{
		id: 5,
		tageline:
			"Pitch Perfect Ads Elevate Your Brand's Voice with Innovative Synthesis.",
		src: "/images/5.png",
	},
	{
		id: 6,
		tageline:
			"Speak Boldly, Advertise Brilliantly: Revolutionize Your Ads with Voice Tech",
		src: "/images/6.png",
	},
	{
		id: 7,
		tageline:
			"Voice Synthesis Mastery Crafting Compelling Ad Narratives for Maximum Impact",
		src: "/images/7.png",
	},
];

interface IFormValues {
	email: string;
	password: string;
}

function Login() {
	const nagivation = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const { register, handleSubmit } = useForm<IFormValues>();


	async function login(data: IFormValues) {
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
			{
				email: data.email,
				password: data.password,
			},
		);

		const json = await res.data;
		const customToken = await customClaimsSign(json.token);
		console.log(customToken);
		await sessionLogin(customToken.token);
		setLoading(false);
		nagivation.push("/studio");
	}

	const onSubmit = async (data: IFormValues) => {
		setLoading(true);
		console.log(data);
		await login(data);
	};

	return (
		<main className={`min-h-screen h-screen  w-screen `}>
			<LandingNavbar />
			<div className="flex flex-row w-full h-full justify-between bg-white">
				<div className="flex w-1/2 h-full bg-none">
					<div className="relative flex h-full w-full justify-center items-center">
						<div className="z-10 absolute flex flex-col space-y-2 items-center justify-center">
							<h1 className="text-white text-4xl font-bold">
								Welcome to VerbiloVoice
							</h1>

							<p className="text-white text-xl  font-semibold">
								&quot;Elevate Your Brand with Crystal Clear Messages – Voice
								Synthesis Redefined&quot;
							</p>
						</div>

						<Swiper
							className="w-full h-full"
							modules={[Navigation, Pagination, Scrollbar, A11y]}
							spaceBetween={0}
							slidesPerView={1}
							autoplay={{
								delay: 500,
								disableOnInteraction: false,
							}}
							scrollbar={{ draggable: true }}
						>
							{imageSlider.map((item, index) => (
								<SwiperSlide key={index}>
									<Image
										src={item.src}
										width={1920}
										height={1000}
										className="
										opacity-100
										bg-blend-darken
										object-cover w-full h-full translate-opacity-0"
										alt={`silde-${index}`}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
				<div className="flex w-full h-full justify-center items-center px-10">
					<Card className="flex flex-col space-y-4 w-[450px] h-96 justify-center p-4 items-center ">
						<h1 className="text-black text-3xl font-semibold my-5">Login</h1>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col space-y-4 w-full items-start 
						  justify-start"
						>
							<label htmlFor="email">Email</label>
							<Input
								type="email"
								{...register("email", {
									required: true,
								})}
								id="email"
								placeholder="Email"
								className=" w-full h-12"
							/>
							<label htmlFor="password">Password</label>
							<Input
								type="password"
								{...register("password", {
									required: true,
								})}
								id="password"
								placeholder="Password"
								className="h-12 w-full"
							/>
							<Button
								type="submit"
								variant="default"
								className=" text-white  bg-emerald-500
							 rounded-xl h-12 w-full text-xl font-normal flex items-center justify-center space-x-4"
							>
								{loading && (
									<div className="flex items-center justify-center">
										<VscLoading className="w-5 h-5  rounded-full animate-spin" />
									</div>
								)}
								<p>Login</p>
							</Button>
						</form>
					</Card>
				</div>
			</div>
		</main>
	);
}

export default Login;
