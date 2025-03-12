import React from 'react';
import './CppArt.css';
import Section from './components/Section';
import ImageGallery from './components/ImageGallery';
import VideoGallery from './components/VideoGallery';
import Carousel from './components/Carousel';

// Import images
import polygonOverlay2 from './ArtWork/plain_polygons.jpg';
import polygonOverlay1 from './ArtWork/plain.jpg';
import polygonOverlay3 from './ArtWork/out.png';
import polygonOverlay6 from './ArtWork/output_image.jpg';
import polygonOverlay4 from './ArtWork/output_combined copy.jpg';
import polygonOverlay5 from './ArtWork/poly_overlay.jpg';
import initialCollages from './ArtWork/output_adaptive.jpg';
import initialCollages2 from './ArtWork/Houtput_high.jpg';
import initialCollages3 from './ArtWork/output_image_1000.jpg';

// Import additional artwork
import polyOverlay from './ArtWork/poly_overlay.jpg';
import outputCombined from './ArtWork/output_combined.jpg';
import outputPolygonsCopy from './ArtWork/output_polygons copy.jpg';
import outputColor from './ArtWork/output_color.jpg';
import outputBalanced from './ArtWork/output_balanced.jpg';
import outputSift from './ArtWork/output_sift.jpg';
import outputLow from './ArtWork/output_low.jpg';
import outputHigh from './ArtWork/output_high.jpg';
import outputNormal from './ArtWork/output_normal.jpg';
import headOutputLow from './ArtWork/head_output_low.jpg';
import headOutputHigh from './ArtWork/head_output_high.jpg';
import headOutputNormal from './ArtWork/head_output_normal.jpg';
import outputRandom from './ArtWork/output_random.jpg';
import outputSpecific from './ArtWork/output_specific.jpg';
import outputSpecific1 from './ArtWork/output_specific1.jpg';
import outputImageEnhanced from './ArtWork/output_image_enhanced.jpg';
import outputImageHq from './ArtWork/output_image_hq.jpg';
import outputImage from './ArtWork/output_image.jpg';

// Import videos from ArtWork folder
import longOptimizedPixelFinal from './ArtWork/long_output_optimized_pixel_final.mp4';
import optimizedRandomFinal from './ArtWork/output_optimized_random_final.mp4';
import optimizedPixelFinal from './ArtWork/output_optimized_pixel_final.mp4';
import optimizedMatrixRandomCopy from './ArtWork/output_optimized_matrix_random copy.mp4';
import outputSpecificVideo from './ArtWork/output_specific.mp4';
import outputRandomVideo from './ArtWork/output_random.mp4';
import outputVideoEnhanced from './ArtWork/output_video_enhanced.mp4';
import outputVideoHq from './ArtWork/output_video_hq.mp4';
import outputVideo from './ArtWork/output_video.mp4';
import destruction from './ArtWork/destruction.mp4';
import destruction1 from './ArtWork/destruction1.mp4';

// Video path - using web-optimized H.264 MP4 format
// can use "ffmpeg -i /path/to/file.mp4 -c:v libx264 -preset medium -crf 23 -movflags +faststart /path/to/file.mp4" to convert
const video1Path = `${process.env.PUBLIC_URL}/videos/output_adaptive_web_rotated.mp4`;
const fullVideoPath = window.location.origin + video1Path;

console.log('Video path details:', {
  publicUrl: process.env.PUBLIC_URL,
  video1Path,
  fullVideoPath,
  origin: window.location.origin
});

const firstAttemptsImages = [
  { src: polygonOverlay1, alt: "Polygon Overlay", className: "first-attempts-image", caption: "Randomly generated polygons" },
  { src: polygonOverlay2, alt: "Polygon Overlay 2", className: "first-attempts-image", caption: "Random images inlayed into polygons" },
  { src: polygonOverlay3, alt: "Polygon Overlay 3", className: "first-attempts-image", caption: "Similarly colored images inlayed into polygons" }
];

const overlayImages = [
  { src: polygonOverlay6, alt: "Plain Polygons", className: "overlay-image", caption: "similar image matching" },
  { src: polygonOverlay4, alt: "Output Combined", className: "overlay-image", caption: "Combined overlay and image matching" },
  { src: polygonOverlay5, alt: "Output Combined 2", className: "overlay-image", caption: "Polygon mesh overlay" }
];

const collageImages = [
  { src: initialCollages, alt: "Initial Collages", className: "collage-image", caption: "Color-matched collage" },
  { src: initialCollages2, alt: "Initial Collages 2", className: "collage-image", caption: "High-resolution collage" },
  { src: initialCollages3, alt: "Initial Collages 3", className: "collage-image", caption: "1000-image collage" }
];

const videoArt = [
  { 
    src: fullVideoPath,
    className: "video-art",
    type: "video/mp4",
    caption: "Video collage with dynamic polygon inlays"
  }
];

