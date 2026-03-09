import { useQuery } from "@tanstack/react-query";
import { addVideo, getVideos } from "@/zustand/addvideostore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addVideo } from "@/zustand/videos"; // path where your addVideo function exists

export const useAddVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addVideo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
    },
  });
};



export const useVideos = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });
};

