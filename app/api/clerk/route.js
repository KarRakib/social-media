
import { createUser } from "@/actions/user";
import { headers } from "next/headers";
import { Webhook } from "svix";

export const POST = async(req)=>{
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error( 'Please add WEBHOOK_SECRET to env or env.local')
    }

    const headerPayload =  headers();
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_signature || !svix_signature ) {
        return new Response('Missing Headers', {status:400})
    }

    const payload = await req.json();
    const body = JSON.stringify(payload)

    const wh = new Webhook(WEBHOOK_SECRET)

    let evt;
    try {
        evt = wh.verify(body,{
            'svix-id':svix_id,
            'svix-timestamp' : svix_timestamp,
            'svix-signature' :svix_signature
        })
    } catch (error) {
        console.log(error);
        return new Response('error while veriying the webhook', {status:400})
        
    }
 // Get the ID and type
 const eventType = evt.type;

 const { id, first_name, last_name, email_addresses, image_url, username } = evt.data;

 const email_address = email_addresses?.[0].email_address;

 console.log("event received")
 if (eventType === "user.created") {
   try {
     await createUser({ id, first_name, last_name, email_address, image_url, username });
   } catch {
     throw new Error("Failed to save new user in db");
   }
 }

 if (eventType === "user.updated") {
   try {
     await updateUser({ id, first_name, last_name, email_address, image_url, username });
   } catch {
     throw new Error("Failed to update user in db");
   }
 }

 if(eventType === "user.deleted") {
   try {
     await deleteUser({ id });
   } catch {
     throw new Error("Failed to delete user in db");
   }
 }

 return Response.json({ message: "received" });
}

export const GET = async()=>{
return Response.json({message:"HI I am readey"})
} 