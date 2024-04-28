import prisma from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import TweetViewer from "@/components/tweet-userlistview";

interface UserTweetProps {
  params: {
    id: number;
  };
}

const getTweet = async (tweetId: string) => {
  const targetId = parseInt(tweetId, 10);
  const session = await getSession();
  const tweet = await prisma.tweet.findUnique({
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
        where: {
          userId: session.id,
        },
        select: {
          id: true,
        },
      },
    },
    where: {
        id: targetId,
    },    
  });
  console.log(tweetId)
  console.log(tweet)
  return tweet;
};

export default async function UserTweets({ params }: UserTweetProps) {
  const { id: tweetId } = params;
  const targetId = tweetId.toString();
  const tweet = await getTweet(targetId);

  if (!tweet) {
    redirect("/");
  }

  const session = await getSession();
  const userId = session.id!;

  return (

    <main className="flex flex-col items-center py-8">
      <TweetViewer
        key={tweet.id}
        content={tweet.content}
        authorName={tweet.author.name}
        createdAt={tweet.createdAt}
        likeCount={tweet._count.likes}
        tweetId={tweet.id}
        isLike={tweet.likes.length > 0}
        userId={userId}
      />
    </main>
  );
}