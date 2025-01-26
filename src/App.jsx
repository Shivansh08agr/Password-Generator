import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react"

function App() {
  const [len, setLen] = useState(6);
  const [pass, setPass] = useState("");
  const [number, setNumber] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback( ()=> {
    let p = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(number) str += "0123456789";
    for (let i = 1; i <= len; i++) {
      let char = Math.floor(Math.random() * str.length);
      p += str.charAt(char);
    }
    setPass(p);
  }, [len, setPass, number]);

  useEffect(()=>{passwordGenerator(); setIsCopied(false)}, [len, setPass, number]);

  const cpy = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pass);
    setIsCopied(true);
  }, [pass]);

  return (
    <>
      <div className="w-full max-w-md mx-auto my-3 text-orange-500 p-4 rounded-lg bg-gray-500">
        <h1 className="text-white text-center mb-4">Password Generator</h1>
        <div className="flex rounded-lg overflow-hidden mb-4 shadow">
          <input 
          type="text"
          value={pass}
          placeholder="password"
          className="outline-none w-full py-1 px-3 bg-white"
          readOnly
          ref={passwordRef}
          />
          <button className="outline-none text-white bg-blue-600 p-2 hover:bg-blue-500" onClick={cpy}>{isCopied? "Copied!" : "Copy"}</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={6}
            max={12}
            value={len}
            className="cursor-pointer"
            onChange={(e)=>setLen(e.target.value)}
            />
            <label>Length: {len}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked= {number}
            id="numberInput"
            onChange={()=> setNumber((prev)=> !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
