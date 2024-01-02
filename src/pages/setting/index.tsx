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
import { useProfile } from "@/api/user/user";
import { useForm } from "react-hook-form";

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
interface IFormValues {
	username: string;
	gender: string;
	age: number;
}

function Setting() {
	const { userdata } = useProfile();

	const [language, setLanguage] = useState(["th"]);
	const { register, handleSubmit } = useForm<IFormValues>({
		defaultValues: {
			username: userdata?.username,
			gender: userdata?.gender,
		},
	});

	const onSubmit = (data: IFormValues) => {
		console.log(data);
	};

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
							defaultValue={userdata?.username}
							{...register("username", { required: true })}
							placeholder="ชื่อผู้ใช้"
							className="w-[320px] h-10"
							id="name"
						/>
					</div>
					<div>
						<Label className="text-xs font-normal" htmlFor="gender">
							เพศสภาพ
						</Label>
						<Select
							{...register("age", { required: true })}
							defaultValue={userdata?.gender}
						>
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
						<Input
							{...register("age", { required: true })}
							defaultValue={userdata?.age}
							placeholder="อายุ"
							className="w-[320px] h-10"
							id="age"
							type="number"
						/>
					</div>
				</div>
				<div className="my-10 ">
					<h1 className="text-3xl font-medium">ภาษา</h1>
					<div className="my-2 flex flex-col space-y-5">
						{userdata?.languages.map((lang, index) => (
							<Card
								key={index}
								className="w-full h-full shadow-xs px-4 py-6 flex flex-col space-y-4 ring-1 ring-gray-100"
							>
								<Label className="text-xl font-semibold">
									ภาษาที่ {index + 1}
								</Label>
								<div>
									<Label className="text-md font-normal" htmlFor="lang">
										ภาษา: {lang.language.name}
									</Label>
									{/* <Select name="lang">
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
									</Select> */}
								</div>

								<div>
									<Label className="text-md font-normal" htmlFor="accent">
										สำเนียง: {lang.Accent.name}
									</Label>
									{/* <Select name="accent">
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
									</Select> */}
								</div>
								{/* <Button
									disabled={index === 0}
									variant={"outline"}
									className="w-full h-10 ring-red-500 ring-1 text-red-500 hover:bg-red-500 hover:text-white disabled:ring-gray-500 disabled:text-gray-500 disabled:border-gray-500"
									onClick={() =>
										setLanguage(language.filter((_, i) => i !== index))
									}
								>
									<span className="text-sm font-medium">ลบภาษา</span>
								</Button> */}
							</Card>
						))}
					</div>
					{/* <Button
						disabled={language.length >= 2}
						variant={"outline"}
						className="w-full my-10 h-14 ring-1 ring-emerald-500
						disabled:ring-gray-500 disabled:text-gray-500 disabled:border-gray-500
						"
						onClick={() => setLanguage([...language, "th"])}
					>
						<FaCirclePlus className="mr-2 text-2xl text-emerald-500" />
						<span className="text-lg font-medium">เพิ่มภาษา</span>
					</Button> */}
				</div>
				<Button
					onClick={handleSubmit(onSubmit)}
					className="w-48 my-5 h-12 rounded-full justify-center items-center"
				>
					<span className="text-lg font-medium">บันทึก</span>
				</Button>
			</div>
		</Layout>
	);
}

export default Setting;
