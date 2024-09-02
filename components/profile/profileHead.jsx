"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, Flex, Image, Skeleton, Spin, Tabs } from "antd";
import { Typography } from "antd";
import { Icon } from "@iconify/react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, updateBanner } from "@/actions/user";
import toast from "react-hot-toast";
import Box from "../Box";
const { Text } = Typography;
const TABS = [
  {
    label: "Profile",
    icon: "solar:user-id-bold",
  },
  {
    label: "Followers",
    icon: "ph:heart-fill",
  },
  {
    label: "Followings",
    icon: "fluent:people-20-filled",
  },
];
const ProfileHead = ({
  userId,
  data,
  isLoading,
  isError,
  selectedTab,
  setSelectedTab,
}) => {
  const [bannerPreview, setBannerPreview] = useState(false);
  const { user } = useUser();
  const inputRef = useRef(null);
  const [banner, setBanner] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: updateBanner,
    onSuccess: () => {
      toast.success("Banner updated successfully!");
    },
    onError: () => {
      toast.error("Something wrong happened. Try again!");
    },
  });

  useEffect(() => {
    if (data?.data?.banner_url) {
      setBanner(data?.data?.banner_url);
    }
  }, [data, setBanner]);

  const handleBannerChange = async (e) => {
    const file = e.target.files[0];
    // put a limit of 5mb file size
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("Image size is greater than 5 MB");
      return;
    }

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setBanner(reader.result);
        mutate({
          id: user?.id,
          banner: reader.result,
          prevBannerId: data?.data?.banner_id,
        });
      };
    }
  };

  if (isError) return <div>Error</div>;

  return (
    <div className='overflow-hidden rounded-2xl'>
      <Spin spinning={isPending}>
        <div className='cursor-pointer relative before:content-[""] before:absolute before:w-full before:h-full before:z-[1] before:left-0 before:top-0' onClick={() => setBannerPreview(true)}>
          <Image
            src={banner || "/images/banner.png"}
            alt="banner"
            className="object-cove"
            preview={{
              mask: null,
              visible: bannerPreview,
              onVisibleChange: (visible) => setBannerPreview(visible),
            }}
            width={"100%"}
            height={"15rem"}
          />

          {userId === user?.id && (
            <div
              className=' absolute z-[2] right-4 bottom-4'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <input
                accept="image/*"
                multiple={false}
                ref={inputRef}
                onChange={(e) => handleBannerChange(e)}
                type="file"
                hidden
              />
              <Button
                onClick={() => inputRef.current.click()}
                type="primary"
                shape="circle"
                icon={
                  <Icon icon="fluent:image-edit-20-filled" width={"20px"} />
                }
              />
            </div>
          )}
        </div>
      </Spin>

      <Box>
        <div className='flex justify-between pb-0 p-8'>
          {/* left side */}
          <div className='relative mt-16'>
            {/* profile */}
            <div className='flex-col items-center mt-[-5rem]'>
              <div className='w-20 h-20'>
                <Image
                  src={
                    data?.data?.image_url || "/images/placeholder-avatar.png"
                  }
                  alt="profile"
                  preview={{ mask: null }}
                />
              </div>
              <div className='items-center'>
                {!isLoading ? (
                  <>
                    <Text className={"typoH6"}>
                      {data?.data?.first_name} {data?.data?.last_name}
                    </Text>
                    <Text className={"typoBody1"} type="secondary">
                      @{data?.data?.username}
                    </Text>
                  </>
                ) : (
                  <Skeleton style={{ width: "9rem" }} paragraph={{ rows: 2 }} />
                )}
              </div>
            </div>
          </div>

          {/* right side */}
          <div className='w-full m-0'>
            <div className='relative m-auto'>
              <Tabs
                centered
                defaultActiveKey={selectedTab}
                onChange={(key) => setSelectedTab(key)}
                items={TABS.map((tab, i) => {
                  const id = String(i + 1);
                  return {
                    key: id,
                    label: (
                      <Flex align="center" gap={".5rem"}>
                        <Icon icon={tab.icon} width={"20px"} />
                        <span className="typoSubtitle2">{tab.label}</span>
                      </Flex>
                    ),
                  };
                })}
              />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ProfileHead;
