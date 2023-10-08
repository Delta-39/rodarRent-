import landingImage from '../../assets/img/landingImage.webp';
import Carrousel from './Carrousel';

function Landing() {
  return (
    <div className=" bg-white transition duration-300 dark:bg-slate-900 text-black dark:text-gray-100 min-h-[calc(100vh-112px)] flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row">
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1000"
          data-aos-delay="300"
          className="w-full font-poppins 2xl:pl-20 xl:pl-16 lg:pl-14 md:pl-10 xs:pl-2 pt-10 lg:pt-16 sm:w-3/6"
        >
          <div className="w-full 2xl:text-landing2Xl xl:text-landingXl lg:text-landingLg md:text-landingMd sm:text-landingMd xs:text-landingMobile font-extrabold">
            <h1>Premium</h1>
            <h1>Car Rental</h1>
            <h1>In Argentina</h1>
          </div>
          <p>
            We offer professional car rental in our range of high-end vehicles.
          </p>
        </div>
        <div
          data-aos="fade-zoom-in"
          data-aos-duration="2000"
          data-aos-delay="1500"
          className="relative w-full sm:w-3/6 md:h-landingMd xs:h-landingXs overflow-hidden"
        >
          <img
            className="absolute 2xl:scale-125 xl:scale-150 lg:scale-150 md:scale-200 xs:scale-200 bottom-16 left-52 md:left-56  xs:left-45 "
            src={landingImage}
            alt=""
          />
        </div>
      </div>
      <Carrousel />
    </div>
  );
}

export default Landing;
