import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Inter } from "next/font/google";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import Navbar from "@/components/navbar/navbar";

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
const inter = Inter({ subsets: ["latin"] });


function Login() {
	return (
		<main className={`min-h-screen h-screen  w-screen ${inter.className}`}>
			<Navbar />
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
										height={1080}
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
						<h1 className="text-black text-3xl font-bold my-5">Login</h1>
						<form
							className="flex flex-col space-y-4 w-full items-start 
						  justify-start"
						>
							<label htmlFor="email">Email</label>
							<Input
								type="email"
								name="email"
								id="email"
								className=" w-full h-12"
							/>
							<label htmlFor="password">Password</label>
							<Input
								type="password"
								name="password"
								id="password"
								className="h-12 w-full"
							/>
							<Button
								variant="default"
								className=" text-white 
							 rounded-xl h-12 w-full text-xl font-normal"
							>
								Login
							</Button>
						</form>
					</Card>
				</div>
			</div>
		</main>
	);
}

export default Login;
