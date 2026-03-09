import { supabase } from "@/lib/supabaseClient";

export const fetchNotifications = async () => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};


export const addNotification = async (text: string, date: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("notifications")
    .insert([
      {
        notification: text,
        date: date,
        user_id: user?.id,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data;
};


export const deleteNotification = async (id: number) => {
  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};