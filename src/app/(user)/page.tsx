// import Image from "next/image";
// import styles from "./page.module.css";
import CourseVideos from "@/components/courses/CourseVideos";
import Carousel from "@/components/home/Carousel";
// import Courses from "@/components/home/Courses";
// import Welcomecard from "@/component/home/Welcomecard";

export default function Home() {
  return (
   <>

   
   <div className="z-[-2] bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">

   {/* <Welcomecard/> */}
   <Carousel/>
   {/* <Courses/> */}
   <CourseVideos/>
   </div>
   </>
  );
}

