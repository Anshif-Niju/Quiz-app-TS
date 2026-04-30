interface PropProps {
  name: string;
}

export default function Prop({ name }: PropProps) {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
