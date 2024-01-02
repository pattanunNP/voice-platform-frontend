import Layout from "@/components/layouts/layouts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VscLoading, VscMicFilled } from "react-icons/vsc";
import { MdRestartAlt } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { FaRegPlayCircle } from "react-icons/fa";
import { HiMiniPause } from "react-icons/hi2";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { useEffect, useState } from "react";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { LiveAudioVisualizer } from "@/components/liveaudio/LiveAudioVisualizer";
import pad from "@/utils/padd";
import { useSentenceFeed } from "@/api/sentences/sentence";
import { usePostClip } from "@/api/clips/clips";
import { toast } from "sonner";

function Studio() {
	const [audioData, setAudioData] = useState<string | null>(null);
	const { sentenceFeed, isLoading, refetchSentenceFeed } = useSentenceFeed();
	const { submitClip } = usePostClip();
	const [sentenceId, setSentenceId] = useState<string | null>(null);
	const [currentItem, setCurrentItem] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [audioFile, setAudioFile] = useState<File | null>(null);

	const {
		isRecording,
		recordingBlob,
		mediaRecorder,
		startRecording,
		recordingTime,
		stopRecording,
	} = useAudioRecorder();

	const playAudio = () => {
		const audio = new Audio(audioData!);
		audio.play();
	};

	useEffect(() => {
		if (!sentenceFeed) return;
		setSentenceId(sentenceFeed[currentItem]?.id as string);
	}, [currentItem, sentenceFeed]);

	useEffect(() => {
		if (!recordingBlob) return;
		addAudioElement(recordingBlob);
	}, [recordingBlob]);

	useEffect(() => {
		createAudioFile(recordingBlob!);
	}, [recordingBlob]);

	const createAudioFile = (blob: Blob) => {
		const hash = Math.random().toString(36).substring(2, 15);
		const filename = `${hash}.wav`;
		const file = new File([blob], filename);
		setAudioFile(file);
	};

	const addAudioElement = (blob: Blob) => {
		const url = URL.createObjectURL(blob);
		
		
		setAudioData(url);
	};

	const clearAudioElement = () => {
		if (audioData) {
			URL.revokeObjectURL(audioData);
			setAudioData(null);
		}
	};

	const convertSecToTime = (sec: number) => {
		const minutes = Math.floor(sec / 60);
		const seconds = sec - minutes * 60;
		return `${pad(String(minutes), 2)}:${pad(String(seconds), 2)}`;
	};

	const submitAudio = async () => {
		const formData = new FormData();
		formData.append("sentenceId", sentenceId!);
		formData.append("file", audioFile!);
		setIsSubmitting(true);
		await submitClip(formData);
		toast.success("ส่งไฟล์เสียงสำเร็จ", {
			position: "top-right",
			duration: 1500,
		});
		// console.log(response);
		setIsSubmitting(false);
		clearAudioElement();
		setCurrentItem(currentItem + 1);
		if (sentenceFeed?.length === currentItem + 1) {
			console.log("refetch");
			refetchSentenceFeed();
			setCurrentItem(0);
		}
	};

	const nextSentence = () => {
		setCurrentItem(currentItem + 1);
		if (sentenceFeed?.length === currentItem + 1) {
			console.log("refetch");
			refetchSentenceFeed();
			setCurrentItem(0);
		}
	};
	return (
		<Layout>
			<div className="w-full h-screen flex flex-col my-10 items-center space-x-4 ">
				<div className="flex flex-row items-center justify-center">
					<p className="text-2xl">คลิก</p>
					<VscMicFilled className="text-3xl text-red-500" />
					<p className="text-2xl">แล้วอ่านประโยคข้างล่างนี้ดัง ๆ </p>
				</div>
				{/* <p>{currentItem + 1}</p> */}
				<div className="w-full flex justify-center items-center">
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
				</div>

				<Button
					className="flex flex-row space-x-2 my-5 rounded-full w-32 h-10"
					variant={"outline"}
					onClick={() => {
						clearAudioElement();
						setAudioData(null);
						nextSentence();
					}}
				>
					<TbPlayerTrackNextFilled className="text-2xl" />
					<p className="text-xl ">ข้าม</p>
				</Button>

				<div className="flex flex-col space-x-2 justify-center items-center">
					<p className="text-2xl">
						เวลาที่อ่านไปแล้ว: {convertSecToTime(recordingTime)}
					</p>

					<div className="my-5">
						{mediaRecorder && (
							<LiveAudioVisualizer
								mediaRecorder={mediaRecorder}
								width={200}
								height={75}
								barColor={"#10b981"}
							/>
						)}
					</div>

					<Button
						onClick={isRecording ? stopRecording : startRecording}
						className="my-5 flex flex-row space-x-2 w-20 h-20 rounded-full"
						variant={"outline"}
					>
						{isRecording ? (
							<HiMiniPause className="text-2xl" />
						) : (
							<VscMicFilled className="text-2xl" />
						)}
					</Button>
					<div className="my-5 flex flex-row w-full space-x-4 items-center  justify-between">
						<Button
							onClick={() => {
								clearAudioElement();
								setAudioData(null);
							}}
							className="flex flex-row space-x-2 w-32"
							variant={"outline"}
						>
							<MdRestartAlt className="text-2xl" />
							<p>ลบเสียง</p>
						</Button>
						<Button
							onClick={submitAudio}
							disabled={!audioData}
							className="flex flex-row space-x-2  w-32 bg-emerald-500
						disabled:bg-gray-400 disabled:cursor-not-allowed
							"
						>
							{isSubmitting ? (
								<div className="flex items-center justify-center">
									<VscLoading className="w-5 h-5  rounded-full animate-spin" />
								</div>
							) : (
								<IoIosSend className="text-2xl" />
							)}

							{isSubmitting ? <p>กำลังส่ง</p> : <p>ส่งไฟล์เสียง</p>}
						</Button>
						<Button
							variant={"outline"}
							disabled={!audioData}
							className="flex flex-row space-x-2  w-32"
							onClick={playAudio}
						>
							<FaRegPlayCircle className="text-2xl" />
							<p>เล่นเสียง</p>
						</Button>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Studio;
