"use client";

import { cls } from "@/lib/util";
import { useRouter } from "next/navigation";

interface TweetListviewProps {
  content: string;
  authorName: string;  
  createdAt: Date;
  likeCount: number;
  tweetId: number;
  isLike: boolean;
}

export default function TweetListview({
  content,
  createdAt,
  authorName,
  likeCount,
  tweetId,
  isLike,
}: TweetListviewProps) {
  const router = useRouter();

  const handlePostClick = () => {
    router.push(`/tweet/${tweetId}`);
  };

  return (
    <div
      className={cls(
        "flex min-h-[200px] w-[520px] select-none flex-col rounded-xl p-6",
        "border-2 border-neutral-200 shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
      )}
      onClick={handlePostClick}
    >
      <div className="flex w-full items-center px-1">
        <span className="mx-1 font-medium">·</span>
        <span className="text-[14px] font-light">{authorName}</span>
      </div>
      <div className="my-2 border-b-[1px] border-b-neutral-400" />
      <span className="flex-1 whitespace-pre-wrap break-words px-1 font-light">
        {content}
      </span>
    </div>
  );
}