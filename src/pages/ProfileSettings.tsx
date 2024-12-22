import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/Header";
import AvatarUpload from "@/components/profile/AvatarUpload";
import ProfileForm from "@/components/profile/ProfileForm";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    avatar_url: "",
    linkedin_url: "",
    twitter_url: "",
    website_url: "",
    hobbies: [] as string[],
    bio: ""
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfile({
          full_name: data.full_name || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
          avatar_url: data.avatar_url || "",
          linkedin_url: data.linkedin_url || "",
          twitter_url: data.twitter_url || "",
          website_url: data.website_url || "",
          hobbies: data.hobbies || [],
          bio: data.bio || ""
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error("Error loading profile");
    }
  };

  const handleProfileUpdate = async (values: {
    full_name: string;
    phone_number: string;
    linkedin_url: string | null;
    twitter_url: string | null;
    website_url: string | null;
    hobbies: string[];
    bio: string | null;
  }) => {
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: values.full_name,
          phone_number: values.phone_number,
          linkedin_url: values.linkedin_url,
          twitter_url: values.twitter_url,
          website_url: values.website_url,
          hobbies: values.hobbies,
          bio: values.bio,
        })
        .eq('id', user.id);

      if (error) throw error;
      
      setProfile(prev => ({
        ...prev,
        full_name: values.full_name,
        phone_number: values.phone_number,
        linkedin_url: values.linkedin_url || "",
        twitter_url: values.twitter_url || "",
        website_url: values.website_url || "",
        hobbies: values.hobbies,
        bio: values.bio || "",
      }));
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpdate = (url: string | null) => {
    setProfile(prev => ({ ...prev, avatar_url: url || "" }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <AvatarUpload
              avatarUrl={profile.avatar_url}
              fullName={profile.full_name}
              onAvatarUpdate={handleAvatarUpdate}
            />
            <ProfileForm
              profile={profile}
              loading={loading}
              onProfileUpdate={handleProfileUpdate}
              onCancel={() => navigate(-1)}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProfileSettings;