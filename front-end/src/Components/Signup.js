import React,{useState} from "react"

export default function Signup(){
    return( 
            <div className="container"><br/><br/><br/><br/><br/><br/>
            <form>
                <h4>Sign up</h4>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" claclassNamess="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">Enter your full name here</div>
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else</div>
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Birth Year</label>
                        <input type="datetime" className="form-control" id="exampleInputPassword1"/>
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Gender</label>
                        <input type="text" className="form-control" id="exampleInputPassword1"/>
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Work place or Institute</label>
                        <input type="text" className="form-control" id="exampleInputPassword1"/>
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">I am agree with rules and conditions of ICAF</label>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <br/><br/><br/><br/><br/>
            </div>
    
    )
}
