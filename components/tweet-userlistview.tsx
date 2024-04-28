"use client";

import { cls } from "@/lib/util";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import LikeDisplay from "@/components/liketoggle";

interface TweetUserlistviewProps {
    content: string;
    authorName: string;  
    createdAt: Date;
    likeCount: number;
    tweetId: number;
    isLike: boolean;
    userId : number;
  }

export default function PostViewer({
    content,
    createdAt,
    authorName,
    likeCount,
    tweetId,
    isLike,
    userId,
}: TweetUserlistviewProps) {
  const router = useRouter();

  const handleUserClick = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    router.push(`/profile/${userId}`);
  };

  const [deletePending, setDeletePending] = useState(false);

  return (
    <div
      className={cls(
        "flex min-h-[300px] w-[520px] select-none flex-col rounded-xl p-6",
        "border-2 border-neutral-200 shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
      )}
      style={deletePending ? { opacity: 0.6 } : {}}
    >
      <div className="flex w-full flex-col px-1">
        <div className="mt-2 flex items-center gap-1">
          <div className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-gray-300">
            <div className="translate-y-[3px] text-[16px]">👤</div>
          </div>
          <div className="flex translate-y-[1px] items-center gap-1">
            <span
              className="cursor-pointer text-[16px]"
              onClick={handleUserClick}
            >
              {authorName}
            </span>
          </div>
        </div>
      </div>
      <div className="my-4 border-b-[1px] border-b-neutral-400" />
      <span className="flex-1 whitespace-pre-wrap break-words px-1 pb-8 font-light">
        {content}
      </span>
      <LikeDisplay
        initLikeCount={likeCount}
        tweetId={tweetId}
        isLike={isLike}
      />
    </div>
  );
}
