import FloatingOrderNowButton from "@/components/home/FloatingOrderNowButton";
import ImageGallery from "@/components/home/ImageGallery";
import VideoSection from "@/components/home/VideoSection";
import ZigZagContent from "@/components/home/content";
import HeroSection from "@/components/home/hero-section";
// import UsersView from "@/components/home/usersView";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <FloatingOrderNowButton />
        {/* <UsersView /> */}
        <ZigZagContent />
        <VideoSection />
        <ImageGallery />
      </main>
    </>
  );
}
