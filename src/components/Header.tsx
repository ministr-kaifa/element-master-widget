// src/components/Header.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ApplicationConfig } from "@/config"

type HeaderProps = {
  config: ApplicationConfig
  onLogout: () => void
}

export function Header({ config, onLogout }: Readonly<HeaderProps>) {
  return (
    <header className="w-full flex justify-between items-center px-8 py-4 bg-gray-800/30 backdrop-blur-lg text-white fixed top-0 left-0 z-50">
      <div className="text-lg font-bold">Master widget</div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0">
            <Avatar className="w-10 h-10">
              {config.avatarUrl ? (
                <AvatarImage src={config.avatarUrl} alt="avatar" />
              ) : (
                <AvatarFallback>{config.displayName?.[0] ?? "?"}</AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="cursor-default pointer-events-none">{config.displayName ?? "User"}</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600" onSelect={onLogout}>
            Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
