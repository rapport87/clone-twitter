"use client";

import React, { MouseEvent, useOptimistic, useTransition } from "react";
import { submitLikePost } from "@/lib/actions";
import { cls } from "@/lib/util";

interface LikeToggleProps {
  tweetId: number;
  initLikeCount: number;
  isLike: boolean;
}

interface Like {
  isLike: boolean;
  count: number;
}

export default function LikeDisplay({
  initLikeCount,
  tweetId,
  isLike,
}: LikeToggleProps) {
  const [_, startTransition] = useTransition();
  const [optimisticState, addOptimistic] = useOptimistic<
    Like,
    "ADD" | "REMOVE"
  >({ isLike, count: initLikeCount }, (currentState, optimisticValue) => {
    if (optimisticValue === "ADD") {
      return { count: currentState.count + 1, isLike: true };
    } else {
      return { count: currentState.count - 1, isLike: false };
    }
  });

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (optimisticState.isLike) {
      startTransition(() => addOptimistic("REMOVE"));
      submitLikePost(tweetId, "REMOVE");
    } else {
      startTransition(() => addOptimistic("ADD"));
      submitLikePost(tweetId, "ADD");
    }
  };

  const buttonOpacity = optimisticState.isLike ? "opacity-100" : "opacity-40";
  const buttonHoverOpacity = optimisticState.isLike ? "" : "hover:opacity-70";

  return (
    <button className="flex items-center space-x-[3px]" onClick={handleClick}>
      <div
        className={cls(
          "text-red-500 transition ease-in-out hover:scale-125",
          buttonOpacity,
          buttonHoverOpacity,
        )}
      >
        Like♥
      </div>
      <span className="text-[14px] font-semibold">
        {optimisticState.count >= 0 ? optimisticState.count : "···"}
      </span>
    </button>
  );
}