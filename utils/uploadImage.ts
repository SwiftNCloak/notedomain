import supabase from "@/utils/supabase";

export async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `domains/${fileName}`;

  const { data, error } = await supabase.storage
    .from('notedomain-bucket')
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading image:", error);
    throw new Error("Image upload failed");
  }

  return data.path;
}
