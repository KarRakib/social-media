'use client'
import React from 'react'
import Box from '../Box';
import Iconify from '../Iconify';
import { Avatar, Button, Flex, Image, Input,Spin, Typography } from "antd";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@clerk/nextjs';
import { createPost } from '@/actions/post';

const PostCreate = () => {
    const imgInputRef = React.useRef(null);
    const vidInputRef = React.useRef(null);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [fileType, setFileType] = React.useState(null); // [image, video]
    const [postText, setPostText] = React.useState(null);
    const queryClient = useQueryClient();
   
    const { mutate: execute, isPending } = useMutation({
      mutationFn: (data) => createPost(data),
      onSuccess: () => {
        handleSuccess();
        queryClient.invalidateQueries("posts");
      },
      onError: () => showError("Something wrong happened. Try again!"),
    });
  
    const handleSuccess = () => {
      setSelectedFile(null);
      setFileType(null);
      setPostText("");
      toast.success("Post created successfully!");
    };
  
    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      // Put a limit of 5MB file size
      if (file && file.size > 100 * 1024 * 1024) {
        console.log("File size is too big");
        return;
      }
    
      if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
        setFileType(file.type.split("/")[0]);
    
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setSelectedFile(reader.result);
          };
        } else if (file.type.startsWith("video/")) {
          const videoUrl = URL.createObjectURL(file);
          setSelectedFile(videoUrl);
        }
      }
    };
    
  
    const handleRemoveFile = () => {
      if (fileType === "video" && selectedFile) {
        URL.revokeObjectURL(selectedFile);
      }
      setSelectedFile(null);
      setFileType(null);
    };
    const showError = (content = "Something went wrong! Try again.") => {
      toast.error(content);
    };
  
    function handleSubmitPost() {
      if ((postText === "" || !postText) && !selectedFile) {
        showError("Can't make an empty post");
        return;
      }
    
      // Create FormData to handle file uploads
      const formData = new FormData();
      formData.append("postText", postText);
      if (fileType === "image" || fileType === "video") {
        formData.append("media", imgInputRef.current.files[0] || vidInputRef.current.files[0]);
      }
    
      execute(formData);
    }
  
    const { user } = useUser();
    return (
      <>
        <Spin
          spinning={isPending}
          tip={
            <Typography className="typoBody1" style={{ marginTop: "1rem" }}>
              Uploading post...
            </Typography>
          }
        >
          <div className='rounded-2xl'>
            <Box className='overflow-hidden relative p-6 rounded-2xl'>
              <Flex gap={"1rem"} align={"flex-start"} vertical>
                {/* avatar */}
  
                <Flex style={{ width: "100%" }} gap={"1rem"}>
                  <Avatar
                    src={user?.imageUrl}
                    style={{
                      boxShadow: "var(--avatar-shadow)",
                      width: "2.6rem",
                      height: "2.6rem",
                    }}
                  />
  
                  <Input.TextArea
                    // maxLength={100}
                    placeholder={"Share what you are thinking..."}
                    style={{ height: 80, resize: "none", flex: 1 }}
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                </Flex>
  
                {/* file preview */}
                {fileType && (
                  <div className='overflow-hidden relative w-full rounded-2xl'>
                    {/* remove button */}
                    <Button
                      type="default"
                      className='z-[2] right-4 top-4 bg-black'
                      style={{ position: "absolute" }}
                    >
                      <Typography
                        className="typoCaption"
                        onClick={handleRemoveFile}
                      >
                        Remove
                      </Typography>
                    </Button>
  
                    {/* media preview */}
                    {fileType === "image" && (
                      <Image
                        src={selectedFile}
                        className='w-full object-cover rounded-lg'
                        alt="preview"
                        height={"350px"}
                        width={"100%"}
                      />
                    )}
                    {fileType === "video" && (
                      <video
                        className='w-full rounded-lg object-cover'
                        controls
                        src={selectedFile}
                      />
                    )}
                  </div>
                )}
  
                {/* buttons Container */}
                <Flex
                  align="center"
                  justify="space-between"
                  className='w-full'
                >
                  {/* upload buttons */}
                  {/* image upload button */}
                  <Button
                    type="text"
                    style={{ background: "borderColor" }}
                    onClick={() => imgInputRef.current.click()}
                  >
                    <Flex align="center" gap={".5rem"}>
                      <Iconify
                        icon="solar:camera-linear"
                        width="1.2rem"
                        color="var(--primary)"
                      />
                      <Typography className="typoSubtitle2">Image</Typography>
                    </Flex>
                  </Button>
  
                  {/* video upload button */}
                  <Button
                    type="text"
                    style={{ background: "borderColor" }}
                    onClick={() => vidInputRef.current.click()}
                  >
                    <Flex align="center" gap={".5rem"}>
                      <Iconify
                        icon="gridicons:video"
                        width="1.2rem"
                        color="#5856D6"
                      />
                      <Typography className="typoSubtitle2">Video</Typography>
                    </Flex>
                  </Button>
  
                  <Button
                    type="primary"
                    style={{ marginLeft: "auto" }}
                    onClick={handleSubmitPost}
                  >
                    <Flex align="center" gap={".5rem"}>
                      <Iconify icon="iconamoon:send-fill" width="1.2rem" />
                      <Typography
                        className="typoSubtitle2"
                        style={{ color: "white" }}
                      >
                        Post
                      </Typography>
                    </Flex>
                  </Button>
                </Flex>
              </Flex>
            </Box>
          </div>
        </Spin>
        {/* make an input to only accept img files and max number of files as 1 */}
        <input
          type="file"
          accept="image/*"
          multiple={false}
          style={{ display: "none" }}
          ref={imgInputRef}
          onChange={(e) => handleFileChange(e)}
        />
        {/* make an input to only accept img files and max number of files as 1 */}
        <input
          type="file"
          accept="video/*"
          multiple={false}
          style={{ display: "none" }}
          ref={vidInputRef}
          onChange={(e) => handleFileChange(e)}
        />
      </>
    );
}

export default PostCreate