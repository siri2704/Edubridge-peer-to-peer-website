"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Logo } from "@/components/logo"

export function MainNav() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  // Check if user is logged in (this would be replaced with actual auth check)
  React.useEffect(() => {
    const token = localStorage.getItem("edubridge-token")
    setIsLoggedIn(!!token)
  }, [])

  // Always show the navbar for logged-in students
  const isStudent = typeof window !== "undefined" && localStorage.getItem("edubridge-role") === "user";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        {isStudent && isLoggedIn && (
          <NavigationMenu className="mx-6 hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {features.map((feature) => (
                      <ListItem key={feature.title} title={feature.title} href={feature.href}>
                        {feature.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/mentors" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Find Mentors</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/study-groups" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Study Groups</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/resources" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Resources</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>About Us</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/ai-assistant" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>AI Assistant</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/ai-teacher" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>AI Teacher</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          {isLoggedIn ? (
            <Button
              variant="ghost"
              onClick={() => {
                localStorage.removeItem("edubridge-token");
                localStorage.removeItem("edubridge-role");
                window.location.href = "/login";
              }}
            >
              Logout
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  )
}

const features = [
  {
    title: "Peer Mentorship",
    href: "/mentors",
    description: "Connect with peers for 1-on-1 mentorship sessions through video calls.",
  },
  {
    title: "Study Groups",
    href: "/study-groups",
    description: "Join or create interactive study groups with real-time collaboration.",
  },
  {
    title: "Features",
    href: "/features",
    description: "Explore the unique features of EduBridge designed for collaborative learning.",
  },
]

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
