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
import { useProfile, useUpdateProfile } from "@/api/user/user";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IFormValues {
	username: string;
	gender: string;
	age: number;
	firstname: string;
	lastname: string;
}

function Setting() {
	const { userdata } = useProfile();
	const { register, handleSubmit } = useForm<IFormValues>();
	const { updateProfile } = useUpdateProfile();

	const onSubmit = async (data: IFormValues) => {
		console.log(data);

		const payload = {
			...data,
			age: Number(data.age),
		};

		// await updateProfile(payload);
		// toast.success("บันทึกสำเร็จ", {
		// 	position: "top-right",
		// 	duration: 1500,
		// });
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
				<form
					className="my-10 grid grid-cols-2 gap-3"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div>
						<Label className="text-xs font-normal" htmlFor="name">
							ชื่อจริง
						</Label>
						<Input
							disabled
							defaultValue={userdata?.firstname}
							{...register("firstname")}
							placeholder="ชื่อจริง"
							className="w-[320px] h-10"
							id="name"
						/>
					</div>
					<div>
						<Label className="text-xs font-normal" htmlFor="name">
							นามสกุล
						</Label>
						<Input
							disabled
							defaultValue={userdata?.lastname}
							{...register("lastname")}
							placeholder="นามสกุล"
							className="w-[320px] h-10"
							id="name"
						/>
					</div>
					<div>
						<Label className="text-xs font-normal" htmlFor="name">
							ชื่อผู้ใช้
						</Label>
						<Input
							disabled
							defaultValue={userdata?.username}
							{...register("username")}
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
							disabled
							{...register("gender")}
							defaultValue={userdata?.gender}
							value={userdata?.gender}
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
							disabled
							{...register("age")}
							defaultValue={userdata?.age}
							placeholder="อายุ"
							className="w-[320px] h-10"
							id="age"
							type="number"
						/>
					</div>
				</form>
				<Button
				disabled
					type="submit"
					className="w-48 my-5 h-12 rounded-full justify-center items-center"
				>
					<span className="text-lg font-medium">บันทึก</span>
				</Button>
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
			</div>
		</Layout>
	);
}

export default Setting;
