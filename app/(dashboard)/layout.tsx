import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
	return (
		<section className="relative flex h-screen w-full flex-col">
			<Navbar />
			<section className="w-full">{children}</section>
		</section>
	);
}

export default layout;
