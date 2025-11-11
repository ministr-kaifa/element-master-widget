import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function TokenPrompt({
  onTokenSet,
}: Readonly<{
  onTokenSet: (token: string) => Promise<string>;
}>) {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = value.trim();
    if (!token) {
      setErrorMessage("Пустой токен");
      return;
    }
    const result = await onTokenSet(token);
    if (result) {
      setErrorMessage(result);
    }
    setValue("");
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              type="text"
              value={value}
              onChange={e => {
                setValue(e.target.value);
                setErrorMessage("");
              }}
              placeholder="Токен"
            />
            {errorMessage !== "" && (
              <div className="text-red-600 text-sm mt-1">{errorMessage}</div>
            )}
            <Button type="submit" className="mt-2">OK</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