// Additional artwork for the carousel
const additionalArtwork = [
  { src: polyOverlay, alt: "Polygon Overlay", className: "additional-image" },
  { src: outputCombined, alt: "Output Combined", className: "additional-image" },
  { src: outputPolygonsCopy, alt: "Output Polygons Copy", className: "additional-image" },
  { src: outputColor, alt: "Output Color", className: "additional-image" },
  { src: outputBalanced, alt: "Output Balanced", className: "additional-image" },
  { src: outputSift, alt: "Output SIFT", className: "additional-image" },
  { src: outputLow, alt: "Output Low", className: "additional-image" },
  { src: outputHigh, alt: "Output High", className: "additional-image" },
  { src: outputNormal, alt: "Output Normal", className: "additional-image" },
  { src: headOutputLow, alt: "Head Output Low", className: "additional-image" },
  { src: headOutputHigh, alt: "Head Output High", className: "additional-image" },
  { src: headOutputNormal, alt: "Head Output Normal", className: "additional-image" },
  { src: outputRandom, alt: "Output Random", className: "additional-image" },
  { src: outputSpecific, alt: "Output Specific", className: "additional-image" },
  { src: outputSpecific1, alt: "Output Specific 1", className: "additional-image" },
  { src: outputImageEnhanced, alt: "Output Image Enhanced", className: "additional-image" },
  { src: outputImageHq, alt: "Output Image HQ", className: "additional-image" },
  { src: outputImage, alt: "Output Image", className: "additional-image" }
];

// Additional videos for the carousel
const additionalVideos = [
  { src: longOptimizedPixelFinal, alt: "Long Optimized Pixel Final", className: "additional-video", type: "video/mp4" },
  { src: optimizedRandomFinal, alt: "Optimized Random Final", className: "additional-video", type: "video/mp4" },
  { src: optimizedPixelFinal, alt: "Optimized Pixel Final", className: "additional-video", type: "video/mp4" },
  { src: optimizedMatrixRandomCopy, alt: "Optimized Matrix Random Copy", className: "additional-video", type: "video/mp4" },
  { src: outputSpecificVideo, alt: "Output Specific Video", className: "additional-video", type: "video/mp4" },
  { src: outputRandomVideo, alt: "Output Random Video", className: "additional-video", type: "video/mp4" },
  { src: outputVideoEnhanced, alt: "Output Video Enhanced", className: "additional-video", type: "video/mp4" },
  { src: outputVideoHq, alt: "Output Video HQ", className: "additional-video", type: "video/mp4" },
  { src: outputVideo, alt: "Output Video", className: "additional-video", type: "video/mp4" },
  { src: destruction, alt: "Destruction", className: "additional-video", type: "video/mp4" },
  { src: destruction1, alt: "Destruction 1", className: "additional-video", type: "video/mp4" }
];

// Combine all media for the carousel
const allArtwork = [
  ...collageImages,
  ...additionalArtwork,
  ...videoArt,
  ...additionalVideos
];

export default function CppArt() {
  return (
    <div className="cpp-art-container">
      <header className="cpp-art-header">
        <h1>C++ Art</h1>
      </header>

      <div className="cpp-art-content">
        {/* Carousel with all artwork */}
        <Section title="">
          <Carousel items={allArtwork} />
        </Section>

        <Section title="First Attempts">
          <div className="cpp-art-text-content">
            <p>
              After learning about opencv in class, I decided I wanted to test out some of its features. 
              I decided that I wanted to use the images I had saved from an earlier project to create 
              geometric collages. I have done similar things before using photoshop, but I wanted to try 
              it out in c++.
            </p>
            <p>
              I started by making a function that would randomly generate polygons. I then used opencv 
              to make a method that would take an image and inlay it into a polygon. From there, I could 
              make simple collages by randomly inlaying images into the polygons.
            </p>
          </div>
          <div className="image-gallery">
            {firstAttemptsImages.map((image, index) => (
              <div key={index} className="gallery-item">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="gallery-image first-attempts-image" 
                />
                <div className="image-caption">{image.caption}</div>
              </div>
            ))}
          </div>
          
          <div className="cpp-art-text-content">
            <p>
              However, random collages are not very interesting. So I decided to take my polygon creation 
              method and use it to overlay a mesh of polygons over a photo. From there, I would use the 
              features of the image to create a more interesting collage. These overlay experiments led 
              to more sophisticated techniques for image manipulation.
            </p>
          </div>
          <div className="image-gallery">
            {overlayImages.map((image, index) => (
              <div key={index} className="gallery-item">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="gallery-image overlay-image" 
                />
                <div className="image-caption">{image.caption}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Initial Collages">
          <div className="cpp-art-text-content">
            <p>
              In order to create collages based off of my images, I collected a large dataset of images 
              from my previous pinterest project, and uploaded the data to my workspace. From there, I 
              created one method that would find the average color within a polygon and another method 
              that would do the same for a given image.
            </p>
            <p>
              I then used these methods to find the most similar image to a given region and inlay it 
              into the polygon. This gave me a method that could create collages that could inherit key 
              features from the original image. The results below demonstrate how the algorithm was able 
              to copy parts of the compositions by matching image characteristics.
            </p>
          </div>
          <div className="image-gallery">
            {collageImages.map((image, index) => (
              <div key={index} className="gallery-item">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="gallery-image collage-image" 
                />
                <div className="image-caption">{image.caption}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Video Art">
          <div className="cpp-art-text-content">
            <p>
              After making a few collages, I realized that I could use the same techniques over 
              videos to create moving collages. However, iterating over each polygon for every 
              frame quickly became too slow of a process. So I decided to go back to the drawing 
              board and try to come up with a more efficient way to create the collages.
            </p>
            <p>
              My first attempt was to randomly pick a subset of the polygons and inlay an image 
              into each of them. This gave me a very interesting effect, but I wasn't able to 
              overlay many images at once and processing each video was still a little too slow to 
              be worthwhile.
            </p>
          </div>
          <div className="video-gallery">
            {videoArt.map((video, index) => (
              <div key={index} className="video-container">
                <video 
                  src={video.src}
                  className="gallery-video"
                  controls
                  muted
                  playsInline
                  type={video.type}
                ></video>
                {video.caption && <div className="video-caption">{video.caption}</div>}
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

