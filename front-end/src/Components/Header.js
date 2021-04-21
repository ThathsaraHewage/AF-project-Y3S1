import React from 'react';
import logo from './logo.png';
import img1 from './T.jpg';
import img2 from './T2.jpg';
import img3 from './T3.jpeg';

function Header() {
  return (
    <div>
        <br/><br/>
     <center> <img src={logo} style={{width:"90px"}}/></center><br/>
      <center><h1>ICAF</h1></center>
      <center><h3>International Conference on Application Framework</h3></center>
      <br/><br/>
      <nav className="nav nav-pills nav-fill" style={{backgroundColor:"#0001"}}>
          <a className="nav-link" href="#"> Workshops </a>
          <a className="nav-link" href="#"> Reasearch Papers</a>
          <a className="nav-link" href="#"> Learn More things </a>
          <a className="nav-link" href="#"> Other </a>
      </nav>
      <br/>

   
      <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" style={{marginLeft:"130px",width:"80%"}}>
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
      <div class="carousel-inner">
      <div class="carousel-item active">
      <img src={img1} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Join</h5>
        <p>Join with our great community of Software Engineers</p>
      </div>
      </div>
      <div class="carousel-item">
      <img src={img2} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Learn</h5>
        <p>Learn everyday new things, latest technologies of exllent Reasearchers</p>
      </div>
     </div>
     <div class="carousel-item">
      <img src={img3} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Grow</h5>
        <p>Grow your career to a successful future in the industry</p>
      </div>
    </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        <br/><br/>


        <div class="card-group">
  <div class="card">
    <img src="..." class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title">Register for Workshops</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
  <div class="card">
    <img src="..." class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
  <div class="card">
    <img src="..." class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>
</div>
</div>
<br/><br/><br/>



    </div>
  );
}

export default Header;

