// Layout for the voice platform frontend

// import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import { Toaster } from "sonner";

interface LayoutProps {
	children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {

	
	return (
		<div className="flex flex-col w-screen h-screen">
			<Navbar />

			<div className="flex flex-rowh-full">
				<Sidebar />
				<Toaster />
				<div className="flex-col w-full h-full flex">
					<div >{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
