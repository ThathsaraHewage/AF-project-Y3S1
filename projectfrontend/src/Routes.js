import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import ReviewerDashBoard from "./user/ReviewerDashBoard";
import EditorDashBoard from "./user/EditorDashBoard";


import AddEvent from "./editor/AddEvent";
import ManageEvents from "./editor/ManageEvent";
import EditorRoutes from "./auth/helper/EditorRoutes";
import ReviewerRoutes from "./auth/helper/ReviewerRoutes";
import UpdateNews from "./editor/UpdateNews";
import UpdateEvent from "./editor/UpdateEvent";
import AddNews from "./editor/AddNews";
import ManageNews from "./editor/ManageNews";

import ApprovedEvents from "./admin/ApprovedEvents";
import NotApprovedEvents from "./admin/NotApprovedEvents";
import AdminUpdateEvent from "./admin/AdminUpdateEvent";
import ShowNews from "./core/ShowNews";
import EditorSignup from "./admin/EditorSignup";
import ReviewerSignup from "./admin/ReviewerSignup";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/news/:newsId" exact component={ShowNews} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />

        <PrivateRoutes path="/user/dashboard" exact component={UserDashBoard}/>
        <ReviewerRoutes path="/reviewer/dashboard" exact component={ReviewerDashBoard}/>
        <EditorRoutes path="/editor/dashboard" exact component={EditorDashBoard}/>
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashBoard}/>

        <EditorRoutes path="/editor/create/news" exact component={AddNews}/>
        <EditorRoutes path="/editor/allnews" exact component={ManageNews}/>
        <EditorRoutes path="/editor/news/update/:newsId" exact component={UpdateNews}/>

        <EditorRoutes path="/editor/create/event" exact component={AddEvent}/>
        <EditorRoutes path="/editor/events" exact component={ManageEvents}/>
        <EditorRoutes path="/editor/event/update/:eventId" exact component={UpdateEvent}/>

        <AdminRoutes path="/admin/yesevents" exact component={ApprovedEvents} />       
        <AdminRoutes path="/admin/noevents" exact component={NotApprovedEvents} />       
        <AdminRoutes path="/admin/event/update/:eventId" exact component={AdminUpdateEvent} />       
        <AdminRoutes path="/admin/create/editor" exact component={EditorSignup} />       
        <AdminRoutes path="/admin/create/reviewer" exact component={ReviewerSignup} />       

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
