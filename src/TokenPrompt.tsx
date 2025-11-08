import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function TokenPrompt({ onTokenSet }: Readonly<{ onTokenSet: (token: string) => void }>) {
  const [value, setValue] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = value.trim()
    if (!token) return;
    onTokenSet(token);
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
              placeholder="Токен"
            />
            <Button type="submit">OK</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
