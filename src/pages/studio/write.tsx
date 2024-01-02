import Layout from "@/components/layouts/layouts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaPen } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { IoIosSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { ISentenceCreateInput } from "@/types/sentence";
import { useCreateSentence } from "@/api/sentences/sentence";

interface IFormValues {
	content: string;
	source: string;
}

function StudioWrite() {
	const { register, handleSubmit } = useForm<IFormValues>();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const { submitSentence } = useCreateSentence();

	const onSubmit = async (data: IFormValues) => {
		setIsSubmitting(true);

		const payload: ISentenceCreateInput = {
			content: data.content,
			source: data.source,
			languageId: "2",
		};
		// console.log(payload);
		await submitSentence(payload);
		setIsSubmitting(false);
	};
	return (
		<Layout>
			<div className="w-full h-full flex flex-col my-10 items-center space-x-4 ">
				<div className="flex flex-row items-center justify-center">
					<p className="text-2xl">เขียนประโยค</p>
					<FaPen className="text-2xl text-emerald-500" />
					<p className="text-2xl">เพื่อช่วยเราเพิ่มข้อมูล</p>
				</div>
				<div className="flex flex-row space-x-4">
					<form className="flex my-5 px-4 py-4 space-y-2 flex-col justify-center items-center w-[800px] h-72 ">
						<div className="grid w-full gap-1.5">
							<Label htmlFor="message-2">ประโยค</Label>
							<Textarea
								rows={4}
								placeholder="พิมพ์ประโยคของคุณที่นี่.. "
								{...register("content", { required: true })}
								id="message-2"
								className="text-lg"
							/>
						</div>
						<div className=" grid w-full gap-1.5">
							<Label className="mt-5" htmlFor="ref">
								ที่มา
							</Label>
							<Input
								id="ref"
								{...register("source", { required: true })}
								placeholder="พิมพ์ที่มาของคุณที่นี่.."
								type="text"
							/>
						</div>
					</form>
					<Card className="px-4 py-4  w-[320px]">
						<h1 className="text-xl font-medium">
							ประโยคตรงตามหลักเกณฑ์หรือไม่?
						</h1>
						<ul className="mx-auto  px-2 list-disc">
							<li>
								ไม่มีข้อจำกัดลิขสิทธิ์{" "}
								<a
									className="text-blue-500 underline"
									href="https://en.wikipedia.org/wiki/Public_domain"
								>
									ลิขสิทธิ์ (cc-0)
								</a>
							</li>
							<li>น้อยกว่า 15 คำ</li>
							<li>ใช้ไวยากรณ์ที่ถูกต้อง</li>
							<li>ใช้ตัวสะกดและเครื่องหมายวรรคตอนให้ถูกต้อง</li>
							<li>ไม่มีตัวเลขและอักขระพิเศษ</li>
							<li>ไม่มีตัวอักษรต่างประเทศ</li>
							<li>ใส่การอ้างอิงที่เหมาะสม</li>
							<li>ควรเป็นธรรมชาติและเป็นบทสนทนา (ควรอ่านประโยคได้ง่าย)</li>
						</ul>
					</Card>
				</div>

				<div className="flex flex-col space-x-2 justify-center items-center">
					<div className="my-5 flex flex-row w-full space-x-4 items-center  justify-between">
						<Button
							onClick={handleSubmit(onSubmit)}
							className="flex flex-row space-x-2 h-14 my-5 rounded-full w-32 "
							variant={"outline"}
						>
							{isSubmitting ? (
								<div className="flex items-center justify-center">
									<VscLoading className="w-5 h-5  rounded-full animate-spin" />
								</div>
							) : (
								<IoIosSend className="text-2xl" />
							)}

							{isSubmitting ? (
								<p className="text-xl ">กำลังส่ง</p>
							) : (
								<p className="text-xl ">ส่ง</p>
							)}
						</Button>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default StudioWrite;
