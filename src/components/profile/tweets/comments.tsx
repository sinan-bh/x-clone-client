import Tweet from "@/components/home/tweets/tweet";
import { CommentData } from "@/lib/store/features/tweets-slice";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Comments({ comments }: { comments: CommentData }) {
  const { userName }: { userName: string } = useParams();
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    if (comments?.user?.userName === userName) {
      setIsUser(true);
    }
  }, [comments?.user.userName, userName]);

  return (
    <div>
      {isUser && (
        <div className="flex border-b border-gray-600">
          <div>
            <Image
              src={comments?.user?.profilePicture || ""}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full m-4"
            />
          </div>
          <div className="flex flex-col w-full mt-4">
            <div className="flex">
              <div>{comments?.user?.name}</div>
              <div>{comments?.user?.userName}</div>
            </div>
            <div>{comments?.text}</div>
            <div className="">
              <div>
                <Tweet
                  _id={""}
                  user={{
                    _id: "",
                    name: "",
                    userName: "",
                    email: undefined,
                    profilePicture: undefined,
                    following: undefined,
                    followers: undefined,
                  }}
                  text={""}
                  likes={[]}
                  saved={[]}
                  comments={[]}
                  reposts={[]}
                  createdAt={""}
                  {...comments?.tweet}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
