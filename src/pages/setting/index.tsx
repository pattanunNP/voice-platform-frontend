import Layout from "@/components/layouts/layouts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaCirclePlus } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

const supportedLanguage = [
	{
		label: "ภาษาไทย",
		value: "th",
	},
	{
		label: "ภาษาอังกฤษ",
		value: "en",
	},
];

const accent = [
	{
		label: "ภาษาไทย (เหนือ)",
		value: "th-northern",
	},
	{
		label: "ภาษาไทย (กลาง)",
		value: "th-central",
	},
	{
		label: "ภาษาไทย (ใต้)",
		value: "th-southern",
	},
	{
		label: "ภาษาอังกฤษ (อังกฤษ)",
		value: "en-gb",
	},
	{
		label: "ภาษาอังกฤษ (อเมริกัน)",
		value: "en-us",
	},
	{
		label: "ภาษาอังกฤษ (ออสเตรเลีย)",
		value: "en-au",
	},
	{
		label: "ภาษาอังกฤษ (อินเดีย)",
		value: "en-in",
	},
	{
		label: "ภาษาอังกฤษ (เกาหลี)",
		value: "en-kr",
	},
	{
		label: "ภาษาอังกฤษ (ญี่ปุ่น)",
		value: "en-jp",
	},
	{
		label: "ภาษาอังกฤษ (จีน)",
		value: "en-cn",
	},
	{
		label: "ภาษาอังกฤษ (ฝรั่งเศส)",
		value: "en-fr",
	},
	{
		label: "ภาษาอังกฤษ (เยอรมัน)",
		value: "en-de",
	},
	{
		label: "ภาษาอังกฤษ (อิตาลี)",
		value: "en-it",
	},
	{
		label: "ภาษาอังกฤษ (สเปน)",
		value: "en-es",
	},
	{
		label: "ภาษาอังกฤษ (โปรตุเกส)",
		value: "en-pt",
	},
	{
		label: "ภาษาอังกฤษ (เบลเยียม)",
		value: "en-be",
	},
	{
		label: "ภาษาอังกฤษ (สวีเดน)",
		value: "en-se",
	},
	{
		label: "ภาษาอังกฤษ (เดนมาร์ก)",
		value: "en-dk",
	},
	{
		label: "ภาษาอังกฤษ (โปแลนด์)",
		value: "en-pl",
	},
];
function Setting() {
	const [language, setLanguage] = useState(["th"]);

	return (
		<Layout>
			<div className="w-full h-full flex flex-col min-h-full px-6 py-10">
				<h1 className="text-3xl font-semibold">โปรไฟล์</h1>
				<p className="w-[650px]">
					การให้ข้อมูลบางอย่างเกี่ยวกับตัวคุณเองจะทำให้ข้อมูลเสียงที่คุณส่งมายัง
					VerbiloVoice
					มีประโยชน์ต่อการเพิ่มความแม่นยำของกลไกการรู้จำเสียงพูดซึ่งใช้ข้อมูลนี้มากขึ้น
				</p>
				<div className="my-10 grid grid-cols-2 gap-3">
					<div>
						<Label className="text-xs font-normal" htmlFor="name">
							ชื่อ
						</Label>
						<Input
							placeholder="ชื่อผู้ใช้"
							className="w-[320px] h-10"
							id="name"
						/>
					</div>
					<div>
						<Label className="text-xs font-normal" htmlFor="gender">
							เพศสภาพ
						</Label>
						<Select name="gender">
							<SelectTrigger className="w-[320px]">
								<SelectValue placeholder="เลือกเพศ" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>เพศสภาพ</SelectLabel>
									<SelectItem value="male">ชาย</SelectItem>
									<SelectItem value="female">หญิง</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div>
						<Label className="text-xs font-normal" htmlFor="age">
							อายุ
						</Label>
						<Select name="age">
							<SelectTrigger className="w-[320px]">
								<SelectValue placeholder="เลือกช่วงอายุ" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>ช่วงอายุ</SelectLabel>
									<SelectItem value="5-10">5-10 ปี</SelectItem>
									<SelectItem value="11-14">11-14 ปี</SelectItem>
									<SelectItem value="15-18">15-18 ปี</SelectItem>
									<SelectItem value="19-20">19-20 ปี</SelectItem>
									<SelectItem value="21-25">21-25 ปี</SelectItem>
									<SelectItem value="26-30">26-30 ปี</SelectItem>
									<SelectItem value="31-35">31-35 ปี</SelectItem>
									<SelectItem value="36-40">36-40 ปี</SelectItem>
									<SelectItem value="41-45">41-45 ปี</SelectItem>
									<SelectItem value="46-50">46-50 ปี</SelectItem>
									<SelectItem value="51-55">51-55 ปี</SelectItem>
									<SelectItem value="56-60">56-60 ปี</SelectItem>
									<SelectItem value="60+">60+ ปี</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="my-10 ">
					<h1 className="text-3xl font-medium">ภาษา</h1>
					<div className="my-2 flex flex-col space-y-5">
						{language.map((lang, index) => (
							<Card
								key={index}
								className="w-full h-72 shadow-xs px-4 py-6 flex flex-col space-y-4 ring-1 ring-gray-100"
							>
								<Label className="text-xl font-semibold">
									ภาษาที่ {index + 1}
								</Label>
								<div>
									<Label className="text-xs font-normal" htmlFor="lang">
										เลือกภาษา
									</Label>
									<Select name="lang">
										<SelectTrigger className="w-[320px]">
											<SelectValue placeholder="เลือกภาษา" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>ภาษา</SelectLabel>
												{supportedLanguage.map((lang, index) => (
													<SelectItem
														key={`s-${lang.value}`}
														value={lang.value}
													>
														{lang.label}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>

								<div>
									<Label className="text-xs font-normal" htmlFor="accent">
										สำเนียง
									</Label>
									<Select name="accent">
										<SelectTrigger className="w-[320px]">
											<SelectValue placeholder="เลือกสำเนียง" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>สำเนียง</SelectLabel>
												{accent.map((lang, index) => (
													<SelectItem
														key={`s-${lang.value}`}
														value={lang.value}
													>
														{lang.label}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
								<Button
									variant={"outline"}
									className="w-full h-10 ring-red-500 ring-1 text-red-500 hover:bg-red-500 hover:text-white"
									onClick={() =>
										setLanguage(language.filter((_, i) => i !== index))
									}
								>
									<span className="text-sm font-medium">ลบภาษา</span>
								</Button>
							</Card>
						))}
					</div>
					<Button
						variant={"outline"}
						className="w-full my-10 h-14 ring-1 ring-emerald-500"
						onClick={() => setLanguage([...language, "th"])}
					>
						<FaCirclePlus className="mr-2 text-2xl text-emerald-500" />
						<span className="text-lg font-medium">เพิ่มภาษา</span>
					</Button>
				</div>
			</div>
		</Layout>
	);
}

export default Setting;
