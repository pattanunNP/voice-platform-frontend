import Layout from "@/components/layouts/layouts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VscMicFilled } from "react-icons/vsc";
import { MdRestartAlt } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { FaRegPlayCircle } from "react-icons/fa";
import { HiMiniPause } from "react-icons/hi2";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { useEffect, useState } from "react";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { LiveAudioVisualizer,AudioVisualizer } from "react-audio-visualize";
import pad from "@/utils/padd";

function Studio() {
	const [audioData, setAudioData] = useState<string | null>(null);
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

	const clearAudioElement = () => {
		const audio = document.querySelector("audio");
		if (audio) {
			audio.pause();
			audio.src = "";
			document.body.removeChild(audio);
		}
	};
	const convertSecToTime = (sec: number) => {
		const minutes = Math.floor(sec / 60);
		const seconds = sec - minutes * 60;
		return `${pad(String(minutes), 2)}:${pad(String(seconds), 2)}`;
	};

	return (
		<Layout>
			<div className="w-full h-screen flex flex-col my-10 items-center space-x-4 ">
				<div className="flex flex-row items-center justify-center">
					<p className="text-2xl">คลิก</p>
					<VscMicFilled className="text-3xl text-red-500" />
					<p className="text-2xl">แล้วอ่านประโยคข้างล่างนี้ดัง ๆ </p>
				</div>
				<Card className="flex my-5 px-4 py-4 flex-col justify-center items-center w-[820px] h-72 ring-blue-500 ring-1">
					<p className="text-3xl font-bold text-center font-sans">
						ไก่จิกเด็กตายบนปากโอ่ง ไก่เห็นตัวเองในน้ำ ไก่จึงรู้จักตัวเอง
					</p>
				</Card>
				<Button
					className="flex flex-row space-x-2 my-5 rounded-full w-32 h-10"
					variant={"outline"}
					onClick={() => {
						clearAudioElement();
						setAudioData(null);
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
							className="flex flex-row space-x-2  w-32 bg-emerald-500
						"
						>
							<IoIosSend className="text-2xl" />
							<p>ส่งไฟล์เสียง</p>
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
