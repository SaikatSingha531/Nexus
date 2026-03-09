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
    .eq("id", id) 
    .single();    

  if (error) {
    console.error("Error fetching video:", error.message);
    throw new Error(error.message);
  }

  return data;
};


// Add to cart function  

// const addToCart = async (course) => {
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user) {
//     alert("Please login to add items to cart");
//     return;
//   }

//   const { error } = await supabase
//     .from('cart')
//     .insert([
//       { 
//         user_id: user.id, 
//         course_id: course.id,
//         course_title: course.title,
//         price_string: course.price, // Saving as string
//         price_numeric: parseFloat(course.price) // Useful for later
//       }
//     ]);

//   if (error) console.error('Error adding to cart:', error);
//   else alert('Course added to cart!');
// };








export const deleteVideo = async (videoId: string | number) => {
  /* 1. Fetch the video record first to get the file paths */
  const { data: video, error: fetchError } = await supabase
    .from("videoform")
    .select("image, intro_video, main_video")
    .eq("id", videoId)
    .single();

  if (fetchError) throw new Error("Video not found");

  /* 2. Helper to extract storage paths from Public URLs */
  // This assumes your URLs look like: .../storage/v1/object/public/bucket-name/filename
  const getFilePath = (url: string, bucket: string) => {
    const parts = url.split(`${bucket}/`);
    return parts.length > 1 ? parts[1] : null;
  };

  /* 3. Delete files from Storage */
  const filesToDelete: { bucket: string; path: string }[] = [];
  
  if (video.image) filesToDelete.push({ bucket: "course-image", path: getFilePath(video.image, "course-image")! });
  if (video.intro_video) filesToDelete.push({ bucket: "course-videos", path: getFilePath(video.intro_video, "course-videos")! });
  if (video.main_video) filesToDelete.push({ bucket: "course-videos", path: getFilePath(video.main_video, "course-videos")! });

  for (const file of filesToDelete) {
    const { error: storageError } = await supabase.storage
      .from(file.bucket)
      .remove([file.path]);
    
    if (storageError) console.error(`Failed to delete storage file: ${file.path}`);
  }

  /* 4. Delete the row from the Database */
  const { error: dbError } = await supabase
    .from("videoform")
    .delete()
    .eq("id", videoId);

  if (dbError) throw new Error(dbError.message);

  return { success: true };
};