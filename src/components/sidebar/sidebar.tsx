// Sidebar
// Description: Sidebar component
import { IoMdSettings } from "react-icons/io";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaPenToSquare } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa6";
import { useState } from "react";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import Link from "next/link";
import { Button } from "../ui/button";

const Sidebar = () => {
	const navlist = [
		{
			name: "อัดเสียง",
			icon: <FaMicrophone />,
			link: "/studio",
		},
		{
			name: "ฟังเสียง",
			icon: <FaPlay />,
			link: "/studio/listen",
		},
		{
			name: "เขียนประโยค",
			icon: <FaPenToSquare />,
			link: "/studio/write",
		},
		{
			name: "ตรวจทาน",
			icon: <BsFillPatchCheckFill />,
			link: "/studio/review",
		},

		{
			name: "ตั้งค่า",
			icon: <IoMdSettings />,
			link: "/setting",
		},
	];
	const [sidebarOpen, setSidebarOpen] = useState(true);

	return (
		<div className=" flex flex-row h-full">
			<div
				className={`flex  h-full
               bg-slate-50  transition-all duration-500 ease-in-out ${
									sidebarOpen ? "w-60" : "w-24"
								}`}
			>
				<div
					className="flex flex-col
                    items-start justify-start h-full px-6 "
				>
					<Button
						className="flex flex-row items-center justify-center h-20
						 transition-all duration-500 ease-in-out"
					variant={"ghost"}
					>
						<div
							className="flex flex-row items-center justify-center h-20
                         transition-all duration-500 ease-in-out"
							onClick={() => setSidebarOpen(!sidebarOpen)}
						>
							<div className="text-xl">
								{sidebarOpen ? <MdArrowBackIos /> : <MdArrowForwardIos />}
							</div>
						</div>
					</Button>

					{navlist.map((item, index) => (
						<Link
							href={item.link}
							key={index}
							className="flex flex-col items-center justify-center h-20 group-hover:bg-slate-300 "
						>
							<div className="flex flex-row space-x-2 items-center">
								<div
									className="text-2xl
                                hover:text-green-400 transition-all duration-500 ease-in-out "
								>
									{item.icon}
								</div>

								{sidebarOpen && (
									<p className=" text-sm font-bold">{item.name}</p>
								)}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
