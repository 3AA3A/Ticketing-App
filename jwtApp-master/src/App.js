import React, { useState, useEffect } from 'react'
import "bootswatch/dist/litera/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import Authenticate from './starter/public/Authenticate'
import Profile from './patrick/Profile'
import Logout from './starter/user/Logout'
import UserContext from './UserContext'
import db from './db';
import Badge from 'react-bootstrap/Badge'

import AdminProductDetail from './starter/user/admin/Product/ProductDetail'
import SearchProductsByName from './ali/Search/SearchEventsByName'
import Products from './starter/user/admin/Product/Products'

import UpdateProfile from './patrick/UpdateProfile'
import Users from './patrick/Admin/Users'
import AdminEditUser from './patrick/Admin/EditUser'
import AdminDetailUser from './patrick/Admin/DetailUser'
import AdminCarts from './patrick/Admin/Carts'
import AdminEditCart from './patrick/Admin/EditCart'
import AdminDetailCart from './patrick/Admin/DetailCart'
import Support from './patrick/Support/Support'
import SupportMyFaqs from './patrick/Support/MyFaqs'
import SupportEditFaq from './patrick/Support/EditMyFaq'
import SupportCreateFaq from './patrick/Support/CreateMyFaq'
import SupportAllFaqs from './patrick/Support/AllFaqs'
import SupportFeedbacks from './patrick/Support/Feedbacks'
import SupportFeedbackReply from './patrick/Support/EditFeedback'
import SellerAddVenue from './patrick/Seller/AddVenue'
import AdminVenues from './patrick/Admin/Venues'
import AdminCreateVenue from './patrick/Admin/CreateVenue'
import AdminEditVenue from './patrick/Admin/EditVenue'
import CustomerCarts from './patrick/Customer/Carts'
import CustomerDetailCart from './patrick/Customer/DetailCart'
import CustomerMyCart from './patrick/Customer/MyCart'
import CustomerFaqs from './patrick/Customer/Faqs'
import CustomerFeedbacks from './patrick/Customer/Feedbacks'
import PublicPrevEvents from './patrick/Public/PrevEvents'
import PublicEvents from './patrick/Public/Events'
import PublicEventDetail from './patrick/Public/EventDetail'
import PublicProducts from './patrick/Public/Products'
import PublicPerformers from './patrick/Public/Performers'
import PublicPerformerDetail from './patrick/Public/PerformerDetail'
import PublicFaqs from './patrick/Public/Faqs'
import SellerFeedbacks from './patrick/Seller/Feedbacks'
import SellerCreateFeedbacks from './patrick/Seller/CreateFeedbacks'
import SellerFaqs from './patrick/Seller/Faqs'
import AdminFeedbacks from './patrick/Admin/Feedbacks'
import AdminEditFeedback from './patrick/Admin/EditFeedback'
import AdminFaqs from './patrick/Admin/Faqs'
import AdminEditFaq from './patrick/Admin/EditFaq'
import CustomerBuy from './patrick/Customer/Buy'
import AdminPerformerReviews from './patrick/Admin/PerformerReviews'
import AdminGenres from './patrick/Admin/Genres'
import AdminCreateGenre from './patrick/Admin/CreateGenre'
import AdminEditGenre from './patrick/Admin/EditGenre'

import CustomerProducts from './mary/user/Products'
// import PublicEventDetail from './mary/EventDetail'
import CustomerEvents from './mary/user/Events'
import CustomerEventDetail from './mary/user/EventDetail'
import AddEvent from './mary/user/seller/AddEvent'
import SellerAddPerformer from './mary/user/seller/AddPerformer'
import SellerEvents from './mary/user/seller/Events'
import EditEvent from './mary/user/seller/EditEvent'
import SellerEventDetail from './mary/user/seller/EventDetail'
import AdminPerformers from './mary/user/admin/Performers'
import AdminEditPerformer from './mary/user/admin/EditPerformer'
import AdminAddPerformer from './mary/user/admin/AddPerformer'
import PrevEvents from './mary/user/PrevEvents'
import AdminEvents from './mary/user/admin/Events'
import AdminEventDetail from './mary/user/admin/EventDetail'
import AdminEditEvent from './mary/user/admin/EditEvent'
import CustomerPerformers from './mary/user/Performers'
import CustomerPerformerDetail from './mary/user/PerformerDetail'
import AdminEventHistory from './mary/user/admin/History'
import AdminPerformerHistory from './mary/user/admin/History2'
// import AdminCarts from './mary/user/admin/Carts'
// import AdminEditCart from './mary/user/admin/EditCart'

