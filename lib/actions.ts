"use server";
import bcrypt from "bcrypt";
import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const createFormSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string(),
  confirm_password: z.string(),
  name: z.string(),
})
.superRefine(async ({ email }, ctx) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    ctx.addIssue({
      code: "custom",
      message: "This email is already taken",
      path: ["email"],
      fatal: true,
    });
    return z.NEVER;
  }
})
.refine(checkPasswords, {
  message: "Both passwords should be the same!",
  path: ["confirm_password"],
});

export const createTweet = async (formData: FormData) => {
  const data = {
    content: formData.get("content"),
  };

  const session = await getSession();
  if (!session || !session.id) {
    console.log("no session");
    return;
  }

  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    console.log("존재하지 않는 사용자 입니다");
    return;
  }

  const newPost = await db.tweet.create({
    data: {
      content: data.content + "",
      authorId: session.id,
    },
  });

  redirect("/");
};

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    name: formData.get("name"),
  };
  const result = await createFormSchema.spa(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        email: result.data.email,
        password: hashedPassword,
        name: result.data.name,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/");
  }
}

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const loginFormSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "An account with this email does not exist."),
  password: z.string({
    required_error: "Password is required",
  }),
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await loginFormSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    );
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password."],
          email: [],
        },
      };
    }
  }
}

export const submitLikePost = async (
  tweetId: number,
  type: "ADD" | "REMOVE",
) => {
  const session = await getSession();
  if (!session || !session.id) {
    console.log("no session");
    return;
  }

  const userId = session.id;
  
  const isAlreadyLike = Boolean(
    await db.like.findUnique({
      where: {
        userId_tweetId: { userId, tweetId },
      },
      select: {
        id: true,
      },
    }),
  );

  if (isAlreadyLike && type === "REMOVE") {
    await db.like.delete({
      where: {
        userId_tweetId: { userId, tweetId },
      },
    });
  } else if (!isAlreadyLike && type === "ADD") {
    await db.like.create({
      data: {
        tweetId,
        userId,
      },
    });
  }
  revalidatePath("/");
};