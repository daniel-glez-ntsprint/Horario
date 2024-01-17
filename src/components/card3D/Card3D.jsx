import Fondo from'./fondo.jpg'
import Player from'./player.png'
import Letras from'./pngwing.com.png'
import DarkPlayer from'./Dark Souls.png'
import DarkLetra from'./Dark-Souls-Font-Family-Free-Download-removebg-preview.png'
import  DarkFondo  from'./ec876d7b-db22-4392-aa49-63dc76745716.jfif'
import Naruto from'./da56257f-f288-4767-bc68-3c90c49396ee.jfif'
import NarutoLetra from'./pngegg (1).png'
import NarutoPlayer from'./pngegg.png'
import './Card3D.css'

export default function Card3D(props) {
    return (
     <>
     <div className="App">
     <div className="card">
       <div className="wrapper">
         <img src= {Fondo} alt="" target="_blank" className=" cover-image " />
       </div>
       <img src={Letras} alt="" target="_blank" className=" title " />
       <img src={Player} alt="" className="character" />
     </div>

     <div className="card">
       <div className="wrapper">
       <img src= {DarkFondo} alt="" target="_blank" className=" cover-image " />
       </div>
       <img src={DarkLetra} alt="" target="_blank" className=" title " />
       <img src={DarkPlayer} alt="" className="character" />
     </div>

     <div className="card">
       <div className="wrapper">
       <img src= {Naruto} alt="" target="_blank" className=" cover-image " />
       </div>
       <img src={NarutoLetra} alt="" target="_blank" className=" title " />
       <img src={NarutoPlayer} alt="" className="character" />
     </div>
   </div>
</>
    );
  }
  