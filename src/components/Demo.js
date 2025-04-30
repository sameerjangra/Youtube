// Here is the file where i can use the useref 

// Here is the difference between the useState ,var or usRref ;

import React, { useState ,useRef} from 'react'

const Demo = () => {

    var i = 1 ;
    const [y ,setY] = useState(0)
    const ref = useRef(0)


  return (
    <div className='text-white ml-4 w-96 h-96 border border-white p-4'>
        {/* Var */}
       <div> 
       <button 
       className='p-2 m-2 bg-green-400 rounded-md'
       onClick={()=>{
        i=i+1
        console.log("Var "+i)
       }}
       > Button </button>
        <span>var {i}</span>

        </div>

       {/* useState */}
        <div> 
       <button 
       className='p-2 m-2 bg-green-400 rounded-md'
       onClick={()=>{
        setY( y+1)
        console.log("useState "+y)
       }}
       > Button </button>
        <span>state {y}</span>
        </div>

       {/* useRef */}
        <div> 
       <button 
       className='p-2 m-2 bg-green-400 rounded-md'
       onClick={()=>{
        ref.current = ref.current+1
        console.log("useRef"+ref.current)
       }}
       > Button </button>
        <span>useRef {ref.current}</span>

        </div>

       
    </div>
  )
}

export default Demo