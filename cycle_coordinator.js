import { getGlobalSettings } from './supabase.js';

export async function runCycleCoordinator(currentPageFileName) {
    const defaultPageSequence = [
        'display_lhr_kc.html', 
        'display_lhr_mianwali.html', 
        'display_lhr_psh.html', 
        'display_lhr_fsld.html', 
        'display_lhr_rwp.html', 
        'display_lhr_nwl.html', 
        'display_lhr_qta.html',
        'display_message.html',
        'image_display.html'
    ]; // video_display.html is deliberately removed from the static sequence

    // Just in case it's called on the video page
    if (currentPageFileName === 'video_display.html') return;

    const currentIndex = defaultPageSequence.indexOf(currentPageFileName);
    if (currentIndex === -1) {
        console.warn(`runCycleCoordinator: ${currentPageFileName} is not in the default sequence.`);
        return;
    }

    const nextPageIndex = (currentIndex + 1) % defaultPageSequence.length;
    let nextPageFileName = defaultPageSequence[nextPageIndex];

    // Read current state
    let slidesShownCount = parseInt(localStorage.getItem('slides_shown_count') || '0', 10);
    slidesShownCount++;
    localStorage.setItem('slides_shown_count', slidesShownCount.toString());

    // Fetch dynamic setting from Supabase
    const settings = await getGlobalSettings();
    const slidesBetweenVideos = settings.success ? settings.slides_between_videos : 2;

    // Determine if it's time to inject a video
    if (slidesShownCount >= slidesBetweenVideos) {
        console.log(`Slides shown (${slidesShownCount}) reached threshold (${slidesBetweenVideos}). Injecting video!`);
        // Save the sequence target for the video player to return to
        localStorage.setItem('next_schedule_slide', nextPageFileName);
        // Reset counter
        localStorage.setItem('slides_shown_count', '0');
        // Route to the video player
        nextPageFileName = 'video_display.html';
    }

    // Schedule the redirect
    setTimeout(() => {
        window.location.href = nextPageFileName;
    }, 30000);
}
