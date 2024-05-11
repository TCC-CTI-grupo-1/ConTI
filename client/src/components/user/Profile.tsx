import Navbar from "../Navbar";

const Profile = () => {
    return (
        <div className="flex-container">
            <Navbar />
            <div className="container">
                <div className="header">
                    <h1>Titulo</h1>
                </div>
                <div className="inversed-border"></div>
                <div className="content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus eaque repellat officia, perferendis laudantium fugiat ducimus earum, repudiandae in perspiciatis cumque facere consectetur sapiente nisi. Quisquam cumque dicta quae neque!</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;