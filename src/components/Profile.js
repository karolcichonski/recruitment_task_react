import React from 'react';

function Profile({ avatarSRC, profileName, profileUrl, profileDesc}){
    return (
        <div className="profile-container column is-full-mobile is-one-second-tablet is-one-third-widescreen ">
            <section>
                <h2 className="subtitle is-4">Profile</h2>
                <div className="profile">
                    <div className="media">
                        <div className="media-left">
                            <figure className="media-left image is-64x64">
                                <img src={avatarSRC} id="profile-image" alt="avatar" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-5" id="profile-name">{profileName}</p>
                            <p className="subtitle is-6"><a href="#" id="profile-url">{profileUrl}</a></p>
                        </div>
                    </div>

                    <div className="content" id="profile-bio">
                        <p>{profileDesc}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Profile;