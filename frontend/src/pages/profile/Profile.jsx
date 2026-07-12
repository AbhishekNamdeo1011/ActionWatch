import PageHeader from "@/components/common/PageHeader";

import ProfileCard from "@/components/profile/ProfileCard";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileInfo from "@/components/profile/ProfileInfo";

import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

import { useProfile } from "@/hooks/profile/useProfile";

const Profile = () => {

    const {

        data: user,

        isLoading,

        error,

    } = useProfile();

    if (isLoading) {

        return <ProfileSkeleton />;

    }

    if (error) {

        return (

            <div className="flex h-80 items-center justify-center">

                <p className="text-red-500">

                    Failed to load profile.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <PageHeader

                title="Profile"

                description="Manage your account information."

            />

            <div className="grid gap-6 xl:grid-cols-3">

                <ProfileCard

                    user={user}

                />

                <div className="space-y-6 xl:col-span-2">

                    <ProfileForm

                        key={user._id}

                        user={user}

                    />

                    <ProfileInfo

                        user={user}

                    />

                </div>

            </div>

        </div>

    );

};

export default Profile;