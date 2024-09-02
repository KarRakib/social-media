import { db } from "@/lib/DbConnect";
import { uploadFile } from "@/actions/uploadFile";
import { checkPostForTrends } from "@/utils";

export const createPost = async (data) => {
  const postText = data.get('postText');
  const media = data.get('media');

  try {
    const user = { id: 'user_2lMcofCIfGTZYk1ekXQMlpIuDLG' }; // Replace with actual user retrieval logic
    if (!user) throw new Error("User not authenticated");

    let cld_id, assetUrl;

    if (media) {
      const res = await uploadFile(media, `/posts/${user.id}`);
      if (res.error) throw new Error(res.error);
      cld_id = res.public_id;
      assetUrl = res.secure_url;
    }

    const newPost = await db.post.create({
      data: {
        postText,
        media: assetUrl,
        cld_id,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const trends = checkPostForTrends(postText);
    if (trends.length > 0) {
      createTrends(trends, newPost.id);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create post");
  }
};
