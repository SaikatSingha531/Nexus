import { useQuery } from "@tanstack/react-query";
import { addVideo, deleteVideo, getVideos } from "@/zustand/addvideostore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
    },
    onError: (error: any) => {
      alert(`Delete failed: ${error.message}`);
    }
  });
};



// export const useUpdateCourse = ()=>{
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, data }: { id: string | number; data: any }) => 
//       updatecourse(id, data),

//     onSuccess:()=>{
//       queryClient.invalidateQueries({
//         queryKey:["videos"]
//       })
//     },

//     onError:(error)=>{
//       alert(`Update failed: ${error.message}`)
//     }
//   })
// }