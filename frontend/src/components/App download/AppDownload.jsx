import React from 'react'
import './AppDownload.css' 
import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div className='appdownload' id ='appdownload'>
        <p>For better experience Download <br/> Foodingo App</p>
        <div className="appdownloadplatforms"> 
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload
