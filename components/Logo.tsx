import { PiggyBank } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

function Logo({}: Props) {
	return (
		<Link href="/" className="flex items-center gap-2">
			<PiggyBank className="stroke h-11 w-11 stroke-purple-500 stroke-[1.5]" />
			<p className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
				BudgetTracker
			</p>
		</Link>
	);
}

export default Logo;
