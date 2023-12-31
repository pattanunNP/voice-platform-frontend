import Link from "next/link";

const Footer = () => {
	return (
		<div className="px-2 py-4 bg-black h-56 flex flex-col w-full justify-center items-center ">
			<div className="grid grid-cols-3 gap-10">
				<div className="flex flex-col justify-center">
					<h1 className="text-white text-xl font-semibold">เกี่ยวกับเรา</h1>
					<Link href="/">
						<p className="text-white hover:underline">
							นโยบายความเป็นส่วนตัว (Privacy Policy)
						</p>
					</Link>

					<Link href="/">
						<p className="text-white hover:underline">
							ข้อตกลงการใช้งาน (Terms of Service)
						</p>
					</Link>
				</div>
				<div className="flex flex-col">
					<h1 className="text-white text-xl font-semibol">ติดต่อเรา</h1>

					<a
						href="mailto:admin@voicalads.com"
						className="hover:underline text-white"
					>
						Email: admin@voicalads.com
					</a>
					<a href="tel:+66880406061" className="hover:underline text-white">
						Tel: (+66)88-040-6061
					</a>
				</div>
			</div>

			<div className="flex flex-row  justify-center items-center h-full">
				<p className="text-white font-bold">© 2021 Voice Platform</p>
			</div>
		</div>
	);
};

export default Footer;
