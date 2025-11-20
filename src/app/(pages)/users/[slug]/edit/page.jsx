import React from 'react'
import { getUserBySlug } from '@/app/providers/getUser/getUser'
import EditProfile from './EditProfile'

const EditProfilePage = async ({ params }) => {
    const { slug } = await params;
    const profile = await getUserBySlug(slug);

    if (!profile) {
        return <div>User not found</div>
    }

    return (
        <EditProfile profile={profile} />
    )
}

export default EditProfilePage
