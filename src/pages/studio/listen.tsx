import Layout from "@/components/layouts/layouts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaCheckCircle } from "react-icons/fa";
import { HiMiniPause } from "react-icons/hi2";
import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { useClipsFeed } from "@/api/clips/clips";
import { usePostClipReview } from "@/api/review/review";
import { ClipReview } from "@/types/review";
import { toast } from "sonner";

function StudioListen() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentItem, setCurrentItem] = useState(0);
	const [audioUrl, setAudioUrl] = useState("");
	const { submitClipReview } = usePostClipReview();
	const { clipsFeed, isLoading, refetchClipsFeed } = useClipsFeed();

	useEffect(() => {
		setAudioUrl(clipsFeed?.[currentItem]?.url);
	}, [clipsFeed, currentItem]);

	const playAudio = () => {
		setIsPlaying(true);
		const audio = new Audio(audioUrl);
		audio.play();
		audio.onended = () => {
			setIsPlaying(false);
		};
	};
	const nextSentence = () => {
		setIsPlaying(false);
		setCurrentItem(currentItem + 1);
		if (clipsFeed?.length === currentItem + 1) {
			console.log("refetch");
			refetchClipsFeed();
			setCurrentItem(0);
		}
	};

	const sumbitReview = async (is_correct: boolean, is_invalid: boolean) => {
		const clipId = clipsFeed?.[currentItem]?.id;
		const payload: ClipReview = {
			clipId: clipId,
			is_correct: is_correct,
			is_invalid: is_invalid,
		};

		const review = await submitClipReview(payload);
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
					<p className="text-2xl">คลิก</p>
					<FaPlay className="text-3xl text-emerald-500" />
					<p className="text-2xl">พวกเขาพูดประโยคถูกต้องหรือไม่?</p>
				</div>
				<Card className="flex my-5 px-4 py-4 flex-col justify-center items-center w-[820px] h-72 ring-blue-500 ring-1">
					{isLoading ? (
						<div className="w-64 h-6 animate-pulse rounded-lg bg-slate-300" />
					) : (
						clipsFeed &&
						clipsFeed?.length > 0 && (
							<p className="text-3xl font-bold text-center  font-sans">
								{clipsFeed?.[currentItem]?.sentence.content}
							</p>
						)
					)}
					{isLoading ? (
						<div className="mt-10 w-48 h-4 animate-pulse rounded-lg bg-slate-200" />
					) : (
						clipsFeed &&
						clipsFeed?.length > 0 && (
							<p className="mt-10 text-xs text-gray-400">
								ทีมา: {clipsFeed?.[currentItem]?.sentence.source}
							</p>
						)
					)}
				</Card>
				<Button
					className="flex flex-row space-x-2 my-5 rounded-full w-32 h-10"
					variant={"outline"}
					onClick={nextSentence}
				>
					<TbPlayerTrackNextFilled className="text-2xl" />
					<p className="text-xl ">ข้าม</p>
				</Button>

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
							onClick={playAudio}
							className="
							text-center
							items-center
							justify-center
							my-5 flex flex-row space-x-2 w-24 h-24 rounded-full"
							variant={"outline"}
						>
							{isPlaying ? (
								<HiMiniPause className="text-2xl text-red-500" />
							) : (
								<FaPlay className="text-2xl text-emerald-500" />
							)}
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

export default StudioListen;
