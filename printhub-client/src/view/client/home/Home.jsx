import AppHero from './hero';
import AppFeature from './feature';
import AppAbout from './about';
import AppService from './services';
import AppCategory from './category';
import AppTestimonial from './testimonial';
import './home.css'
function Home() {
  return (
      <>
        <AppHero/>
        <AppAbout/>
        <AppCategory/>
        {/* <AppFeature/> */}
        {/* <AppService/> */}
        {/* <AppTestimonial/> */}
      </>
  );
}

export default Home;