import Customers from './ali/Consumers/Customers'
import FavPerformer from './ali/Consumers/FavPerformer'
import FavEvents from './ali/Consumers/FavEvents'
import HistoryPerformer from './ali/Consumers/HistoryPerformer'
import MyCoupons from './ali/Consumers/MyCoupons'
import HistoryEvents from './ali/Consumers/HistoryEvents'
import GenFeedbacks from './ali/Consumers/GenFeedbacks'
import PerfReview from './ali/Consumers/PerfReview'
import Marketers from './ali/Marketing/Marketers'
import Favorites from './ali/Marketing/Favorites'
import Sellers from './ali/EventPlanners/Sellers'
// import Support from './ali/CustomerService/Support'
// import Users from './ali/Admin/Users'
import AdminPage from './ali/Admin/Admin'
import HomePage from './ali/Public/Home'
import Coupons from './ali/Marketing/Coupons'
import Promotions from './ali/Marketing/Promotions'
import History from './ali/Marketing/History'

export default function App() {

    const [jwtUser, setJwtUser] = useState(db.getJwtUser())
    const [user, setUser] = useState(null)

    useEffect(() => (async () => {
        db.setJwtUser(jwtUser)
        let user = null
        if (jwtUser) {
            user = await db.Users.findOne(jwtUser.username)
            if (!user) {
                await db.Users.create(users => { }, { id: jwtUser.username, name: "", phone: "", address: "", image: "/default.png", role: "Customer" })
                user = await db.Users.findOne(jwtUser.username)
            }
        }
        setUser(user)
    })(), [jwtUser])

    const isPublic = () => user === null
    const isLoggedIn = () => user !== null
    const isAdmin = () => user?.role === "Admin"
    const isCustomer = () => user?.role === "Customer"
    const isSupport = () => user?.role === "Support"
    const isSeller = () => user?.role === "Seller"
    const isMarketer = () => user?.role === "Marketer"

    const [unviewedfeedbacks, setUnviewedfeedbacks] = useState([])
    useEffect(() => (async () => setUnviewedfeedbacks(await db.Generalfeedback.findByViewed("NO")))(), [])

    const [pendingperformers, setPendingperformers] = useState([])
    useEffect(() => (async () => setPendingperformers(await db.Performer.findByImage("/default.png")))(), [])

    const [pendingvenues, setPendingvenues] = useState([])
    useEffect(() => (async () => setPendingvenues(await db.Venues.findByImage("/default.png")))(), [])

    return (
        <UserContext.Provider value={{ user }}>
            <Router>
                <div className="container">
                    <Navbar bg="light" variant="light" expand="sm">
                        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {
                                    isPublic() &&
                                    <>
                                        <NavDropdown title="Events" id="basic-nav-dropdown">
                                            <Nav.Link as={Link} to="/events">Events</Nav.Link>
                                            <Nav.Link as={Link} to="/prevevents">Previous Events</Nav.Link>
                                        </NavDropdown>
                                        <Nav.Link as={Link} to="/performers">Artists & Bands</Nav.Link>
                                    </>
                                }
                                {
                                    isCustomer() &&
                                    <>
                                        <NavDropdown title="Favourites" id="basic-nav-dropdown">
                                            <NavDropdown.Item as={Link} to="/favperformer">Performers</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/favevents">Events</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown title="History" id="basic-nav-dropdown">
                                            <NavDropdown.Item as={Link} to="/historyperformer">Performers</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/historyevents">Events</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown title="Events" id="basic-nav-dropdown">
                                            <Nav.Link as={Link} to="/events">Current Events</Nav.Link>
                                            <Nav.Link as={Link} to="/prevevents">Previous Events</Nav.Link>
                                        </NavDropdown>
                                        <Nav.Link as={Link} to="/performers">Artists & Bands</Nav.Link>
                                        <NavDropdown title="Reviews/Feedbacks" id="basic-nav-dropdown">
                                            <Nav.Link as={Link} to="/genfeedbacks">Leave a Review/Feedback</Nav.Link>
                                            <Nav.Link as={Link} to="/myfeedbacks">My Reviews/Feedbacks</Nav.Link>
                                        </NavDropdown>
                                    </>
                                }
                                {
                                    isSupport() &&
                                    <>
                                        <Nav.Link as={Link} to="/myfaqs">My Faqs</Nav.Link>
                                        <Nav.Link as={Link} to="/allfaqs">All Faqs</Nav.Link>
                                        <Nav.Link as={Link} to="/feedbacks">User Feedbacks
                                        {unviewedfeedbacks.length === 0 ? null : <> &nbsp; <Badge pill variant="warning">{unviewedfeedbacks.length}</Badge></>}
                                        </Nav.Link>
                                    </>
                                }
                                {
                                    isAdmin() &&
                                    <>
                                    <NavDropdown title="Data" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/users">Users</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/carts">Carts</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/events">Events</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/performers">Performers
                                        {pendingperformers.length === 0 ? null : <>&nbsp; <Badge pill variant="warning">{pendingperformers.length}</Badge></>}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/venues">Venues
                                        {pendingvenues.length === 0 ? null : <>&nbsp; <Badge pill variant="warning">{pendingvenues.length}</Badge></>}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/feedbacks">User Feedbacks
                                        {unviewedfeedbacks.length === 0 ? null : <>&nbsp; <Badge pill variant="warning">{unviewedfeedbacks.length}</Badge></>}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/faqs">Faqs</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/performerreviews">Performer Reviews</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/genres">Genres</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title='History' id='basic-nav-dropdownn'>
                                        <NavDropdown.Item as={Link} to="/eventshistory">Events</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/performershistory">Performers</NavDropdown.Item>
                                    </NavDropdown>
                                    </>
                                }
                                {
                                    isSeller() &&
                                    <>
                                        <Nav.Link as={Link} to="/events">Events</Nav.Link>
                                        <Nav.Link as={Link} to="/addevent">Add Event</Nav.Link>
                                        <NavDropdown title="Reviews/Feedbacks" id="basic-nav-dropdown">
                                            <Nav.Link as={Link} to="/createfeedbacks">Leave a Review/Feedback</Nav.Link>
                                            <Nav.Link as={Link} to="/myfeedbacks">My Reviews/Feedbacks</Nav.Link>
                                        </NavDropdown>
                                    </>
                                }
                                {
                                    isMarketer() &&
                                    <>
                                        <Nav.Link as={Link} to="/favorites">Favorites (Top Rankings)</Nav.Link>
                                        <Nav.Link as={Link} to="/coupons">Coupons</Nav.Link>
                                        <Nav.Link as={Link} to="/promotions">Promotions</Nav.Link>
                                        <Nav.Link as={Link} to="/history">Recents</Nav.Link>
                                    </>
                                }
                            </Nav>
                        </Navbar.Collapse>
                        <Nav className="mr-auto navbar-right">
                            {
                                isCustomer()
                                &&
                                <>
                                    <NavDropdown title='Cart'>
                                        <Nav.Link as={Link} to="/mycart">My Cart</Nav.Link>
                                        <Nav.Link as={Link} to="/carts">Purchases</Nav.Link>
                                        <Nav.Link as={Link} to="/mycoupons">My Coupons</Nav.Link>
                                    </NavDropdown>
                                    <Nav.Link as={Link} to="/faqs">FAQ</Nav.Link>
                                </>
                            }
                            {
                                isSeller()
                                &&
                                <>
                                    <Nav.Link as={Link} to="/faqs">FAQ</Nav.Link>
                                </>
                            }
                            {
                                isPublic()
                                &&
                                <>
                                    <Nav.Link as={Link} to="/faqs">FAQ</Nav.Link>
                                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                </>
                            }
                            {
                                isLoggedIn()
                                &&
                                <>
                                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                    <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                                </>
                            }
                        </Nav>
                    </Navbar>

                    {
                        isPublic()
                        &&
                        <Switch>
                            <Route path="/faqs">
                                <PublicFaqs />
                            </Route>
                            <Route path="/products/:id">
                                <PublicProducts />
                            </Route>
                            <Route path="/performerdetail/:id">
                                <PublicPerformerDetail />
                            </Route>
                            <Route path="/performers">
                                <PublicPerformers />
                            </Route>
                            <Route path="/eventdetail/:id">
                                <PublicEventDetail />
                            </Route>
                            <Route path="/events">
                                <PublicEvents />
                            </Route>
                            <Route path="/prevevents">
                                <PublicPrevEvents />
                            </Route>
                            <Route path="/register">
                                <Authenticate type="Register" set={setJwtUser} />
                            </Route>
                            <Route path="/login">
                                <Authenticate type="Login" set={setJwtUser} />
                            </Route>
                            <Route path="/">
                                <HomePage />
                            </Route>
                        </Switch>
                    }
                    {
                        isLoggedIn()
                        &&
                        <Switch>
                            <Route path="/logout">
                                <Logout set={setJwtUser} />
                            </Route>
                        </Switch>
                    }
                    {
                        isCustomer()
                        &&
                        <Switch>
                            <Route path="/buyproduct/:id">
                                <CustomerBuy />
                            </Route>
                            <Route path="/myfeedbacks">
                                <CustomerFeedbacks />
                            </Route>
                            <Route path="/faqs">
                                <CustomerFaqs />
                            </Route>
                            <Route path="/mycart">
                                <CustomerMyCart />
                            </Route>
                            <Route path="/detailcart/:id">
                                <CustomerDetailCart />
                            </Route>
                            <Route path="/carts">
                                <CustomerCarts />
                            </Route>
                            <Route path="/events">
                                <CustomerEvents />
                            </Route>
                            <Route path="/mycoupons">
                                <MyCoupons />
                            </Route>
                            <Route path="/prevevents">
                                <PrevEvents />
                            </Route>
                            <Route path="/eventdetail/:id">
                                <CustomerEventDetail />
                            </Route>
                            <Route path="/products/:id">
                                <CustomerProducts />
                            </Route>
                            <Route path="/performers">
                                <CustomerPerformers />
                            </Route>
                            <Route path="/performerdetail/:id">
                                <CustomerPerformerDetail />
                            </Route>
                            <Route path="/favperformer">
                                <FavPerformer />
                            </Route>
                            <Route path="/favevents">
                                <FavEvents />
                            </Route>
                            <Route path="/historyperformer">
                                <HistoryPerformer />
                            </Route>
                            <Route path="/historyevents">
                                <HistoryEvents />
                            </Route>
                            <Route path="/genfeedbacks">
                                <GenFeedbacks />
                            </Route>
                            <Route path="/perfreview/:id">
                                <PerfReview />
                            </Route>
                            <Route path="/profile">
                                <Profile set={setUser} />
                            </Route>
                            <Route path="/updateprofile">
                                <UpdateProfile />
                            </Route>
                            <Route path="/">
                                <Customers />
                            </Route>
                        </Switch>
                    }
                    {
                        isAdmin()
                        &&
                        <Switch>
                            <Route path="/editgenre/:id">
                                <AdminEditGenre />
                            </Route>
                            <Route path="/creategenre">
                                <AdminCreateGenre />
                            </Route>
                            <Route path="/genres">
                                <AdminGenres />
                            </Route>
                            <Route path="/performerreviews">
                                <AdminPerformerReviews />
                            </Route>
                            <Route path="/eventshistory">
                                <AdminEventHistory />
                            </Route>
                            <Route path="/performershistory">
                                <AdminPerformerHistory />
                            </Route>
                            <Route path="/editfaq/:id">
                                <AdminEditFaq />
                            </Route>
                            <Route path="/faqs">
                                <AdminFaqs />
                            </Route>
                            <Route path="/editfeedback/:id">
                                <AdminEditFeedback />
                            </Route>
                            <Route path="/feedbacks">
                                <AdminFeedbacks />
                            </Route>
                            <Route path="/productdetail/:id">
                                <AdminProductDetail />
                            </Route>
                            <Route path="/products">
                                <Products />
                            </Route>
                            <Route path="/events">
                                <AdminEvents />
                            </Route>
                            <Route path="/eventdetail/:id">
                                <AdminEventDetail />
                            </Route>
                            <Route path="/editevent/:id">
                                <AdminEditEvent />
                            </Route>
                            <Route path="/createvenue">
                                <AdminCreateVenue />
                            </Route>
                            <Route path="/venues">
                                <AdminVenues />
                            </Route>
                            <Route path="/performers">
                                <AdminPerformers />
                            </Route>
                            <Route path="/addperformer">
                                <AdminAddPerformer />
                            </Route>
                            <Route path="/detailuser/:id">
                                <AdminDetailUser />
                            </Route>
                            <Route path="/detailcart/:id">
                                <AdminDetailCart />
                            </Route>
                            <Route path="/edituser/:id">
                                <AdminEditUser />
                            </Route>
                            <Route path="/editcart/:id">
                                <AdminEditCart />
                            </Route>
                            <Route path="/editvenue/:id">
                                <AdminEditVenue />
                            </Route>
                            <Route path="/editperformer/:id">
                                <AdminEditPerformer />
                            </Route>
                            <Route path="/users">
                                <Users />
                            </Route>
                            <Route path="/carts">
                                <AdminCarts />
                            </Route>
                            <Route path="/profile">
                                <Profile />
                            </Route>
                            <Route path="/updateprofile">
                                <UpdateProfile />
                            </Route>
                            <Route path="/">
                                <AdminPage />
                            </Route>
                        </Switch>
                    }
                    {
                        isSeller()
                        &&
                        <Switch>
                            <Route path="/faqs">
                                <SellerFaqs />
                            </Route>
                            <Route path="/myfeedbacks">
                                <SellerFeedbacks />
                            </Route>
                            <Route path="/createfeedbacks">
                                <SellerCreateFeedbacks />
                            </Route>
                            <Route path="/addvenue">
                                <SellerAddVenue />
                            </Route>
                            <Route path="/profile">
                                <Profile />
                            </Route>
                            <Route path="/addevent">
                                <AddEvent />
                            </Route>
                            <Route path="/events">
                                <SellerEvents />
                            </Route>
                            <Route path="/addperformer">
                                <SellerAddPerformer />
                            </Route>
                            <Route path="/eventdetail/:id">
                                <SellerEventDetail />
                            </Route>
                            <Route path="/editevent/:id">
                                <EditEvent />
                            </Route>
                            <Route path="/updateprofile">
                                <UpdateProfile />
                            </Route>
                            <Route path="/">
                                <Sellers />
                            </Route>
                        </Switch>
                    }
                    {
                        isMarketer()
                        &&
                        <Switch>
                            <Route path="/favorites">
                                <Favorites />
                            </Route>
                            <Route path="/profile">
                                <Profile />
                            </Route>
                            <Route path="/updateprofile">
                                <UpdateProfile />
                            </Route>
                            <Route path="/coupons">
                                <Coupons />
                            </Route>
                            <Route path="/promotions">
                                <Promotions />
                            </Route>
                            <Route path="/history">
                                <History />
                            </Route>
                            <Route path="/">
                                <Marketers />
                            </Route>
                        </Switch>
                    }
                    {
                        isSupport()
                        &&
                        <Switch>
                            <Route path="/feedbackreply/:id">
                                <SupportFeedbackReply />
                            </Route>
                            <Route path="/feedbacks">
                                <SupportFeedbacks />
                            </Route>
                            <Route path="/allfaqs">
                                <SupportAllFaqs />
                            </Route>
                            <Route path="/createfaq/">
                                <SupportCreateFaq />
                            </Route>
                            <Route path="/editfaq/:id">
                                <SupportEditFaq />
                            </Route>
                            <Route path="/myfaqs">
                                <SupportMyFaqs />
                            </Route>
                            <Route path="/profile">
                                <Profile />
                            </Route>
                            <Route path="/updateprofile">
                                <UpdateProfile />
                            </Route>
                            <Route path="/">
                                <Support />
                            </Route>
                        </Switch>
                    }
                </div>
            </Router>
        </UserContext.Provider >
    )
}