import AppHero from './hero';
import AppFeature from './feature';
import AppAbout from './about';
import AppService from './services';
import AppCategory from './category';
import AppTestimonial from './testimonial';

function Home() {
  return (
      <>
        <AppHero/>
        <AppFeature/>
        <AppAbout/>
        <AppCategory/>
        <AppService/>
        <AppTestimonial/>
      </>
  );
}

export default Home;
