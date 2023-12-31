import { FC, use } from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const LandingNavbar: FC = () => {
	const navigate = useRouter();
	return (
		<nav className="z-10 fixed flex flex-col w-full">
			<header className="shrink-0 border-b w-full border-gray-200 bg-gray-950">
				<div className="flex flex-row w-full text-white h-20 items-center justify-between px-2  space-x-4 ">
					<div className="flex flex-row space-x-2 items-center w-96">
						<Image
							className="h-8 w-auto rounded-full"
							src="/VerbiloVoice.svg"
							alt="VerbiloVoice"
							width={32}
							height={32}
						/>
						<h1 className="text-2xl font-bold text-white">VerbiloVoice</h1>
						<Badge className="bg-emerald-400">Studio</Badge>
					</div>

					<div className="flex flex-row justify-end w-80">
						<div className="flex flex-row space-x-2 w-full ">
							<a
								href="/studio"
								className="flex flex-row space-x-2 items-center w-72"
							>
								สตูดิโอ
							</a>
							<a
								href="/"
								className="flex flex-row space-x-2 items-center w-72"
							>
								คลังเสียง
							</a>
							<a href="/" className="flex flex-row space-x-2 items-center w-72">
								นักพัฒนา
							</a>
							<a href="/" className="flex flex-row space-x-2 items-center w-72">
								ราคา
							</a>
						</div>

						<div className="flex flex-row space-x-4">
							<Button
								onClick={() => {
									navigate.push("/auth/login");
								}}
								variant={"outline"}
								className="text-emerald-500 bg-none"
							>
								Sign In
							</Button>
							<Button className="bg-emerald-500 text-white">Sign Up</Button>
						</div>
					</div>
				</div>
			</header>
		</nav>
	);
};

export default LandingNavbar;
