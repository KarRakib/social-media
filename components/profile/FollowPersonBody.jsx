import React from "react";
import { Alert, Skeleton, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
// import { getAllFollowersAndFollowings } from "@/actions/user";
import { useUser } from "@clerk/nextjs";
import UserBox from "../UserBox";
const FollowPersonsBody = ({ id, type }) => {
  const { user: currentUser } = useUser();
  const {
    data: userData,
    isLoading: userDataLoading,
    isError: userDataError,
  } = useQuery({
    queryKey: ["user", id, "followInfo"],
    queryFn: () => getAllFollowersAndFollowings(id),
    enabled: !!id,
    // 20 mins stale time
    staleTime: 1000 * 60 * 20,
  });

  const { data: currentUserData } = useQuery({
    queryKey: ["user", currentUser?.id, "followInfo"],
    queryFn: () => getAllFollowersAndFollowings(currentUser?.id),
    enabled: !!currentUser?.id,
    // 20 mins stale time
    staleTime: 1000 * 60 * 20,
  });

  if (userDataLoading)
    return (
      <Skeleton.Button
        active={true}
        size="large"
        style={{ width: "100%", height: "3.5rem" }}
      />
    );

  if (userDataError)
    return <Alert message="Error while fetching data" type="error" />;

  return (
    <div className='mt-8 flex flex-col gap-8'>
      <div className='capitalize font-bold'>
        <Typography className={"typoH5"}>{type}</Typography>
      </div>
      {userData?.[type]?.length === 0 ? (
        <Alert message={"No " + type} type="info" />
      ) : (
        <div className='grid grid-cols-3 gap-4 sm:grid-cols-2 xs:grid-cols-1'>
          {userData?.[type]?.map((person) => (
            <UserBox
              key={
                person?.[type === "followers" ? "followerId" : "followingId"]
              }
              type={type === "followers" ? "follower" : "following"}
              data={person}
              loggedInUserData={currentUserData}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowPersonsBody;
