"use client";

import React, { useState } from "react";
import { Logo, LogoMobile } from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { ThemeSwitcherButton } from "./ThemeSwitcherButton";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

type Props = {};

function Navbar({}: Props) {
	return (
		<>
			<DesktopNavbar />
			<MobileNavbar />
		</>
	);
}

const navLinks = [
	{ label: "Dashboard", link: "/" },
	{ label: "Transactions", link: "/transactions" },
	{ label: "Manage", link: "/manage" },
];

function MobileNavbar() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<section className="block border-separate bg-background md:hidden">
			<nav className="container flex items-center justify-between px-2">
				<section className="flex h-[80px] min-h-[60px] items-center gap-x-4 pl-2">
					<LogoMobile />
				</section>
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button variant={"ghost"} size={"icon"}>
							<Menu />
						</Button>
					</SheetTrigger>
					<SheetContent
						className="w-[400px] sm:w-[540px]"
						side="right"
					>
						<section className="flex flex-col items-end gap-1 pt-6 pr-4">
							{navLinks.map((navLink) => (
								<NavbarItem
									key={navLink.label}
									link={navLink.link}
									label={navLink.label}
									clickCallback={() =>
										setIsOpen((prev) => !prev)
									}
								/>
							))}
						</section>
					</SheetContent>
				</Sheet>
				<section className="flex items-center gap-2">
					<ThemeSwitcherButton />
					<UserButton afterSwitchSessionUrl="/sign-in" />
				</section>
			</nav>
		</section>
	);
}

function DesktopNavbar() {
	return (
		<section className="hidden border-separate border-b bg-background md:block">
			<nav className="container flex items-center justify-between px-8">
				<section className="flex h-[80px] min-h-[60px] items-center gap-x-4">
					<Logo />
					<section className="flex h-full">
						{navLinks.map((navLink) => (
							<NavbarItem
								key={navLink.label}
								link={navLink.link}
								label={navLink.label}
							/>
						))}
					</section>
				</section>
				<section className="flex items-center gap-6">
					<ThemeSwitcherButton />
					<UserButton afterSwitchSessionUrl="/sign-in" />
				</section>
			</nav>
		</section>
	);
}

function NavbarItem({
	label,
	link,
	clickCallback,
}: {
	label: string;
	link: string;
	clickCallback?: () => void;
}) {
	const pathname = usePathname();
	const isActive = pathname === link;
	return (
		<section className="relative flex items-center">
			<Link
				href={link}
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"w-full justify-start text-lg text-muted-foreground hover:text-foreground",
					isActive && "text-foreground"
				)}
				onClick={() => {
					if (clickCallback) clickCallback();
				}}
			>
				{label}
			</Link>

			{isActive && (
				<section className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block"></section>
			)}
		</section>
	);
}

export default Navbar;
