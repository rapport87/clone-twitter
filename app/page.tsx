import getSession from "@/lib/session";
import prisma from "@/lib/db";
import TweetListview from "@/components/tweet-listview";
import { useFormState } from "react-dom";
import { createTweet } from "@/lib/actions";
import Input from "@/components/input";
import Button from "@/components/button";
import { Suspense } from 'react';
import NewPostPage from "@/components/newPost"

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
        <Suspense>
          <NewPostPage />
        </Suspense>

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
      </main>
    );
  }