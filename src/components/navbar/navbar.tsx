import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";

const Navbar: FC = () => {
	return (
		<div className="flex flex-col w-full">
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
							<Link
								href="/studio"
								className="flex flex-row space-x-2 items-center w-72"
							>
								สตูดิโอ
							</Link>
							<Link
								href="/"
								className="flex flex-row space-x-2 items-center w-72"
							>
								คลังเสียง
							</Link>
							<Link
								href="/"
								className="flex flex-row space-x-2 items-center w-72"
							>
								นักพัฒนา
							</Link>
							<Link
								href="/"
								className="flex flex-row space-x-2 items-center w-72"
							>
								ราคา
							</Link>
						</div>

						<div className="flex items-center  w-full px-6">
							<h1 className="text-white mx-2">Pattanan Numpong</h1>
							<Avatar>
								<AvatarFallback>UN</AvatarFallback>
								<AvatarImage src="https://ui-avatars.com/api/?background=random&name=Arm" />
							</Avatar>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Navbar;
