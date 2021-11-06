import React from 'react'
import { Redirect,Link,useHistory } from 'react-router-dom'; 
function Test() {
    const history = useHistory();

    const onclick = (e)=>{
        history.push({
            pathname :"/test2" , state:{from:"Cairo"}
        });
    }
    return (
        <div>
           
            <button onClick ={(e)=>onclick(e)}>
                Click Me
            </button>
        </div>
    )
}

export default Test
