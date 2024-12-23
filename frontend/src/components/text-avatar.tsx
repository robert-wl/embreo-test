import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";

interface Props {
  text?: string;
}

export default function TextAvatar({ text }: Props) {
  const avatarText = (text: string = "X") => text?.charAt(0).toUpperCase() ?? "X";

  return (
    <Avatar className="h-8 w-8 rounded-lg">
      <AvatarFallback className="rounded-lg text-black">{avatarText(text)}</AvatarFallback>
    </Avatar>
  );
}
