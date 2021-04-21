import React,{useState} from 'react';

export default function Signup(){
    return( 
    <div>
    <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" class="form-text">Enter your full name here</div>
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else</div>
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Birth Year</label>
                <input type="datetime" class="form-control" id="exampleInputPassword1"/>
            </div>

            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                <label class="form-check-label" for="exampleCheck1">I am agree with rules and conditions of ICAF</label>
            </div>
            
            <button type="submit" class="btn btn-primary">Register</button>
    </form>
    </div>
    
    )
}
