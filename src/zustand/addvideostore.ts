import { supabase } from "@/lib/supabaseClient";

export const getVideos = async () => {
  const { data, error } = await supabase.from("videoform").select("*");

  if (error) throw new Error(error.message);

  return data;
};

export const addVideo = async ({
  data,
  imageFile,
  introVideoFile,
  mainVideoFile,
}: {
  data: any;
  imageFile: File | null;
   introVideoFile: File | null;
  mainVideoFile: File | null;
}) => {
  /* ---------- get user ---------- */

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  /* ---------- upload image ---------- */

  let imageUrl = null;

  if (imageFile) {
    const fileName = `${Date.now()}-${imageFile.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("course-image")
      .upload(fileName, imageFile);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    /* ---------- get public URL ---------- */

    const { data: publicUrl } = supabase.storage
      .from("course-image")
      .getPublicUrl(uploadData.path);

    imageUrl = publicUrl.publicUrl;
  }

  /* ---------- upload intro video ---------- */

  let introVideoUrl = null;

  if (introVideoFile) {
    const fileName = `intro/${Date.now()}-${introVideoFile.name}`;

    const { data: introData, error: introError } = await supabase.storage
      .from("course-videos")
      .upload(fileName, introVideoFile);

    if (introError) {
      throw new Error(introError.message);
    }

    const { data: publicUrl } = supabase.storage
      .from("course-videos")
      .getPublicUrl(introData.path);

    introVideoUrl = publicUrl.publicUrl;
  }

  /* ---------- upload main video ---------- */

  let mainVideoUrl = null;

  if (mainVideoFile) {
    const fileName = `main/${Date.now()}-${mainVideoFile.name}`;

    const { data: mainData, error: mainError } = await supabase.storage
      .from("course-videos")
      .upload(fileName, mainVideoFile);

    if (mainError) {
      throw new Error(mainError.message);
    }

    const { data: publicUrl } = supabase.storage
      .from("course-videos")
      .getPublicUrl(mainData.path);

    mainVideoUrl = publicUrl.publicUrl;
  }

  /* ---------- insert database ---------- */

  const { error } = await supabase.from("videoform").insert([
    {
      ...data,
      user_id: user.id,
      image: imageUrl,
      intro_video: introVideoUrl,
      main_video: mainVideoUrl,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
};


export const getVideoById = async (id: string | number) => {
  const { data, error } = await supabase
    .from("videoform")
    .select("*")
    .eq("id", id) // Match the 'id' column with the passed ID
    .single();    // Ensures the result is an object, not an array

  if (error) {
    console.error("Error fetching video:", error.message);
    throw new Error(error.message);
  }

  return data;
};