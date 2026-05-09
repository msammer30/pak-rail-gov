// Supabase Client Configuration
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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

        // 1. Upload the new file
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(fileName, file);

        if (error) throw error;

        // 2. Get public URL
        const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName);

        const publicUrl = publicUrlData.publicUrl;

        // 3. Save to "videos" table for playlist
         const { data: dbData, error: dbError } = await supabase
            .from('videos')
            .insert([{
                filename: fileName,
                public_url: publicUrl
            }])
            .select();

         if (dbError) throw dbError;

        return { success: true, data: publicUrlData, filePath: fileName, publicUrl, id: dbData[0].id };
    } catch (error) {
        console.error('Error uploading video:', error);
        return { success: false, message: 'Failed to upload video: ' + error.message };
    }
}

// Function to get all videos for the playlist
async function getVideos() {
    try {
        const { data, error } = await supabase
            .from('videos')
            .select('*')
            .order('created_at', { ascending: true }); // Play oldest first

        if (error) throw error;
        return { success: true, data: data || [] };
    } catch (error) {
        console.error('Error fetching videos:', error);
        return { success: false, message: 'Failed to fetch videos: ' + error.message };
    }
}

// Function to delete a video from storage and database
async function deleteVideo(id, filename) {
    try {
        const bucketName = 'pak-rail-schedule-media';

        // 1. Delete from bucket
        const { error: storageError } = await supabase.storage
            .from(bucketName)
            .remove([filename]);
            
        if (storageError) console.warn('Storage deletion error:', storageError);

        // 2. Delete from database
        const { error: dbError } = await supabase
            .from('videos')
            .delete()
            .eq('id', id);

        if (dbError) throw dbError;

        return { success: true };
    } catch (error) {
        console.error('Error deleting video:', error);
        return { success: false, message: 'Failed to delete video: ' + error.message };
    }
}

// Function to get global display settings
async function getGlobalSettings() {
    try {
        const fixedId = '00000000-0000-0000-0000-000000000001';
        
        const { data, error } = await supabase
            .from('general_message')
            .select('slides_between_videos')
            .eq('id', fixedId)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // Ignore not found
        
        return { success: true, slides_between_videos: data?.slides_between_videos ?? 2 };
    } catch (error) {
        console.error('Error fetching settings:', error);
        return { success: false, slides_between_videos: 2 }; // Default to 2
    }
}

// Function to update global display settings
async function updateGlobalSettings(slidesBetweenVideos) {
    try {
        const fixedId = '00000000-0000-0000-0000-000000000001';
        
        const { error } = await supabase
            .from('general_message')
            .update({ slides_between_videos: slidesBetweenVideos })
            .eq('id', fixedId);

        if (error) {
            // If row doesn't exist yet, insert it
            const { error: upsertError } = await supabase
                .from('general_message')
                .upsert(
                    { id: fixedId, slides_between_videos: slidesBetweenVideos, content: 'Default Update' },
                    { onConflict: 'id' }
                );
            if (upsertError) throw upsertError;
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating settings:', error);
        return { success: false, message: 'Failed to update settings' };
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
    getVideos,
    deleteVideo,
    getGeneralMessage,
    upsertGeneralMessage,
    getGlobalSettings,
    updateGlobalSettings
}; 
