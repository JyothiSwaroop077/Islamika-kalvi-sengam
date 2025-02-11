import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TailSpin } from 'react-loader-spinner';


const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isContestsMenuOpen, setIsConstestMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);


  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    console.log("toggled");
  };

  const toggleContestDropDown = () => {
    setIsConstestMenuOpen(!isContestsMenuOpen);
    console.log("toggled dropdown");
  }

  const departmentDropDown = () => {
    setIsDepartmentOpen(!isDepartmentOpen);
    console.log("toggled dropdown");
  }


  const router = useRouter();

  const handleContestSelect = async (contestName) => {
    
    setIsLoading(true); 

    try {
        
        await new Promise(resolve => setTimeout(resolve, 1000));

       
        await router.push(`/${contestName}`);
        setIsConstestMenuOpen(false);

    } catch (error) {
        console.error('Error navigating to contest1:', error);
    } finally {
        setIsLoading(false); // Set loading state to false when navigation completes (or errors)
    }
  }

  const handleDepartmentSelect = async(depName) => {

    setIsLoading(true);

    try{
      await new Promise(resolve => setTimeout(resolve, 1000));

      await router.push(`Departments/${depName}`);
      setIsDepartmentOpen(false);
    } catch(error) {
      console.log("error navigating to department", error);
    } finally {
      setIsLoading(false);
    }
  }




  return (
    <>
     {isLoading && (
        <div className='flex justify-center items-center min-h-screen'>
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
    )}

    {!isLoading && <header className="bg-white sticky top-0 z-50 relative">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-black flex flex-col items-center  font-bold text-xl">
          <h1 className='text-[8px] text-black font-normal'>Sponsored By</h1>
          <img src="https://res.cloudinary.com/dchbfnlct/image/upload/v1711042228/sdmslogo_pfcwpm.jpg"  className='h-[55px] w-[63px]'/>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              <li><a href="#" className="text-black hover:text-[#2dad5c]" onClick={() => {router.push('/Home')}}>Home</a></li>
              <li><a href="#" className="text-black hover:text-[#2dad5c]">About</a></li>

              <div className='flex flex-col justify-center items-center'>
              <li><a href="#" className="block py-2 text-black hover:text-[#2dad5c] rounded" onClick={() => toggleContestDropDown()}>Contests {isContestsMenuOpen ?  '↑' : '↓'}</a></li>
                {isContestsMenuOpen && (
                  <ul className="absolute top-16 ml-16 bg-white border border-gray-300 w-36">
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleContestSelect("Contest1")}>Contest 1</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleContestSelect("Contest2")}>Contest 2</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleContestSelect("Contest3")}>Contest 3</a></li>
                </ul>
                )}
                </div>

              <li><a href="#" className="text-black">Contact</a></li>
              

              <div className='flex flex-col justify-center items-center'>
              <li><a href="#" className="block py-2 text-black hover:text-[#2dad5c] rounded" onClick={() => departmentDropDown()}>Departments {isContestsMenuOpen ?  '↑' : '↓'}</a></li>
                {isDepartmentOpen && (
                  <ul className="absolute top-16 ml-16 bg-white border border-gray-300 w-50">
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("healthandwelfare")}>Health and Welfare</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("educationdevelopment")}>Education Development</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("socialandpublicwelfare")}>Social and public welfare</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("bookpublication")}>Islamic Book and Publication</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("makthab")}>Makthab</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("it")}>Information Technology</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("law")}>Department of Law</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("specialinitiative")}>Special Initiative and Planning</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("womenempowerment")}>Women Empowerment</a></li>
                </ul>
                )}
                </div>

                <li><a href="#" className="text-black hover:text-[#2dad5c]">Board Members</a></li>

            </ul>
          </div>

          {/* Donate button for desktop */}
          <div className="hidden lg:block">
            <button className="bg-[#2dad5c] h-[40px] w-[125px] border-1 rounded-md text-white">Donate</button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
              {menuVisible ? (
                <svg className="w-6 h-6 text-black" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6 text-black" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu lg:hidden ${menuVisible ? 'block' : 'hidden'} flex justify-start z-10 overflow-y-auto h-[100vh] transform ${menuVisible ? '-translate-x--10 ease-out' : 'translate-x-full ease-in'} transition-transform duration-300`}>
          <ul className="mt-8 w-[40vw] space-y-4 mx-0 m-auto">
            <li><a href="#" className="block py-2 text-black hover:text-[#2dad5c] rounded" onClick={() => {router.push('/Home')}}>Home</a></li>
            <li><a href="#" className="block py-2 text-black hover:text-[#2dad5c] rounded">About</a></li>
            <li><a href="#" className="block py-2 text-black hover:text-[#2dad5c] rounded" onClick={() => toggleContestDropDown()}>Contests {isContestsMenuOpen ?  '↑' : '↓'}</a></li>
                {isContestsMenuOpen && (
                  <ul className="left-0 bg-white border border-gray-300 w-36">
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleContestSelect("Contest1")}>Contest 1</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleContestSelect("Contest2")}>Contest 2</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleContestSelect("Contest3")}>Contest 3</a></li>
                </ul>
                )}


<li><a href="#" className="text-black hover:text-[#2dad5c]">Board Members</a></li>
           

              <div className=''>
              <li><a href="#" className="block py-2 text-black hover:text-[#2dad5c] rounded" onClick={() => departmentDropDown()}>Departments {isContestsMenuOpen ?  '↑' : '↓'}</a></li>
                {isDepartmentOpen && (
                  <ul className="left-0 bg-white border border-gray-300 w-36">
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("healthandwelfare")}>Health and Welfare</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("educationdevelopment")}>Education Development</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("socialandpublicwelfare")}>Social and public welfare</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("bookpublication")}>Islamic Book and Publication</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("makthab")}>Makthab</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("it")}>Information Technology</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("law")}>Department of Law</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("specialinitiative")}>Special Initiative and Planning</a></li>
                  <li><a href="#" className="block py-2 px-4 text-black hover:text-[#2dad5c]" onClick={() => handleDepartmentSelect("womenempowerment")}>Women Empowerment</a></li>
                </ul>
                )}
                </div>

                <li><a href="#" className="block py-2 text-black hover:text-[#2dad5c] rounded">Contact</a></li>
          </ul>
         
        </div>
      </nav>
    </header>}
    </> 
  );
};

export default Navbar;
