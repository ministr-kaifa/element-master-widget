import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode, isValidElement, useState } from "react";

export type ActionItemProps = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onClick?: () => Promise<void>;
};

export function ActionItemBase({
  id,
  title,
  description,
  imageUrl,
  onClick,
}: Readonly<ActionItemProps>) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!onClick) return;
    setLoading(true);
    onClick()
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <Card
      key={id}
      className={`cursor-pointer transition-shadow flex ${loading ? "bg-gray-700" : "hover:shadow-lg"}`}
      onClick={handleClick}
    >
      <img
        src={imageUrl}
        alt={title}
        className={`w-24 h-24 object-cover rounded-md flex-shrink-0 m-4 ${loading ? "filter brightness-30" : ""}`}
      />
      <CardContent className="flex flex-col justify-center">
        <CardHeader className="p-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {loading && <div className="text-sm text-gray-200 mt-1">Загрузка...</div>}
      </CardContent>
    </Card>
  );
}

export type ActionListItem = ActionItemProps | ReactNode

export interface ActionListProps {
  items: ActionListItem[]
}

/**
 * Компонент списка действий. Принимает как объекты, так и React-элементы.
 */
export function ActionList({ items }: Readonly<ActionListProps>) {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto max-h-[calc(100vh-64px)]">
      {items.map((item, index) => {
        if (isValidElement(item)) {
          return <div key={item.key ?? index}>{item}</div>
        }

        // если это объект с ActionItemProps
        if (
          typeof item === "object" &&
          item !== null &&
          "id" in item &&
          "title" in item &&
          "description" in item &&
          "imageUrl" in item
        ) {
          return <ActionItemBase key={item.id} {...item} />
        }

        // fallback для всего прочего (string, null и т.п.)
        return null
      })}
    </div>
  )
}
