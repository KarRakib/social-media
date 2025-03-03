"use client";
import React from "react";
import { Alert, Avatar, Flex, Skeleton, Typography } from "antd";

// import {
//   getFollowSuggestions,
// } from "@/actions/user";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Box from "./Box";
import UserBox from "./UserBox";
const FollowSuggest = () => {
  const { user: currentUser } = useUser();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", "followSuggestions"],
    queryFn: () => getFollowSuggestions(),
    enabled: !!currentUser,
    staleTime: 1000 * 60 * 20,
  });

  return (
    <div className='overflow-hidden rounded-2xl'>
      <Box>
        <div className='flex flex-col gap-6 p-4'>
          <div className='text-[gray]'>
            <Typography className={"typoSubtitle1"}>
              Follow Suggestions
            </Typography>
          </div>

          {isLoading && (
            // skelton
            <Flex vertical gap={"1rem"}>
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Flex key={i} gap={"1rem"}>
                    <Avatar size={40} />
                    <Flex vertical>
                      <Typography.Text className={"typoBody2"} strong>
                        <Skeleton.Input active size={"small"} />
                      </Typography.Text>
                      <Typography.Text
                        className={"typoCaption"}
                        strong
                        type="secondary"
                      >
                        <Skeleton.Input
                          active
                          size={"small"}
                          style={{ height: ".5rem", marginTop: ".4rem" }}
                        />
                      </Typography.Text>
                    </Flex>
                  </Flex>
                ))}
            </Flex>
          )}

          {isError && (
            <Alert
              message="Error"
              description="Something went wrong. Try again later"
              type="error"
              showIcon
            />
          )}

          {/* suggestions*/}
          {!isLoading && !isError && data?.length > 0
            ? data?.map((user) => (
                <UserBox
                  loggedInUserData={currentUser}
                  key={user.id}
                  data={{
                    follower: user,
                  }}
                  type={"follower"}
                />
              ))
            : !isLoading &&
              !isError &&
              data?.length === 0 && (
                <Typography.Text type="secondary">
                  No suggestions
                </Typography.Text>
              )}
        </div>
      </Box>
    </div>
  );
};

export default FollowSuggest;
