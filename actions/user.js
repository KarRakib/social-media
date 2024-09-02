import { db } from "@/lib/DbConnect";

export const createUser = async (user) => {
  const { id, first_name, last_name, email_address, image_url, username } =
    user;
  try {
    const userExists = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (userExists) {
      updateUser(user);
      return;
    }
    await db.user.create({
      data: {
        id,
        first_name,
        last_name,
        email_address,
        image_url,
        username,
      },
    });
    console.log("New user created in db");
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to save new user in db",
    };
  }

  console.log("User created in supabase");
};

export const updateBanner = async (params) => {
    const { id, banner, prevBannerId } = params;
    try {
      let banner_id;
      let banner_url;
  
      if (banner) {
        const res = await uploadFile(banner, `/users/${id}`);
        const { public_id, secure_url } = res;
        banner_id = public_id;
        banner_url = secure_url;
  
        // Delete previous banner
        if (prevBannerId) {
          await deleteFile(prevBannerId);
        }
      }
      await db.user.update({
        where: {
          id,
        },
        data: {
          banner_url,
          banner_id,
        },
      });
      console.log("user banner updated");
    } catch (e) {
      console.log("Error updating user banner");
      throw e;
    }
  };
export const getAllFollowersAndFollowings = (id)=>{

};
export const updateFollow = (id) =>{

} 