import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
 
  return (
    <div>
       <ToastContainer/>
       <Header />
       <Hero/>
       
    </div>
  );
}
