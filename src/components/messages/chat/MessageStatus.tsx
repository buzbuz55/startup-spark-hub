import { Check, CheckCheck } from "lucide-react";

interface MessageStatusProps {
  status: 'sent' | 'delivered' | 'read';
  className?: string;
}

const MessageStatus = ({ status, className = "" }: MessageStatusProps) => {
  switch (status) {
    case 'sent':
      return <Check className={`h-3 w-3 text-muted-foreground ${className}`} />;
    case 'delivered':
      return <CheckCheck className={`h-3 w-3 text-muted-foreground ${className}`} />;
    case 'read':
      return <CheckCheck className={`h-3 w-3 text-blue-500 ${className}`} />;
    default:
      return null;
  }
};

export default MessageStatus;