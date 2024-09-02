import React from "react";
import { Alert, Avatar, Flex, Typography } from "antd";
// import { mockTrends } from "@/mock/mockTrends";

// import { getPopularTrends } from "@/actions/post";
import { QueryClient, useQuery } from "@tanstack/react-query";
import Iconify from "./Iconify";
const PopularTrends = async () => {
  const queryClient = new QueryClient();
  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: ["trends"],
      queryFn: getPopularTrends,
      // stale time is 1 day
      staleTime: 1000 * 60 * 60 * 24,
    });
    return (
      <div className='relative bg-primary-low px-4 py-6 rounded-2xl'>
        <div className='absolute bg-[url("/public/images/hashtag.png")] w-40 h-60 bg-no-repeat z-0 opacity-50 right-0 top-0;' />
        {/* head */}
        <div className='flex flex-col gap-8 z-[1] w-full h-full'>
          <Flex vertical>
            <Typography className="typoSubtitle2">TOP TRENDING</Typography>
            <Typography className="typoH4">#Popular Trends</Typography>
          </Flex>

          <Flex vertical gap={15}>
            {data.map((trend, i) => (
              <Flex key={i} gap={"1rem"} align="center">
                {/* trend icon */}
                <Avatar
                  style={{ background: "#FF990047" }}
                  icon={
                    <Iconify
                      icon="mingcute:hashtag-fill"
                      color="var(--primary)"
                      width="18px"
                    />
                  }
                />
                {/* trend info */}
                <Flex vertical>
                  <Typography
                    className="typoSubtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    {trend.name}
                  </Typography>
                  <Typography
                    className="typoCaption"
                    style={{ fontWeight: "bold", color: "gray" }}
                  >
                    {trend?._count?.name} Posts
                  </Typography>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </div>
      </div>
    );
  } catch (err) {
    return (
      <Alert
        message="Error"
        description="Unable to fetch popular trends"
        type="error"
        showIcon
      />
    );
  }
};

export default PopularTrends;
