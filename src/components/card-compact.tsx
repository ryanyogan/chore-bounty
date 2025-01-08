import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface CardCompactProps {
  title: string;
  description: string;
  className?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
}

export function CardCompact(props: CardCompactProps) {
  return (
    <Card className={props.className}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>{props.content}</CardContent>
      {props.footer && (
        <CardFooter className="flex justify-between">{props.footer}</CardFooter>
      )}
    </Card>
  );
}
