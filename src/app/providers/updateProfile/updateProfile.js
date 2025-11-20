import { db } from '@/app/firebase';
import { ref, get, set, update, remove } from 'firebase/database';

export const updateProfile = async (uid, _unusedProfile, newProfile) => {
    // Fetch latest user data to ensure checks are accurate
    const userRef = ref(db, `users/${uid}`);
    const userSnapshot = await get(userRef);

    if (!userSnapshot.exists()) {
        throw new Error("User not found.");
    }

    const currentProfile = userSnapshot.val();
    const { username: oldUsername, lastUsernameChange } = currentProfile;
    const { username: newUsername, displayName, pfp } = newProfile;

    const updates = {};

    // 1. Handle Username Change
    if (newUsername && newUsername !== oldUsername) {
        // Validation
        if (newUsername.length < 3) {
            throw new Error("Username must be at least 3 characters long.");
        }
        if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(newUsername)) {
            throw new Error("Username must start with a letter and can only contain letters, numbers, and underscores.");
        }

        // 30-Day Limit Check
        const now = Date.now();
        const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;

        if (lastUsernameChange && (now - lastUsernameChange < thirtyDaysMs)) {
            const daysLeft = Math.ceil((thirtyDaysMs - (now - lastUsernameChange)) / (24 * 60 * 60 * 1000));
            throw new Error(`You can only change your username once every 30 days. Please wait ${daysLeft} more days.`);
        }

        // Uniqueness Check
        const newUsernameRef = ref(db, `usernames/${newUsername}`);
        const snapshot = await get(newUsernameRef);
        if (snapshot.exists()) {
            throw new Error("Username is already taken.");
        }

        // Prepare updates for username change
        updates[`usernames/${oldUsername}`] = null; // Remove old mapping
        updates[`usernames/${newUsername}`] = uid;   // Add new mapping
        updates[`users/${uid}/username`] = newUsername;
        updates[`users/${uid}/lastUsernameChange`] = now;
    }

    // 2. Handle other fields
    if (displayName !== currentProfile.displayName) {
        updates[`users/${uid}/displayName`] = displayName;
    }
    if (pfp !== currentProfile.pfp) {
        updates[`users/${uid}/pfp`] = pfp;
    }

    // 3. Execute updates
    // We need to use the root ref for multi-path updates
    if (Object.keys(updates).length > 0) {
        await update(ref(db), updates);
    }

    return { success: true };
};
