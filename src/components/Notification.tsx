"use client";

import { useNotifications, useDeleteNotification } from "@/hooks/useNotifications";

const Notification = () => {
  const { data: items, isLoading } = useNotifications();
  const deleteMutation = useDeleteNotification();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {items?.map((item: any) => (
        <div key={item.id}>
          <p>{item.notification}</p>
          <button onClick={() => deleteMutation.mutate(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;