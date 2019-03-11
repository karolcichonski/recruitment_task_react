import React from 'react';

function NavbarComp({ loadButClick, inputChange, loadButBlur}) {
        return (
            < nav className="navbar" >
                <div className="navbar-brand">
                    <div className="navbar-item">
                        <div className="field has-addons">
                            <div className="control">
                                <input className="input username" type="text" placeholder="enter github username" onChange={inputChange}/>
                            </div>
                            <div className="control">
                                <button className="button is-info load-username" onClick={loadButClick} onBlur={loadButBlur}>
                                    Load
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-item">
                        <div className="loader is-hidden" id="spinner"></div>
                    </div>

                </div>
            </nav>
        );
}

export default NavbarComp;