import getSession from "@/lib/session";
import prisma from "@/lib/db";
import TweetListview from "@/components/tweet-listview";
import { cls } from "@/lib/util"
import Link from "next/link";

const getTweets = async () => {
    const session = await getSession();
    const tweets = await prisma.tweet.findMany({
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
        likes: {
          select: {
            id: true,
          },
          where: {
            userId: session.id,
          },          
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return tweets;
  };
  
  export default async function Home() {
    const tweets = await getTweets();
  
    return (
      <main className="relative">
        <div className="flex flex-col items-center gap-4 py-8">
          {tweets.map((tweet) => (
            <TweetListview
              key={tweet.id}
              content={tweet.content}
              authorName={tweet.author.name}
              createdAt={tweet.createdAt}
              likeCount={tweet._count.likes}
              tweetId={tweet.id}
              isLike={tweet.likes.length > 0}
            />
          ))}
        </div>
        <Link
          href="/new-post"
          className={cls(
            "fixed bottom-8 right-8 flex size-4 items-center justify-center text-3xl",
            "rounded-full bg-white p-8 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]",
            "border-[1.6px] border-neutral-300 hover:border-neutral-400",
            "transition ease-in-out hover:scale-105",
          )}
        >
          <span className="rotate-[80deg]">✎</span>
        </Link>
      </main>
    );
  }