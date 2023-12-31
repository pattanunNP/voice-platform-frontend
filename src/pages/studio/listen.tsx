import Layout from "@/components/layouts/layouts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaCheckCircle } from "react-icons/fa";
import { HiMiniPause } from "react-icons/hi2";
import { ImCross } from "react-icons/im";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { useEffect, useState } from "react";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { LiveAudioVisualizer } from "react-audio-visualize";
import { FaPlay } from "react-icons/fa";
import pad from "@/utils/padd";

function StudioListen() {
	const [audioData, setAudioData] = useState<string | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const {
		isRecording,
		recordingBlob,
		mediaRecorder,
		startRecording,
		recordingTime,
		stopRecording,
	} = useAudioRecorder();

	useEffect(() => {
		if (!recordingBlob) return;

		// recordingBlob will be present at this point after 'stopRecording' has been called
		addAudioElement(recordingBlob);
	}, [recordingBlob]);

	const addAudioElement = (blob: Blob) => {
		const url = URL.createObjectURL(blob);
		const audio = document.createElement("audio");
		audio.src = url;
		audio.controls = true;
		// document.body.appendChild(audio);
		setAudioData(url);
	};

	const playAudio = () => {
		setIsPlaying(true);
		const audio = new Audio(audioData!);
		audio.play();
	};

	const convertSecToTime = (sec: number) => {
		const minutes = Math.floor(sec / 60);
		const seconds = sec - minutes * 60;
		return `${pad(String(minutes), 2)}:${pad(String(seconds), 2)}`;
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
					<p className="text-3xl font-bold text-center font-sans">
						เรียน รองคณบดีฝ่ายกิจการนักศึกษา คณะสังคมวิทยาและมานุษยวิทยา
					</p>
				</Card>
				<Button
					className="flex flex-row space-x-2 my-5 rounded-full w-32 h-10"
					variant={"outline"}
					onClick={() => {
						playAudio();
						setAudioData(null);
					}}
				>
					<TbPlayerTrackNextFilled className="text-2xl" />
					<p className="text-xl ">ข้าม</p>
				</Button>

				<div className="flex flex-col space-x-2 justify-center items-center">
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

					<div className="my-5 flex flex-row w-full space-x-4 items-center  justify-between">
						<Button
							onClick={() => {
								setAudioData(null);
							}}
							className="flex flex-row space-x-2 w-32 rounded-full h-14"
							variant={"outline"}
						>
							<FaCheckCircle className="text-2xl" />
							<p>ใช่</p>
						</Button>
						<Button
							onClick={isRecording ? stopRecording : startRecording}
							className="my-5 flex flex-row space-x-2 w-20 h-20 rounded-full"
							variant={"outline"}
						>
							{isPlaying ? (
								<HiMiniPause className="text-2xl" />
							) : (
								<FaPlay className="text-2xl text-emerald-500" />
							)}
						</Button>
						<Button
							variant={"outline"}
							className="flex flex-row space-x-2  w-32 h-14 rounded-full"
							onClick={playAudio}
						>
							<ImCross className="text-2xl" />
							<p>ไม่ใช่</p>
						</Button>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default StudioListen;
