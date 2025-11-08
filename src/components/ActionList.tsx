import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type ActionItem = {
  id: string
  title: string
  description: string
  imageUrl: string
  onClick: () => void
}

type ActionListProps = {
  items: ActionItem[]
}

export function ActionList({ items }: Readonly<ActionListProps>) {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto max-h-[calc(100vh-64px)]">
      {items.map(item => (
        <Card
          key={item.id}
          className="cursor-pointer hover:shadow-lg transition-shadow flex"
          onClick={item.onClick}
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-24 h-24 object-cover rounded-md flex-shrink-0 m-4"
          />
          <CardContent className="flex flex-col justify-center">
            <CardHeader className="p-0">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
