import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useProfile } from "@/api/user/user";
import { LogOut } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ACCESS_TOKEN } from "@/constants";
import { useRouter } from "next/router";
const Navbar: FC = () => {
	const navigate = useRouter();
	const logout = () => {
		navigate.push("/auth/login");
		localStorage.removeItem(ACCESS_TOKEN);
	};

	const { userdata, isLoading, refetchProfile } = useProfile();
	return (
		<nav className="sticky flex flex-col w-full">
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

						<div className="flex items-center  w-full px-6 flex-row space-x-4">
							{isLoading ? (
								<div className="w-32 h-4 animate-pulse rounded-xl bg-slate-300" />
							) : (
								<h1 className="text-white mx-2 truncate w-36">
									{userdata?.firstname}&nbsp;
									{userdata?.lastname}
								</h1>
							)}

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<div>
										{isLoading ? (
											<div className="w-12 h-12 animate-pulse rounded-full bg-slate-300" />
										) : (
											<Avatar>
												<AvatarFallback>UN</AvatarFallback>
												<AvatarImage src={userdata?.avatar_url} />
											</Avatar>
										)}
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56">
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />

									<DropdownMenuItem onClick={logout}>
										<LogOut className="mr-2 h-4 w-4 text-red-500" />
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</header>
		</nav>
	);
};

export default Navbar;
