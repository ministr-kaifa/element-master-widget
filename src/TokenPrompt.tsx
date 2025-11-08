import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { setToken } from "./utils/tokenStorage"

export default function TokenPrompt({ onTokenSet }: { onTokenSet: () => void }) {
  const [value, setValue] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!value.trim()) return
    setToken(value.trim())
    onTokenSet()
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-lg">
            Введите токен вашего аккаунта
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="API Token"
            />
            <Button type="submit">OK</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
