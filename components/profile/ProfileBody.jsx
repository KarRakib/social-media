import React from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Posts from "../Post/Posts";
import PostCreate from "../Post/PostCreate";
import FollowSuggest from "../FollowerSuggest";
import FollowInfoBox from "./FollowInfoBox";
import FollowButton from "./FollowButton";
const ProfileBody = ({ userId }) => {
  const { user: currentUser } = useUser();
  const isCurrentUser = currentUser?.id === userId;

  return (
    <div className='flex-col md:flex gap-4 justify-end w-full'>
      <div className='w-2/5'>
        <div className=' w-full gap-4 flex flex-col sticky z-[1] top-0'>
          {!isCurrentUser && <FollowButton id={userId} />}

          {/* start from here */}
          <FollowInfoBox id={userId} />
          <FollowSuggest />
        </div>
      </div>
      <div className=' w-full md:w-3/5 overflow-scroll flex flex-col gap-4'>
        {isCurrentUser && <PostCreate />}
        <Posts id={userId} />
      </div>
    </div>
  );
};

export default ProfileBody;
