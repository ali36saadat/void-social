import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pyramid-page',
  templateUrl: './pyramid-page.component.html',
  styleUrl: './pyramid-page.component.scss',
})
export class PyramidPageComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    //   var frameNumber = 0, // start video at frame 0
    //     // lower numbers = faster playback
    //     playbackConst = 2160,
    //     // get page height from video duration
    //     setHeight = document.getElementById('set-height');
    //   // select video element
    //   const vid = document.getElementById('v0') as HTMLVideoElement;

    //   // dynamically set the page height according to video length
    //   vid.addEventListener('loadedmetadata', function () {
    //     setHeight!.style.height = 4000 + 'px';
    //     // console.log(Math.floor(vid.duration) * playbackConst);
    //     console.log(36);
    //   });

    //   // Use requestAnimationFrame for smooth playback
    //   function scrollPlay() {
    //     var frameNumber = window.pageYOffset / playbackConst;
    //     vid.currentTime = frameNumber;
    //     window.requestAnimationFrame(scrollPlay);
    //   }

    //   window.requestAnimationFrame(scrollPlay);
    var frameNumber = 0; // Start video at frame 0
    const playbackConst = 500; // Lower numbers = faster playback

    // Get references
    const setHeight = document.getElementById('set-height');
    const vid = document.getElementById('v0') as HTMLVideoElement;

    // Dynamically set the page height based on video length
    vid.addEventListener('loadedmetadata', function () {
      if (setHeight) {
        setHeight.style.height = `${Math.floor(vid.duration) * playbackConst}px`;
      }
      console.log('Video metadata loaded');
    });

    // Use requestAnimationFrame with throttling
    let lastScrollPosition = 0;
    let ticking = false;

    function scrollPlay() {
      // Calculate frame number based on scroll position
      const frameNumber = window.pageYOffset / playbackConst;

      // Update video current time only if it has changed
      if (vid.currentTime !== frameNumber) {
        vid.currentTime = frameNumber;
      }

      ticking = false; // Reset ticking flag
    }

    // Throttle scroll events
    window.addEventListener('scroll', () => {
      lastScrollPosition = window.pageYOffset;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          scrollPlay();
        });
        ticking = true;
      }
    });
  }
}
