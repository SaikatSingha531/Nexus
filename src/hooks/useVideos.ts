import { useQuery } from "@tanstack/react-query";
import { addVideo, deleteVideo, getVideos } from "@/zustand/addvideostore";
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

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deleteVideo(id),
    onSuccess: () => {
      // This is the magic part: it tells the 'useVideos' hook 
      // to refresh the list automatically!
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
    },
    onError: (error: any) => {
      alert(`Delete failed: ${error.message}`);
    }
  });
};

