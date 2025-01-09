import { Separator } from "./ui/separator";

type HeadingProps = {
  title: string;
  description?: string;
  tabs?: React.ReactNode;
};

export function Heading(props: HeadingProps) {
  return (
    <>
      {props.tabs}
      <div className="px-8">
        <h2 className="text-3xl font-bold tracking-tight">{props.title}</h2>
        {props.description && (
          <p className="text-sm text-muted-foreground">{props.description}</p>
        )}
      </div>

      <Separator />
    </>
  );
}
