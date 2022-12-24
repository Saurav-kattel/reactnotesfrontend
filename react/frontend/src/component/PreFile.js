
import {Link } from "react-router-dom"

const  PreFile = () =>{
  return (
    <>
    <h3 className="bg-blue-200">The simplest way to keep notes </h3>
<p>All your notes, synced on all your devices. Get Simplenote now for iOS, Android, Mac, Windows, Linux, or in your browser.</p>
<Link to="/login"><button>login</button></Link>
<Link to="/signup"><button>signup</button></Link>
    </>
    
    )
}
export default PreFile;