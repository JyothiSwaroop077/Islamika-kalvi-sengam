import React, { useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { GoogleForm } from 'react-google-forms-hooks';
import { useState } from "react";
import {db} from '../../firebase';
import { collection, getDoc, doc, query, getDocs } from 'firebase/firestore';
import AdPopup from "@/components/AdPopup/AdPopup";
import ContestCard from "@/components/ContestCard/ContestCard";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";
import YouTube, { YouTubeProps } from 'react-youtube';
var getYouTubeID = require('get-youtube-id');
import { googleFormsToJson } from 'react-google-forms-hooks'
import { useRef } from "react";
import { Image } from "next/image";
import Footer from "@/components/Footer/Footer";

const ads = [
    {
        id: 1,
        description: "This is Ad one. Content goes here",
        adLink: 'link1',
    },
    {
        id: 2,
        description: "This is Ad two. Content goes here",
        adLink: 'link2',
    },
    {
        id: 3,
        description: "This is Ad three. Content goes here",
        adLink: 'link3',
    },
    {
        id: 4,
        description: "This is Ad four. Content goes here",
        adLink: 'link4',
    },
]

const Contest1 = () => {
    const [bannerImages, setBannerImages] = useState(['https://flowbite.com/docs/images/carousel/carousel-1.svg', 'https://flowbite.com/docs/images/carousel/carousel-2.svg', 'https://flowbite.com/docs/images/carousel/carousel-3.svg']);
    const [form, setForm] = useState({});
    const [answers, setAnswers] = useState({});
    const [shouldDisplayTodayForm, setShouldDisplayTodayForm] = useState(false);
    const [giveSelectContestOption, setSelectContestOption] = useState(true);
    // const [sponsors, setSponsors] = useState([]);
    const [adPopupVisible, setAdPopupVisible] = useState(false);
    const [adNumber, setAdNumber] = useState(0);
    const [adCount, setAdCount] = useState(0);
    const [adsDetails, setAdsDetails] = useState([]);
    // const [allContests, setAllContests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const closeAdPopup = async() => {
        setAdPopupVisible(false);
      };

      let adsDuplicate = []
      useEffect(() => {
        const fetchAds = async() => {
            try{
            let adsContent = [];
            const adsCollection = collection(db, "Ads");
            const adsDoc = doc(adsCollection, "adsDetails");

            const docSnapshot = await getDoc(adsDoc);

            if(docSnapshot.exists()){
                const adsData = docSnapshot.data();
                console.log(adsData, "hello");
                adsContent = adsData.ads;
                adsDuplicate = adsData.ads;
                console.log(adsContent);
                setAdsDetails(adsContent);
                console.log(adsDetails)
            }
            else{
                console.log("No ads Data available")
            }
        }
        catch (error){
            console.log("error fetching ads data", error);
        }
    }

    fetchAds();
    }, []);


    useEffect(() => {
        const adPopupInterval = setInterval(() => {
            if (adCount < adsDuplicate.length) {
                setAdPopupVisible(true);
                setAdCount(prevCount => prevCount + 1);
                setAdNumber(prevNumber => (prevNumber + 1) % adsDuplicate.length);
                console.log(adCount, adNumber);
            } else {
                clearInterval(adPopupInterval); // Clear the interval after showing the ad popup three times
            }
        }, 180 * 1000);
    
        return () => clearInterval(adPopupInterval); // Cleanup function to clear the interval when component unmounts or rerenders
    }, []); 

    useEffect(() => {
        const fetchBannerImages = async () => {
            try {
                let data = [];
                const bannerImagesCollection = collection(db, "Web Content"); // Collection reference
                const bannerImagesDoc = doc(bannerImagesCollection, "Contest-1-images"); // Document reference
                
                console.log("fetched images doc");

                const docSnapshot = await getDoc(bannerImagesDoc);

                if(docSnapshot.exists()){
                    const  imagesData = docSnapshot.data();
                    data = imagesData.BannerImages;
                    console.log(data);
                    console.log("set images");
                    
                    setBannerImages(data);
                    
                }else{
                    console.log("No data available");
                }

                
            } catch (error) {
                console.error("Error getting Images data:", error);
            }
        };

        fetchBannerImages();
    }, []);

    // const handleTodaysContestClick = async() => {
    //     try {
    //         // Fetch all documents in the Contest1 collection
    //         const contestRef = collection(db, 'Contest1');
    //         const q = query(contestRef);
    //         const querySnapshot = await getDocs(q);
    
    //         const currentDate = new Date();
    //         const currentDateString = currentDate.toISOString().split('T')[0];
    //         const currentTime = currentDate.getHours();
            


    
    //         if (currentTime < 17) { // If current time is before 5:00 PM
    //           const previousDay = new Date(currentDate);
    //           previousDay.setDate(currentDate.getDate() - 1   );
    //           const previousDayString = previousDay.toISOString().split('T')[0];
              
    
    //           querySnapshot.forEach((doc) => {
    //             const contestData = doc.data();
    //             const contestDetails = contestData.contestDetails;
    //             console.log(contestDetails);
               
    //             if (contestDetails.date == previousDayString) { // Check if document exists for previous day
                  
    
    //               // Extract form questions
    //              setForm(contestDetails);
    //              console.log(form) 
    //               setShouldDisplayTodayForm(true);
    //              }
    //           });
    //         } else if (currentTime >= 17) { // If current time is after 5:00 PM
    //             querySnapshot.forEach((doc) => {
    //                 const contestData = doc.data();
    //                 console.log(contestData);
    //                 const contestDetails = contestData.contestDetails;
                   
    //                 if (contestDetails.date == currentDateString) { // Check if document exists for previous day
                      
        
    //                   // Extract form questions
    //                   setForm(contestDetails);
                      
    //                   setShouldDisplayTodayForm(true);
    //                  }
    //           });
    //         }
    //       } catch (error) {
    //         console.error('Error fetching contest details:', error);
    //       }
    // }

    
    useEffect(() => {
        const fetchContestDetails = async () => {
          try {
            // Fetch all documents in the Contest1 collection
            const contestRef = collection(db, 'Contest1');
            const q = query(contestRef);
            const querySnapshot = await getDocs(q);
    
            const currentDate = new Date();
            currentDate.setMinutes(currentDate.getMinutes());
            const currentDateString = currentDate.toISOString().split('T')[0];
            const currentTime = currentDate.getHours();
            console.log(currentTime);
            


    
            if (currentTime < 17) { // If current time is before 5:00 PM
              const previousDay = new Date(currentDate);
              previousDay.setDate(currentDate.getDate() - 1   );
              const previousDayString = previousDay.toISOString().split('T')[0];
              console.log(previousDayString, "check")
              
    
              querySnapshot.forEach((doc) => {
                const contestData = doc.data();
                const contestDetails = contestData.contestDetails;
                console.log(contestDetails);
               
                if (contestDetails.date == previousDayString) { // Check if document exists for previous day
                  
    
                  // Extract form questions
                 setForm(contestDetails);
                 console.log(form) 
                  setShouldDisplayTodayForm(true);
                 }
              });
            } else if (currentTime >= 17) { // If current time is after 5:00 PM
                querySnapshot.forEach((doc) => {
                    const contestData = doc.data();
                    console.log(contestData);
                    const contestDetails = contestData.contestDetails;
                   
                    if (contestDetails.date == currentDateString) { // Check if document exists for previous day
                      
        
                      // Extract form questions
                      setForm(contestDetails);
                      console.log(contestDetails, "hehe");
                      
                        
                      setShouldDisplayTodayForm(true);
                     }
              });
            }
          } catch (error) {
            console.error('Error fetching contest details:', error);
          }
        };
    
        fetchContestDetails();
       
      }, []);


      const handleChange = (e, index) => {
        setAnswers({ ...answers, [index]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Save user's answers to the contest responses
          const currentDate = new Date().toISOString().split('T')[0];
          const contestRef = doc(db, 'Contest1', currentDate, 'responses');
          await setDoc(contestRef, answers);
          console.log('User answers submitted successfully');
        } catch (error) {
          console.error('Error submitting user answers:', error);
        }
      };            

      const router = useRouter();

      const handlePrevContClick = () => {
        router.push("/PreviousContest1");
      }

      const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }


    //   const _onReady(event) {
    //     // access to player in all event handlers via event.target
    //     event.target.pauseVideo();
    //   }

    return(
        <>

        {isLoading && <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            />}
        
        {!isLoading && <div className="px-5">
            <Navbar />

            <div className="bg-gray-100">

      {/* Ad Popup */}
      {adPopupVisible && (
        <AdPopup
          title={adsDetails[adNumber].title}
          description={adsDetails[adNumber].description}
          onClose={closeAdPopup}
          adLink={adsDetails[adNumber].image}
          videoLink={adsDetails[adNumber].video}
        />
      )}
    </div>

            {/* <div class="w-[90vw] mx-auto">

                <div id="default-carousel" class="relative" data-carousel="static">
                    
                    <div class="overflow-hidden relative h-[30vh] rounded-lg sm:h-[30vh] xl:h-[50vh]">
                        
                        
                        <div class="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src={bannerImages[0]} class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="..." width={300} height={200} />
                        </div>

                        <div class="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src={bannerImages[1]}  class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="..." width={300} height={200}/>
                        </div>

                        <div class="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src={bannerImages[2]}  class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt="..." width={300} height={200}/>
                        </div>
                    </div>
                    
                    <div class="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                    </div>
                    
                    <button type="button" class="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                            <span class="hidden">Previous</span>
                        </span>
                    </button>
                    <button type="button" class="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
                        <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            <span class="hidden">Next</span>
                        </span>
                    </button>
                </div>


    <a class="text-blue-600 hover:underline"
        href="https://flowbite.com/docs/getting-started/introduction/" target="_blank"></a>.

<script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
            </div> */}

            {/* {giveSelectContestOption && (
                <div className="flex items-center mx-auto text-center my-8 w-[100vw] mx-auto p-6 bg-gray-100 shadow-md rounded-md">
                    <button className="bg-blue-400 text-white width-[195px] h-[48px]" >Go To Today's Contest</button>
                    <button className="bg-blue-400 text-white width-[195px] h-[48px]">View Previous Contests</button>
                </div>
            )} */}

            {giveSelectContestOption && (
                <div className="flex justify-around items-center mx-auto text-center my-8  mx-auto p-6  shadow-md rounded-md">
                    {/* <button className="bg-blue-400 text-white width-[195px] h-[48px]" >Go To Today's Contest</button> */}

                    <img src="https://res.cloudinary.com/dchbfnlct/image/upload/v1711188558/fit_size_fit_xmjifp.png" className="h-[60px] w-[60px]" />

                    <button className="bg-[#2dad5c] h-[48px] w-[145px] border-1 rounded-md text-white" onClick={handlePrevContClick}>View Previous Contests</button>
                
                   
                </div> 
            )}

            {shouldDisplayTodayForm && <div className="flex flex-col items-center border-2 border-[#2dad5c] text-center my-8 mx-auto p-3 bg-gray-100 shadow-md rounded-md">
                <div className="w-[100%] overflow-x-hidden max-w-4xl mx-auto mt-8">
                <iframe
        className="w-full h-96"
        src={`https://www.youtube.com/embed/${form.video}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
                    </div>
                    <hr className="tect-blue-500 my-8 border-2   border-[#2dad5c] border-t w-[100%]" />
                
                <h1 className="text-2xl font-bold mb-4">Today's Contest</h1>
                <form onSubmit={handleSubmit}>
                    

                    

                    

                   
                    <h1>{form.date}</h1>
                    <iframe src={form.formLink} width="900" className="w-[92vw] min-h-[900px] max-h-[2200px] bg-white" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

                    </form>
                </div>}
    

            

            
        </div> }

        <Footer />
        </>
        
    )
}

export default Contest1;