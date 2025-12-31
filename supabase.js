// Supabase Client Configuration
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key
// const supabaseUrl = 'https://wbqumxtskgjmbhowaazn.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndicXVteHRza2dqbWJob3dhYXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTc0MjIsImV4cCI6MjA2ODE5MzQyMn0.obEW-zi8XtyzkHUKJLtWyQx01dwhUn0-LQxpqGDDi7s';

// Faizan Mustafa
// const supabaseUrl = 'https://dlvenrcfpwacdqsqkyij.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdmVucmNmcHdhY2Rxc3FreWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMzQ4NzEsImV4cCI6MjA4MTkxMDg3MX0.hAPIGlXmUl5lzvaSN2k6-4vbRonhYtjajuEYtw_Fk7k';

// Shehnaz Qamar
const supabaseUrl = 'https://ymkpmskxempxkwvnolzg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlta3Btc2t4ZW1weGt3dm5vbHpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMjMxMDYsImV4cCI6MjA4MjY5OTEwNn0.ELkNeenlshWpIwBKccjog-VuM_zt_M7KKJCItgxv4G4';

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User authentication functions
async function signIn(username, password) {
    try {
        // Query the users table to find a matching username/password
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .eq('username', username)
            .single();

        console.log('Query result:', data);

        if (error) throw error;

        // Check if user exists and password matches
        if (data && Object.keys(data).length > 0 && data.password === password) {
            return { success: true, user: { username: data.username } };
        } else {
            return { success: false, message: 'Invalid username or password' };
        }
    } catch (error) {
        console.error('Error signing in:', error);
        return { success: false, message: 'An error occurred during sign in' };
    }
}

// Function to get all users
async function getAllUsers() {
    try {
        const { data, error } = await supabase
            .from('employees')
            .select('*');

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching users:', error);
        return { success: false, message: 'Failed to fetch users' };
    }
}

// Auto-execute function to get all users when this module loads
(async function loadUsers() {
    console.log('Loading users from database...');
    const result = await getAllUsers();
    if (result.success) {
        console.log('Users loaded successfully:', result.data);
    } else {
        console.error('Failed to load users:', result.message);
    }
})();

// Schedule management functions
async function getSchedules(routeKey = null) {
    try {
        let { data, error } = await supabase.from('schedules').select('*').eq('route', routeKey);
        console.log(data, 'DATA');
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching schedules:', error);
        return { success: false, message: 'Failed to fetch schedules' };
    }
}

async function addSchedule(scheduleData) {
    try {
        const { data, error } = await supabase
            .from('schedules')
            .insert([scheduleData]);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error adding schedule:', error);
        return { success: false, message: 'Failed to add schedule' };
    }
}

async function updateSchedule(id, scheduleData) {
    try {
        const { data, error } = await supabase
            .from('schedules')
            .update(scheduleData)
            .eq('id', id);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error updating schedule:', error);
        return { success: false, message: 'Failed to update schedule' };
    }
}

async function deleteSchedule(id, route = null, train_number = null) {
    try {
        console.log("Delete parameters:", { id, route, train_number });

        let { data, error } = await supabase
            .from('schedules')
            .delete()
            .eq('id', id);

        console.log(data, 'DELETE DATA');

        if (error) throw error;
        return { success: true, data }; // Add this line back to return success property
    } catch (error) {
        console.error('Error deleting schedule:', error);
        return { success: false, message: 'Failed to delete schedule: ' + error.message };
    }
}

// General Message management functions (single message only)
async function getGeneralMessage() {
    try {
        const { data, error } = await supabase
            .from('general_message')
            .select('*')
            .single();

        if (error) {
            // If no message exists yet, return null
            if (error.code === 'PGRST116') {
                return { success: true, data: null };
            }
            throw error;
        }
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching general message:', error);
        return { success: false, message: 'Failed to fetch general message' };
    }
}

async function upsertGeneralMessage(content) {
    try {
        const fixedId = '00000000-0000-0000-0000-000000000001';
        
        const { data, error } = await supabase
            .from('general_message')
            .upsert(
                { id: fixedId, content: content },
                { onConflict: 'id' }
            );

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error upserting general message:', error);
        return { success: false, message: 'Failed to save general message' };
    }
}

// Video upload function
async function uploadVideo(file) {
    try {
        const fileName = `${Date.now()}_${file.name}`;
        const bucketName = 'pak-rail-schedule-media';

        // 1. Delete all existing files in the bucket to "overwrite"
        const { data: existingFiles, error: listError } = await supabase.storage
            .from(bucketName)
            .list();
        
        if (listError) throw listError;

        if (existingFiles && existingFiles.length > 0) {
            const filesToDelete = existingFiles.map(f => f.name);
            const { error: deleteError } = await supabase.storage
                .from(bucketName)
                .remove(filesToDelete);
            
            if (deleteError) console.warn('Failed to clean up old files:', deleteError);
            else console.log('Cleaned up old files:', filesToDelete);
        }

        // 2. Upload the new file
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(fileName, file);

        if (error) throw error;

        // 3. Get public URL
        const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName);

        const publicUrl = publicUrlData.publicUrl;

        // 4. Update "general_message" table "uploaded_media" column
        // We assume there is only one row with the fixed ID
        const fixedId = '00000000-0000-0000-0000-000000000001';
        
        // First optimize: try to update specific column
        const { error: updateError } = await supabase
            .from('general_message')
            .update({ uploaded_media: publicUrl })
            .eq('id', fixedId);

        if (updateError) {
             // If update failed (maybe row doesn't exist?), try upsert
             const { error: upsertError } = await supabase
                .from('general_message')
                .upsert(
                    { id: fixedId, uploaded_media: publicUrl, content: 'Default Message' }, // ensure content is not null if row is new
                    { onConflict: 'id' }
                );
             if (upsertError) throw upsertError;
        }

        // 5. Still save to "videos" table for history/logging (optional but good for debugging)
         await supabase
            .from('videos')
            .insert([{
                filename: fileName,
                public_url: publicUrl
            }]);

        return { success: true, data: publicUrlData, filePath: fileName, publicUrl };
    } catch (error) {
        console.error('Error uploading video:', error);
        return { success: false, message: 'Failed to upload video: ' + error.message };
    }
}

// Function to get the latest video
async function getLatestVideo() {
    console.log('getLatestVideo called in supabase.js (New Logic)');
    try {
        // Fetch URL from "general_message" table "uploaded_media" column
        const fixedId = '00000000-0000-0000-0000-000000000001';
        
        const { data, error } = await supabase
            .from('general_message')
            .select('uploaded_media')
            .eq('id', fixedId)
            .single();

        if (error) throw error;

        if (data && data.uploaded_media) {
            console.log('Video URL found in general_message:', data.uploaded_media);
            return { success: true, url: data.uploaded_media };
        }

        console.warn('No uploaded_media found in general_message');
        return { success: false, message: 'No video URL found.' };

    } catch (error) {
        console.error('Error fetching latest video URL:', error);
        return { success: false, message: 'Failed to fetch video URL: ' + error.message };
    }
}

export {
    supabase,
    signIn,
    getAllUsers,
    getSchedules,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    uploadVideo,
    getLatestVideo,
    getGeneralMessage,
    upsertGeneralMessage
}; 
