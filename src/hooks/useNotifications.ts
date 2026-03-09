import { addNotification, deleteNotification, fetchNotifications } from "@/zustand/notificationStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });
};

export const useAddNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ text, date }: { text: string; date: string }) =>
      addNotification(text, date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};