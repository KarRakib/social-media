
import React from "react";
import { Alert, Skeleton, Space, Typography } from "antd";
// import { getAllFollowersAndFollowings } from "@/actions/user";
import { useQuery } from "@tanstack/react-query";
import Box from "../Box";
const FollowInfoBox = ({id}) => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", id, "followInfo"],
    queryFn: () => getAllFollowersAndFollowings(id),
    enabled: !!id,
    // 20 mins stale time
    staleTime: 1000 * 60 * 20,
  });


  if (isLoading)
    return (
      <Skeleton.Button active={true} size="large" style={{ width: "100%", height: '6rem' }} />
    );

  if (isError)
    return <Alert message="Error while fetching data" type="error" />;

  return (
    <Box className='w-full overflow-hidden flex items-center justify-around p-8 rounded-2xl'>
      <Space direction="vertical" align="center">
        <Typography className={"typoH5"}>{data?.followers?.length}</Typography>
        <Typography className={"typoSubtitle2"}>Followers</Typography>
      </Space>

      <Space direction="vertical" align="center">
        <Typography className={"typoH5"}>{data?.following?.length}</Typography>
        <Typography className={"typoSubtitle2"}>Followings</Typography>
      </Space>
    </Box>
  );
};

export default FollowInfoBox;
