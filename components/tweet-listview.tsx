"use client";

import { cls } from "@/lib/util";
import { useRouter } from "next/navigation";
import LikeDisplay from "@/components/liketoggle";

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
}: TweetListviewProps) {``
  const router = useRouter();

  const handlePostClick = () => {
    router.push(`/tweet/${tweetId}`);
  };

  return (
    <div
      className="flex w-[350px] select-none flex-col rounded-xl p-4 border-2"
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
      <div className="flex items-center justify-between">
        <div className="flex items-center px-1">
          <LikeDisplay
            initLikeCount={likeCount}
            tweetId={tweetId}
            isLike={isLike}
          />
          <span className="mx-1 font-medium">·</span>
        </div>
      </div>      
    </div>
  );
}