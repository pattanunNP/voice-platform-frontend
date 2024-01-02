import Layout from "@/components/layouts/layouts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useState } from "react";
import { useSentenceFeed } from "@/api/sentences/sentence";
import { toast } from "sonner";
import { SentenceReview } from "@/types/review";
import { usePostSentenceReview } from "@/api/review/review";

function StudioReview() {
	const { sentenceFeed, isLoading, refetchSentenceFeed } = useSentenceFeed();
	const { submitSentenceReview } = usePostSentenceReview();
	const [currentItem, setCurrentItem] = useState(0);

	const nextSentence = () => {
		setCurrentItem(currentItem + 1);
		if (sentenceFeed?.length === currentItem + 1) {
			console.log("refetch");
			refetchSentenceFeed();
			setCurrentItem(0);
		}
	};

	const sumbitReview = async (is_correct: boolean, is_invalid: boolean) => {
		const sentenceId = sentenceFeed?.[currentItem]?.id as string;
		const payload: SentenceReview = {
			sentenceId: sentenceId,
			is_correct: false,
			is_invalid: false,
		};

		const review = await submitSentenceReview(payload);
		if (review.status === 201) {
			toast.success("บันทึกสำเร็จ", {
				position: "top-right",
				duration: 1500,
			});
			nextSentence();
		} else {
			toast.error("บันทึกไม่สำเร็จ", {
				position: "top-right",
				duration: 1500,
			});
		}
	};
	return (
		<Layout>
			<div className="w-full h-full flex flex-col my-10 items-center space-x-4 ">
				<div className="flex flex-row items-center justify-center">
					<p className="text-2xl">ตรวจทาน</p>
					<BsFillPatchCheckFill className="text-3xl text-emerald-500" />
					<p className="text-2xl">ประโยคนี้ถูกหรือไม่?</p>
				</div>
				<div className="flex flex-row space-x-4">
					<Card className="flex my-5 px-4 py-4 flex-col justify-center items-center w-[720px] h-80 ring-blue-500 ring-1">
						{isLoading ? (
							<div className="w-64 h-6 animate-pulse rounded-lg bg-slate-300" />
						) : (
							sentenceFeed &&
							sentenceFeed?.length > 0 && (
								<p className="text-3xl font-bold text-center  font-sans">
									{sentenceFeed?.[currentItem]?.content}
								</p>
							)
						)}
						{isLoading ? (
							<div className="mt-10 w-48 h-4 animate-pulse rounded-lg bg-slate-200" />
						) : (
							sentenceFeed &&
							sentenceFeed?.length > 0 && (
								<p className="mt-10 text-xs text-gray-400">
									ทีมา: {sentenceFeed?.[currentItem]?.source}
								</p>
							)
						)}
					</Card>
					<Card className="px-4 py-4  w-[320px]">
						<h1 className="text-xl font-medium">
							ประโยคตรงตามหลักเกณฑ์หรือไม่?
						</h1>
						<ul className="mx-auto  px-2 list-disc">
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
							onClick={() => {
								sumbitReview(true, false);
							}}
							className="
							bg-emerald-500
							text-white
							flex flex-row space-x-2 w-32 rounded-full h-14"
							variant={"outline"}
						>
							<FaCheckCircle className="text-2xl" />
							<p>ถูกต้อง</p>
						</Button>
						<Button
							onClick={nextSentence}
							className="flex flex-row space-x-2 h-14 my-5 rounded-full w-32 "
							variant={"outline"}
						>
							<TbPlayerTrackNextFilled className="text-2xl" />
							<p className="text-xl ">ข้าม</p>
						</Button>
						<Button
							onClick={() => {
								sumbitReview(false, true);
							}}
							variant={"outline"}
							className="
							bg-red-500
							text-white
							flex flex-row space-x-2  w-32 h-14 rounded-full"
						>
							<ImCross className="text-2xl" />
							<p>ไม่ถูกต้อง</p>
						</Button>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default StudioReview;
